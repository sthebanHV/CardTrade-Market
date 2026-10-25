package com.cardtrademarket.market;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketSearchResult {
    private List<MarketCard> results;
    private List<String> unavailable;
}
