package com.cardtrademarket.repository;

import com.cardtrademarket.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, String> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(String conversationId);

    @Modifying
    @Query("UPDATE Message m SET m.leido = true WHERE m.conversationId = :cid AND m.senderId <> :yo AND m.leido = false")
    int marcarLeidos(@Param("cid") String cid, @Param("yo") String yo);

    @Query("SELECT COUNT(m) FROM Message m WHERE m.leido = false AND m.senderId <> :yo "
            + "AND m.conversationId IN (SELECT c.id FROM Conversation c WHERE c.participante1 = :yo OR c.participante2 = :yo)")
    long noLeidosDe(@Param("yo") String yo);

    long countByConversationIdAndSenderIdNotAndLeidoFalse(String conversationId, String senderId);
}
