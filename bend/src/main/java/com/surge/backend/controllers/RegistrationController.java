package com.surge.backend.controllers;

import com.surge.backend.domains.User;
import com.surge.backend.services.RegistrationService;
import com.surge.backend.utils.LoginUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/register")
@CrossOrigin
public class RegistrationController {

    private final RegistrationService service;

    @PostMapping("/confirm")
    public void verifyEmail(@RequestParam String token) {
        service.verifyEmail(token);
    }

    @PostMapping
    public void registerNewUser(@RequestBody User user) {
        service.registerNewUser(user);
    }

    @PatchMapping("/firsttime")
    public void updateFirstTimeUser(@RequestBody User user){
        service.updateFirstTimeUser(user);
    }

}
