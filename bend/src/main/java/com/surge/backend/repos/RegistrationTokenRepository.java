package com.surge.backend.repos;

import com.surge.backend.domains.RegistrationToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RegistrationTokenRepository extends MongoRepository<RegistrationToken, String> {
    Optional<RegistrationToken> findByToken(String token);
}
