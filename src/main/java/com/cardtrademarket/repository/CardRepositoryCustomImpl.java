package com.cardtrademarket.repository;

import com.cardtrademarket.model.Card;
import com.mongodb.client.result.UpdateResult;
import java.util.List;
import java.util.regex.Pattern;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class CardRepositoryCustomImpl implements CardRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public CardRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Card> searchByText(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        // Pattern.quote evita que caracteres especiales del usuario rompan el regex
        String safe = Pattern.quote(query.trim());
        Criteria criterio = new Criteria().orOperator(
                Criteria.where("nombre").regex(safe, "i"),
                Criteria.where("tipo").regex(safe, "i"),
                Criteria.where("edition").regex(safe, "i"),
                Criteria.where("descripcion").regex(safe, "i"));
        return mongoTemplate.find(Query.query(criterio), Card.class);
    }

    @Override
    public int incrementarVistas(String id) {
        UpdateResult result = mongoTemplate.updateFirst(
                Query.query(Criteria.where("id").is(id)),
                new Update().inc("vistas", 1),
                Card.class);
        return result.getModifiedCount() > 0 ? 1 : 0;
    }
}
