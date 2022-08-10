package com.surge.backend.services;

import com.surge.backend.domains.RegistrationToken;
import com.surge.backend.domains.User;
import com.surge.backend.repos.RegistrationTokenRepository;
import com.surge.backend.repos.UserRepository;
import com.surge.backend.utils.AccountType;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j @AllArgsConstructor @Service
public class RegistrationService {

    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepo;
    private final RegistrationTokenRepository tokenRepo;

    public void configureFirstTimeUser(User user) {
    }

    public void registerNewUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already exists!");
        }

        String pass = String.valueOf(ThreadLocalRandom.current().nextInt(0, 999999 + 1));
        user.setPassword(pass); //Always results in invalid password if using encoder?
        user.setAccountType(AccountType.USER); //Doesn't automatically get set for some reason?

        String token = UUID.randomUUID().toString();
        RegistrationToken regToken = new RegistrationToken(token, user.getEmail());

        log.info("Created regToken {} for {} and a temporary password {}", token, user.getEmail(), pass);
        log.info("Full user details are {}", user);

        //TODO: Send mail with registration token and password

        userRepo.save(user);
        tokenRepo.save(regToken);
    }

    public void verifyEmail(String token) {
        RegistrationToken regToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Token doesnt exist!"));
        User user = userRepo.findByEmail(regToken.getUserEmail())
                .orElseThrow(() -> new IllegalStateException("User doesn't exist!"));
        if (user.isStatus()) {
            throw new IllegalStateException("User is already enabled!");
        }

        regToken.setConfirmedAt(LocalDateTime.now());
        user.setStatus(true);
        log.info("Email {} verified with token {}", user.getEmail(), regToken.getToken());

        userRepo.save(user);
        tokenRepo.save(regToken);
    }
}
