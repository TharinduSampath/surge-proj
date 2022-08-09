package com.surge.backend.controllers;

import com.surge.backend.domains.AppUser;
import com.surge.backend.services.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/appuser")
@AllArgsConstructor
public class AppUserController {

    private AppUserService service;

    @PostMapping
    public void createAppUser(@RequestBody AppUser user) {
        service.createAppUser(user);
    }

    @GetMapping
    public List<AppUser> getAppUsers() {
        return service.getAppUsers();
    }

    @PatchMapping
    public void updateAppUser(@RequestBody AppUser user) {
        service.updateAppUser(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestBody AppUser user) {
        service.deleteAppUser(user);
    }

}
