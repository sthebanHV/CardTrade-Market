package com.cardtrademarket.repository;

/**
 * Métodos que en JPA eran @Query JPQL con subquery / @Modifying.
 * En MongoDB se implementan con MongoTemplate (MessageRepositoryCustomImpl).
 */
public interface MessageRepositoryCustom {

    /** Marca como leídos los mensajes de una conversación que no son míos. */
    int marcarLeidos(String conversationId, String userId);

    /** Cantidad de mensajes no leídos en todas las conversaciones del usuario. */
    long noLeidosDe(String userId);
}
