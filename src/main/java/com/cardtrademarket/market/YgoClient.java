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
public class YgoClient implements MarketClient {

    private final RestClient http;
    private final ObjectMapper om = new ObjectMapper();

    public YgoClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(8));
        this.http = RestClient.builder().requestFactory(factory)
                .defaultHeader("User-Agent", "CardTrade-Market/1.0 (https://cardtrade-market.vercel.app)")
                .build();
    }

    @Override
    public String game() {
        return "YUGIOH";
    }

    @Override
    public String fuente() {
        return "YGOPRODeck";
    }

    @Override
    public int prioridad() {
        return 0;
    }

    @Override
    public List<MarketCard> buscar(String q, int limit) throws Exception {
        String json = http.get()
                .uri(b -> b.scheme("https").host("db.ygoprodeck.com").path("/api/v7/cardinfo.php")
                        .queryParam("fname", q)
                        .queryParam("num", limit)
                        .queryParam("offset", 0)
                        .build())
                .retrieve()
                .body(String.class);
        JsonNode raiz = om.readTree(json);
        if (!raiz.has("data")) return List.of();
        List<MarketCard> out = new ArrayList<>();
        for (JsonNode n : raiz.get("data")) {
            if (out.size() >= limit) break;
            out.add(mapear(n));
        }
        return out;
    }

    @Override
    public Optional<MarketCard.Detail> detalle(String externalId) throws Exception {
        String json = http.get()
                .uri(b -> b.scheme("https").host("db.ygoprodeck.com").path("/api/v7/cardinfo.php")
                        .queryParam("id", externalId)
                        .build())
                .retrieve()
                .body(String.class);
        JsonNode raiz = om.readTree(json);
        if (!raiz.has("data") || raiz.get("data").size() == 0) return Optional.empty();
        MarketCard c = mapear(raiz.get("data").get(0));
        List<MarketCard.PricePoint> precios = new ArrayList<>();
        JsonNode p = raiz.get("data").get(0).path("card_prices").path(0);
        agregar(precios, "TCGPlayer", p.path("tcgplayer_price").asText(null));
        agregar(precios, "Cardmarket", p.path("cardmarket_price").asText(null));
        agregar(precios, "eBay", p.path("ebay_price").asText(null));
        agregar(precios, "Amazon", p.path("amazon_price").asText(null));
        agregar(precios, "CoolStuffInc", p.path("coolstuffinc_price").asText(null));
        return Optional.of(MarketCard.Detail.builder()
                .game(c.getGame()).externalId(c.getExternalId()).name(c.getName())
                .setName(c.getSetName()).setCode(c.getSetCode()).rarity(c.getRarity())
                .number(c.getNumber()).description(c.getDescription()).image(c.getImage())
                .priceUsd(c.getPriceUsd()).source(c.getSource()).url(c.getUrl())
                .prices(precios).updatedAt(c.getUpdatedAt())
                .build());
    }

    private void agregar(List<MarketCard.PricePoint> lista, String mercado, String valor) {
        if (valor == null || valor.isBlank()) return;
        try {
            double v = Double.parseDouble(valor);
            if (v > 0) lista.add(MarketCard.PricePoint.builder().market(mercado).valueUsd(v).build());
        } catch (NumberFormatException ignored) {
        }
    }

    private MarketCard mapear(JsonNode n) {
        Double precio = null;
        JsonNode precios = n.path("card_prices");
        if (precios.size() > 0) {
            String t = precios.get(0).path("tcgplayer_price").asText(null);
            if (t != null && !t.isBlank()) {
                try {
                    precio = Double.parseDouble(t);
                } catch (NumberFormatException ignored) {
                }
            }
        }
        String setName = null;
        String setCode = null;
        JsonNode sets = n.path("card_sets");
        if (sets.size() > 0) {
            setName = sets.get(0).path("set_name").asText(null);
            setCode = sets.get(0).path("set_code").asText(null);
        }
        String imagen = null;
        JsonNode imgs = n.path("card_images");
        if (imgs.size() > 0) imagen = imgs.get(0).path("image_url").asText(null);
        long id = n.path("id").asLong(0);
        String desc = n.path("desc").asText(null);
        if (desc != null && desc.length() > 240) desc = desc.substring(0, 237) + "...";
        return MarketCard.builder()
                .game("YUGIOH")
                .externalId(id > 0 ? String.valueOf(id) : null)
                .name(n.path("name").asText(null))
                .setName(setName)
                .setCode(setCode)
                .rarity(n.path("rarity").asText(null))
                .number(setCode)
                .description(desc)
                .image(imagen)
                .priceUsd(precio)
                .source("TCGPlayer")
                .url(id > 0 ? "https://ygoprodeck.com/card-guide/card/" + id : null)
                .updatedAt(new Date())
                .build();
    }
}
