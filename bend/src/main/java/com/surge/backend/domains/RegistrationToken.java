package com.surge.backend.domains;

import com.mongodb.lang.NonNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document @Data @NoArgsConstructor
public class RegistrationToken {
    @Id
    private String id;
    private String appUserEmail;

    @NonNull
    private String token;

    @NonNull
    private LocalDateTime createdAt;

    @NonNull
    private LocalDateTime expiredAt;
    private LocalDateTime confirmedAt;

    //TODO: Look into better NonNull implementation

    public RegistrationToken(String appUserEmail, String token, LocalDateTime createdAt, LocalDateTime expiredAt) {
        this.appUserEmail = appUserEmail;
        this.token = token;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
    }
}
