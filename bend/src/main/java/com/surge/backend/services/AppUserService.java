package com.surge.backend.services;

import com.surge.backend.domains.AppUser;
import com.surge.backend.domains.RegistrationToken;
import com.surge.backend.repos.AppUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service @AllArgsConstructor
public class AppUserService implements UserDetailsService {
    private final AppUserRepo repo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RegistrationTokenService registrationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format("Email %s not found!", email )));
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = repo
                .findByEmail(appUser.getEmail())
                .isPresent();
        if (userExists) {
            throw new IllegalStateException("Email already taken!");
        }
        appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
        repo.save(appUser);
        //TODO: Might have to change RegistrationToken to store a user id.
        String token = UUID.randomUUID().toString();
        RegistrationToken regToken = new RegistrationToken(
                appUser.getEmail(),
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(10)
        );
        registrationTokenService.saveRegistrationToken(regToken);
        //TODO: Send email
        return token;
    }

    public AppUser getAppUser(String email) {
        return repo.findByEmail(email).orElseThrow(() -> new IllegalStateException(String.format("No user with email %s", email)));
    }

    public void enableAppUser(String email) {
        AppUser appUser = getAppUser(email);
        appUser.setEnabled(true);
        repo.save(appUser);
    }
}
