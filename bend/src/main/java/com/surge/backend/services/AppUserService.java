package com.surge.backend.services;

import com.surge.backend.domains.AppUser;
import com.surge.backend.repos.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @AllArgsConstructor
public class AppUserService {

    private AppUserRepository repo;

    public void createAppUser(AppUser user) {
        repo.save(user);
    }

    public List<AppUser> getAppUsers() {
        return repo.findAll();
    }

    public void updateAppUser(AppUser user) {
        repo.save(user);
    }

    public void deleteAppUser(AppUser user) {
        repo.delete(user);
    }
}
