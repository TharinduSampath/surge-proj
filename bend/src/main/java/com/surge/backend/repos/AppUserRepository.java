package com.surge.backend.repos;

import com.surge.backend.domains.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppUserRepository extends MongoRepository<AppUser, Long> {
}
