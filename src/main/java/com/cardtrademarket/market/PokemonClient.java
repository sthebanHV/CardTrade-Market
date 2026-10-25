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
public class PokemonClient implements MarketClient {

    private final RestClient http;
    private final ObjectMapper om = new ObjectMapper();
    private final String apiKey;

    public PokemonClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(8));
        RestClient.Builder b = RestClient.builder()
                .requestFactory(factory)
                .defaultHeader("User-Agent", "CardTrade-Market/1.0 (https://cardtrade-market.vercel.app)")
                .defaultHeader("Accept", "application/json");
        String key = System.getenv("POKEMONTCG_API_KEY");
        if (key != null && !key.isBlank()) {
            b.defaultHeader("X-Api-Key", key);
            this.apiKey = key;
        } else {
            this.apiKey = null;
        }
        this.http = b.build();
    }

    @Override
    public String game() {
        return "POKEMON";
    }

    @Override
    public String fuente() {
        return "Pokémon TCG API";
    }

    @Override
    public int prioridad() {
        return 0;
    }

    @Override
    public List<MarketCard> buscar(String q, int limit) throws Exception {
        String json = http.get()
                .uri(b -> b.scheme("https").host("api.pokemontcg.io").path("/v2/cards")
                        .queryParam("q", "name:\"" + q.replace("\"", "") + "\"")
                        .queryParam("pageSize", limit)
                        .queryParam("orderBy", "-set.releaseDate")
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
                .uri(b -> b.scheme("https").host("api.pokemontcg.io").path("/v2/cards/{id}").build(externalId))
                .retrieve()
                .body(String.class);
        JsonNode n = om.readTree(json).path("data");
        if (n.isMissingNode() || n.isNull()) return Optional.empty();
        MarketCard c = mapear(n);
        List<MarketCard.PricePoint> precios = new ArrayList<>();
        JsonNode prices = n.path("tcgplayer").path("prices");
        agregar(precios, "TCGPlayer Normal", prices.path("normal").path("market").asDouble(0));
        agregar(precios, "TCGPlayer Holofoil", prices.path("holofoil").path("market").asDouble(0));
        agregar(precios, "TCGPlayer Reverse Holo", prices.path("reverseHolofoil").path("market").asDouble(0));
        return Optional.of(MarketCard.Detail.builder()
                .game(c.getGame()).externalId(c.getExternalId()).name(c.getName())
                .setName(c.getSetName()).setCode(c.getSetCode()).rarity(c.getRarity())
                .number(c.getNumber()).description(c.getDescription()).image(c.getImage())
                .priceUsd(c.getPriceUsd()).source(c.getSource()).url(c.getUrl())
                .prices(precios).updatedAt(c.getUpdatedAt())
                .build());
    }

    private void agregar(List<MarketCard.PricePoint> lista, String mercado, double valor) {
        if (valor > 0) lista.add(MarketCard.PricePoint.builder().market(mercado).valueUsd(valor).build());
    }

    private MarketCard mapear(JsonNode n) {
        Double precio = null;
        JsonNode prices = n.path("tcgplayer").path("prices");
        for (String variante : new String[]{"normal", "holofoil", "reverseHolofoil", "doubleSidedHolofoil"}) {
            if (prices.path(variante).hasNonNull("market")) {
                precio = prices.path(variante).get("market").asDouble();
                break;
            }
        }
        String imagen = null;
        if (n.path("images").hasNonNull("large")) imagen = n.path("images").get("large").asText();
        else if (n.path("images").hasNonNull("small")) imagen = n.path("images").get("small").asText();
        JsonNode set = n.path("set");
        return MarketCard.builder()
                .game("POKEMON")
                .externalId(n.path("id").asText(null))
                .name(n.path("name").asText(null))
                .setName(set.path("name").asText(null))
                .setCode(set.path("series").asText(null) + (set.hasNonNull("number") ? " " + set.get("number").asText() : ""))
                .rarity(n.path("rarity").asText(null))
                .number(set.path("number").asText(null))
                .description(null)
                .image(imagen)
                .priceUsd(precio)
                .source("TCGPlayer")
                .url(n.path("tcgplayer").path("url").asText(null))
                .updatedAt(new Date())
                .build();
    }
}
