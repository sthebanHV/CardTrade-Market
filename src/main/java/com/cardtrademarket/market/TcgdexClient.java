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
public class TcgdexClient implements MarketClient {

    private final RestClient http;
    private final ObjectMapper om = new ObjectMapper();

    public TcgdexClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(4));
        factory.setReadTimeout(Duration.ofSeconds(6));
        this.http = RestClient.builder().requestFactory(factory)
                .defaultHeader("User-Agent", "CardTrade-Market/1.0 (https://cardtrade-market.vercel.app)")
                .build();
    }

    @Override
    public String game() {
        return "POKEMON";
    }

    @Override
    public String fuente() {
        return "TCGdex";
    }

    @Override
    public int prioridad() {
        return 1;
    }

    @Override
    public List<MarketCard> buscar(String q, int limit) throws Exception {
        String json = http.get()
                .uri(b -> b.scheme("https").host("api.tcgdex.dev").path("/v2/en/cards")
                        .queryParam("name", q)
                        .queryParam("limit", limit)
                        .build())
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
                .uri(b -> b.scheme("https").host("api.tcgdex.dev").path("/v2/en/cards/{id}").build(externalId))
                .retrieve()
                .body(String.class);
        JsonNode n = om.readTree(json);
        if (!n.has("id")) return Optional.empty();
        MarketCard c = mapear(n);
        List<MarketCard.PricePoint> precios = new ArrayList<>();
        if (c.getPriceUsd() != null) {
            precios.add(MarketCard.PricePoint.builder().market(c.getSource()).valueUsd(c.getPriceUsd()).build());
        }
        return Optional.of(MarketCard.Detail.builder()
                .game(c.getGame()).externalId(c.getExternalId()).name(c.getName())
                .setName(c.getSetName()).setCode(c.getSetCode()).rarity(c.getRarity())
                .number(c.getNumber()).description(c.getDescription()).image(c.getImage())
                .priceUsd(c.getPriceUsd()).source(c.getSource()).url(c.getUrl())
                .prices(precios).updatedAt(c.getUpdatedAt())
                .build());
    }

    private MarketCard mapear(JsonNode n) {
        Double precio = null;
        String mercado = "TCGdex";
        JsonNode variant = n.path("variant");
        if (variant.hasNonNull("price")) {
            precio = variant.get("price").asDouble();
        } else if (n.hasNonNull("price")) {
            precio = n.get("price").asDouble();
        }
        String imagen = n.hasNonNull("image") ? n.get("image").asText() : null;
        String setId = n.path("setId").asText(null);
        return MarketCard.builder()
                .game("POKEMON")
                .externalId(n.path("id").asText(null))
                .name(n.path("name").asText(null))
                .setName(n.path("category").asText(null))
                .setCode(setId)
                .rarity(n.path("rarity").asText(null))
                .number(null)
                .description(null)
                .image(imagen)
                .priceUsd(precio)
                .source(mercado)
                .url(setId != null ? "https://www.tcgdex.dev/en/cards/" + n.path("id").asText() : null)
                .updatedAt(new Date())
                .build();
    }
}
