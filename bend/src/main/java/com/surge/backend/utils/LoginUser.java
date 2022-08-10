package com.surge.backend.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor @Data
public class LoginUser {
    private String email;
    private String password;
}
