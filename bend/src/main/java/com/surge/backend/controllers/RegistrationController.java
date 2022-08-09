package com.surge.backend.controllers;

import com.surge.backend.domains.RegistrationRequest;
import com.surge.backend.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("api/register") @AllArgsConstructor
public class RegistrationController {
    private final RegistrationService service;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        //TODO: Currently this endpoint requires an email and a password. Generate the password serverside in the future.
        return service.register(request);
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam String token) {
        return service.confirmToken(token);
    }
}
