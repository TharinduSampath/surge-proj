package com.surge.backend.services;

import com.surge.backend.domains.RegistrationToken;
import com.surge.backend.repos.RegistrationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service @AllArgsConstructor
public class RegistrationTokenService {
    private final RegistrationTokenRepository repo;

    public void saveRegistrationToken(RegistrationToken regToken) {
        repo.save(regToken);
    }

    public Optional<RegistrationToken> getToken(String token) {
        return repo.findByToken(token);
    }

    public void setConfirmedAt(String token) {
        RegistrationToken regToken = repo
                .findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found!"));
        regToken.setConfirmedAt(LocalDateTime.now());
    }
}
