package com.cardtrademarket.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

/**
 * ddl-auto=update crea pero no actualiza CHECK constraints de enums.
 * Cuando se agrega un valor al enum (p.ej. PAUSADO) hay que refrescarlo aquí.
 */
@Component
public class SchemaFixup {

    private static final Logger log = LoggerFactory.getLogger(SchemaFixup.class);

    private final JdbcTemplate jdbc;

    public SchemaFixup(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @PostConstruct
    public void fix() {
        try {
            jdbc.execute("ALTER TABLE cards DROP CONSTRAINT IF EXISTS cards_status_check");
            jdbc.execute("ALTER TABLE cards ADD CONSTRAINT cards_status_check "
                    + "CHECK (status IN ('PUBLICADO','PAUSADO','VENDIDO','RESERVADO','INACTIVO'))");
            log.info("SchemaFixup: cards_status_check actualizado");
        } catch (Exception e) {
            log.warn("SchemaFixup: no se pudo actualizar cards_status_check: {}", e.getMessage());
        }
    }
}
