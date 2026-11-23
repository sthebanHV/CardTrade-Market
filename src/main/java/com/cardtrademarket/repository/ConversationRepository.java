package com.cardtrademarket.repository;

import com.cardtrademarket.model.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends MongoRepository<Conversation, String> {

    @Query(value = "{ $or: [ { participante1: ?0 }, { participante2: ?0 } ] }",
            sort = "{ lastMessageAt: -1 }")
    List<Conversation> deUsuario(@Param("u") String u);

    @Query("{ $or: [ { $and: [ { participante1: ?0 }, { participante2: ?1 } ] },"
            + " { $and: [ { participante1: ?1 }, { participante2: ?0 } ] } ] }")
    Optional<Conversation> entre(@Param("a") String a, @Param("b") String b);
}
