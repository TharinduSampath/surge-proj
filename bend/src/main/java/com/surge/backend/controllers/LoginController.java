package com.surge.backend.controllers;

import com.surge.backend.services.LoginService;
import com.surge.backend.utils.LoginUser;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@AllArgsConstructor
@RestController @RequestMapping("/login")
@Slf4j
//TODO: Put this into a property file
public class LoginController {

    private final LoginService service;

    @PostMapping
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginUser loginUser) {
        log.info("Request received! {}", loginUser);
        return ResponseEntity.ok().body(service.login(loginUser));
    }
}
