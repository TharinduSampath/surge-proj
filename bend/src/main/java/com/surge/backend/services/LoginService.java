package com.surge.backend.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.surge.backend.repos.UserRepository;
import com.surge.backend.utils.LoginUser;
import com.surge.backend.domains.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@AllArgsConstructor @Service @Slf4j
public class LoginService {
    private final BCryptPasswordEncoder passEncoder;
    private final UserRepository userRepo;

    public Map<String, String> login(LoginUser loginUser) {
        log.info("Handling login request by {}", loginUser.getEmail());
        User user = userRepo.findByEmail(loginUser.getEmail()).orElseThrow(() -> new IllegalStateException("Invalid Email!"));
        if (!loginUser.getPassword().equals(user.getPassword())) {
            log.error("Password disparity! {} , {}", loginUser.getPassword(), user.getPassword());
            throw new IllegalStateException("Invalid Password!");
        }
        if (!user.isStatus()) {
            throw new IllegalStateException("User not verified!");
        }

        Algorithm algo = Algorithm.HMAC256("SURGE");
        String accessToken = JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .withClaim("accountType", user.getAccountType().toString())
                .sign(algo);
        String refreshToken = JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + 100 * 60 * 1000))
                .withClaim("accountType", user.getAccountType().toString())
                .sign(algo);
        String isNewUser = user.getFirstName() == null || user.getFirstName().isBlank() ? "true" : "false";
        //TODO: I need a sensible way to check authentication on API access... I can probably store these in some object for comparison on later requests.

        return Map.of("accessToken", accessToken, "refreshToken", refreshToken, "isNewUser", isNewUser);
    }
}
