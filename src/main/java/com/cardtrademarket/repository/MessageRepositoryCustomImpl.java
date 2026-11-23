package com.cardtrademarket.repository;

import com.cardtrademarket.model.Conversation;
import com.cardtrademarket.model.Message;
import com.mongodb.client.result.UpdateResult;
import java.util.List;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class MessageRepositoryCustomImpl implements MessageRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public MessageRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public int marcarLeidos(String conversationId, String userId) {
        UpdateResult result = mongoTemplate.updateMulti(
                Query.query(Criteria.where("conversationId").is(conversationId)
                        .and("senderId").ne(userId)
                        .and("leido").is(false)),
                Update.update("leido", true),
                Message.class);
        return (int) result.getModifiedCount();
    }

    @Override
    public long noLeidosDe(String userId) {
        // Subquery original: conversaciones donde el usuario participa.
        // Nota: no usar findDistinct sobre "id" porque _id se almacena como ObjectId
        // y no puede leerse directamente como String; se leen las entidades y se
        // extraen los ids (el mapper convierte ObjectId -> String).
        List<String> conversaciones = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                        Criteria.where("participante1").is(userId),
                        Criteria.where("participante2").is(userId))),
                Conversation.class).stream()
                .map(Conversation::getId)
                .toList();
        if (conversaciones.isEmpty()) {
            return 0;
        }
        return mongoTemplate.count(
                Query.query(Criteria.where("leido").is(false)
                        .and("senderId").ne(userId)
                        .and("conversationId").in(conversaciones)),
                Message.class);
    }
}
