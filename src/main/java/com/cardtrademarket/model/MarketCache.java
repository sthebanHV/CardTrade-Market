package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "market_cache")
public class MarketCache {

    @Id
    private String id;

    @Indexed(unique = true)
    private String cacheKey;

    private String payload;

    private Date createdAt;
}
