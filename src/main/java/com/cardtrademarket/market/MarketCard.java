package com.cardtrademarket.market;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarketCard {

    private String game;       // MAGIC | POKEMON | YUGIOH
    private String externalId;
    private String name;
    private String setName;
    private String setCode;
    private String rarity;
    private String number;
    private String description;
    private String image;
    private Double priceUsd;
    private String source;     // Scryfall, TCGPlayer, Cardmarket...
    private String url;        // enlace a la fuente oficial
    private Date updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PricePoint {
        private String market;
        private Double valueUsd;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Detail {
        private String game;
        private String externalId;
        private String name;
        private String setName;
        private String setCode;
        private String rarity;
        private String number;
        private String description;
        private String image;
        private Double priceUsd;
        private String source;
        private String url;
        private List<PricePoint> prices;
        private Date updatedAt;
    }
}
