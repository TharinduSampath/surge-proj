package com.surge.backend.services;

import com.surge.backend.repos.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor @Service
public class UserService {
    private final UserRepository repo;
}
