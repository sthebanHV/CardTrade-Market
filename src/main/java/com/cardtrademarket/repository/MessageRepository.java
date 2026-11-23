package com.cardtrademarket.repository;

import com.cardtrademarket.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String>, MessageRepositoryCustom {

    List<Message> findByConversationIdOrderByCreatedAtAsc(String conversationId);

    long countByConversationIdAndSenderIdNotAndLeidoFalse(String conversationId, String senderId);

    // marcarLeidos / noLeidosDe -> MessageRepositoryCustom
}
