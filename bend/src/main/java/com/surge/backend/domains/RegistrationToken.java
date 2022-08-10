package com.surge.backend.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document
@AllArgsConstructor @Data @NoArgsConstructor
public class RegistrationToken {
    private String id;
    private String token;
    private String userEmail;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
    private LocalDateTime confirmedAt;

    public RegistrationToken(String token, String userEmail) {
        this.token = token;
        this.userEmail = userEmail;
        this.createdAt = LocalDateTime.now();
        this.expiredAt = LocalDateTime.now().plusMinutes(10);
    }

    public RegistrationToken(String token, String userEmail, LocalDateTime createdAt, LocalDateTime expiredAt, LocalDateTime confirmedAt) {
        this.token = token;
        this.userEmail = userEmail;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.confirmedAt = confirmedAt;
    }
}
