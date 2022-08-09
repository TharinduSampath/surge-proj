package com.surge.backend.services;

import com.surge.backend.domains.AppUser;
import com.surge.backend.domains.RegistrationRequest;
import com.surge.backend.domains.RegistrationToken;
import com.surge.backend.email.EmailSender;
import com.surge.backend.utils.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service @AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final RegistrationTokenService registrationTokenService;
    private final EmailSender emailSender;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException(String.format("Email %s not valid!", request.getEmail()));
        }
        String token = appUserService.signUpUser(new AppUser(
                request.getEmail(),
                request.getPassword()
        ));
        String link = "http://localhost:8080/confirm?token=" + token; //TODO: Find a way to generate the link automatically.
        emailSender.send(request.getEmail(), buildEmail(link));
        return token;
    }

    private String buildEmail(String link) {
        return "Hi! This is an email from an interview project. Click this link to verify your account: " + link;
    }

    public String confirmToken(String token) {
        RegistrationToken regToken = registrationTokenService
                .getToken(token)
                .orElseThrow(() ->  new IllegalStateException("Token not found!"));
        if (regToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed!");
        }
        if (regToken.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired!");
        }
        registrationTokenService.setConfirmedAt(token);
        String email = regToken.getAppUserEmail();
        appUserService.enableAppUser(email);
        return String.format("Confirmed email %s with token %s", email, token);
    }

}
