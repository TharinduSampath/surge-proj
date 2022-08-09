package com.surge.backend.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document @Data @AllArgsConstructor
public class Note {

    @Id
    private long id;
    private String title;
    private String description;
}
