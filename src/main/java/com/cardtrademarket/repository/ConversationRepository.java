package com.cardtrademarket.repository;

import com.cardtrademarket.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, String> {

    @Query("SELECT c FROM Conversation c WHERE c.participante1 = :u OR c.participante2 = :u ORDER BY c.lastMessageAt DESC")
    List<Conversation> deUsuario(@Param("u") String u);

    @Query("SELECT c FROM Conversation c WHERE (c.participante1 = :a AND c.participante2 = :b) "
            + "OR (c.participante1 = :b AND c.participante2 = :a)")
    Optional<Conversation> entre(@Param("a") String a, @Param("b") String b);
}
