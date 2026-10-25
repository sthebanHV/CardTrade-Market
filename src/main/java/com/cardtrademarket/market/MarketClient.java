package com.cardtrademarket.market;

import java.util.List;
import java.util.Optional;

public interface MarketClient {

    /** Clave canónica del juego: MAGIC | POKEMON | YUGIOH */
    String game();

    /** Nombre de la fuente para mostrar en UI */
    String fuente();

    /** 0 = fuente principal, 1 = fallback */
    int prioridad();

    List<MarketCard> buscar(String q, int limit) throws Exception;

    Optional<MarketCard.Detail> detalle(String externalId) throws Exception;

    default Optional<MarketCard> resolver(String nombre, int limit) throws Exception {
        List<MarketCard> resultados = buscar(nombre, limit);
        return MarketService.mejorMatch(nombre, resultados);
    }
}
