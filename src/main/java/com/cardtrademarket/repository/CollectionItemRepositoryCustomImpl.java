package com.cardtrademarket.repository;

import com.cardtrademarket.model.CollectionItem;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CollectionItemRepositoryCustomImpl implements CollectionItemRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public CollectionItemRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<CollectionItem> buscar(String userId, String juego, String rareza, String estado) {
        Criteria criterio = Criteria.where("userId").is(userId);
        if (juego != null) {
            criterio = criterio.and("juego").is(juego);
        }
        if (rareza != null) {
            criterio = criterio.and("rareza").is(rareza);
        }
        if (estado != null) {
            criterio = criterio.and("estado").is(estado);
        }
        Query query = Query.query(criterio).with(Sort.by(Sort.Direction.DESC, "createdAt"));
        return mongoTemplate.find(query, CollectionItem.class);
    }
}
