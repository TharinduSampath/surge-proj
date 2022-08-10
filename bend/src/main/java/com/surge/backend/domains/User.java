package com.surge.backend.domains;

import com.surge.backend.utils.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document @AllArgsConstructor @Data @NoArgsConstructor
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;

    @Indexed(unique = true)
    private String email;
    private LocalDate dateOfBirth;
    private int mobile;
    private boolean status; //True -> enabled
    private String password;
    private AccountType accountType;

    public User(String email) {
        this.email = email;
        this.accountType = AccountType.USER;
        this.status = false;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.accountType = AccountType.USER;
        this.status = false;
    }

    public User(String firstName, String lastName, String email, LocalDate dateOfBirth, int mobile, boolean status, String password, AccountType accountType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.mobile = mobile;
        this.status = status;
        this.password = password;
        this.accountType = accountType;
    }
}
