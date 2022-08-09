package com.surge.backend.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document @Data @AllArgsConstructor
public class AppUser {
    @Id
    private long id;
    private String firstName;
    private String lastName;

    @Indexed(unique = true)
    private String email;
    private LocalDate dateOfBirth;
    private int mobile;
    private boolean status;
    private String password;
    private String accountType;
}
