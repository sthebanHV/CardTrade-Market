package com.cardtrademarket.market;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class ScryfallClient implements MarketClient {

    private static final String UA = "CardTrade-Market/1.0 (https://cardtrade-market.vercel.app)";

    private final RestClient http;
    private final ObjectMapper om = new ObjectMapper();

    public ScryfallClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(8));
        this.http = RestClient.builder().requestFactory(factory).build();
    }

    @Override
    public String game() {
        return "MAGIC";
    }

    @Override
    public String fuente() {
        return "Scryfall";
    }

    @Override
    public int prioridad() {
        return 0;
    }

    @Override
    public List<MarketCard> buscar(String q, int limit) throws Exception {
        String json = http.get()
                .uri(b -> b.scheme("https").host("api.scryfall.com").path("/cards/search")
                        .queryParam("q", q)
                        .build())
                .header("User-Agent", UA)
                .header("Accept", "application/json")
                .retrieve()
                .body(String.class);
        JsonNode data = om.readTree(json).path("data");
        List<MarketCard> out = new ArrayList<>();
        for (JsonNode n : data) {
            if (out.size() >= limit) break;
            out.add(mapear(n));
        }
        return out;
    }

    @Override
    public Optional<MarketCard.Detail> detalle(String externalId) throws Exception {
        String json = http.get()
                .uri(b -> b.scheme("https").host("api.scryfall.com").path("/cards/{id}").build(externalId))
                .header("User-Agent", UA)
                .header("Accept", "application/json")
                .retrieve()
                .body(String.class);
        MarketCard c = mapear(om.readTree(json));
        List<MarketCard.PricePoint> precios = new ArrayList<>();
        if (c.getPriceUsd() != null) {
            precios.add(MarketCard.PricePoint.builder().market("USD (TCGPlayer/Cardmarket)").valueUsd(c.getPriceUsd()).build());
        }
        return Optional.of(MarketCard.Detail.builder()
                .game(c.getGame()).externalId(c.getExternalId()).name(c.getName())
                .setName(c.getSetName()).setCode(c.getSetCode()).rarity(c.getRarity())
                .number(c.getNumber()).description(c.getDescription()).image(c.getImage())
                .priceUsd(c.getPriceUsd()).source(c.getSource()).url(c.getUrl())
                .prices(precios).updatedAt(c.getUpdatedAt())
                .build());
    }

    private Double aDouble(String texto) {
        if (texto == null || texto.isBlank()) return null;
        try {
            return Double.valueOf(texto.replace("$", "").trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private MarketCard mapear(JsonNode n) {
        String imagen = null;
        JsonNode uris = n.path("image_uris");
        if (uris.hasNonNull("normal")) {
            imagen = uris.get("normal").asText();
        } else if (n.path("card_faces").size() > 0) {
            imagen = n.path("card_faces").get(0).path("image_uris").path("normal").asText(null);
        }
        Double precio = null;
        if (n.path("prices").hasNonNull("usd")) {
            precio = aDouble(n.path("prices").get("usd").asText());
        }
        if (precio == null && n.path("prices").hasNonNull("usd_foil")) {
            precio = aDouble(n.path("prices").get("usd_foil").asText());
        }
        String desc = n.path("type_line").asText("");
        if (n.hasNonNull("oracle_text")) {
            String texto = n.get("oracle_text").asText();
            desc = (desc + (desc.isEmpty() ? "" : " — ") + texto);
            if (desc.length() > 240) desc = desc.substring(0, 237) + "...";
        }
        return MarketCard.builder()
                .game("MAGIC")
                .externalId(n.path("id").asText(null))
                .name(n.path("name").asText(null))
                .setName(n.path("set_name").asText(null))
                .setCode(n.path("set").asText(null))
                .rarity(n.path("rarity").asText(null))
                .number(n.path("collector_number").asText(null))
                .description(desc.isEmpty() ? null : desc)
                .image(imagen)
                .priceUsd(precio)
                .source("Scryfall")
                .url(n.path("scryfall_uri").asText(null))
                .updatedAt(new Date())
                .build();
    }
}
