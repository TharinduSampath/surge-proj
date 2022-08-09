package com.surge.backend.repos;

import com.surge.backend.domains.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true) @Repository
public interface AppUserRepo extends MongoRepository<AppUser, String> {
    Optional<AppUser> findByEmail(String email);
}
