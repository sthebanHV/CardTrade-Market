package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "profile_changes")
public class ProfileChange {

    @Id
    private String id;

    private String userId;

    private String campo;

    private String valorAnterior;

    private String valorNuevo;

    private Date fecha;
}
