package com.surge.backend.controllers;

import com.surge.backend.services.UserService;
import lombok.AllArgsConstructor;
import com.surge.backend.domains.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController @AllArgsConstructor @RequestMapping("/user")
public class UserController {
    private final UserService service;

    @GetMapping
    public Page<User> getUsers (@RequestParam boolean status,
                               @RequestParam(required = false) String search,
                               @RequestParam(required = false) Integer page,
                               @RequestParam(required = false) Integer size) {
        Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size: 20);
        return service.getUsers(search, pageable, status);
    }
}
