package com.surge.backend.controllers;

import com.surge.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController @AllArgsConstructor @RequestMapping("/user")
public class UserController {
    private final UserService service;

    public Page<User> getUsers (@RequestParam String status,
                               @RequestParam(required = false) String search,
                               @RequestParam(required = false) Integer page,
                               @RequestParam(required = false) Integer size) {
        Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size: 20);
        return service.getUsers(search, pageable, status);
    }
}
