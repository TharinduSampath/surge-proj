package com.surge.backend.controllers;

import com.surge.backend.services.LoginService;
import com.surge.backend.utils.LoginUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController @RequestMapping("/login")
public class LoginController {

    private final LoginService service;

    @GetMapping
    public Map<String, String> login(@RequestBody LoginUser loginUser) {
        return service.login(loginUser);
    }
}
