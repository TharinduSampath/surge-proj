package com.surge.backend.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document @AllArgsConstructor @Data @NoArgsConstructor
public class Note {
    @Id
    public String id;
    public String userEmail;
    public String title;
    public String description;

    public Note(String userEmail, String title, String description) {
        this.userEmail = userEmail;
        this.title = title;
        this.description = description;
    }
}
