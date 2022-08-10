package com.surge.backend.services;

import com.surge.backend.repos.UserRepository;
import lombok.AllArgsConstructor;
import com.surge.backend.domains.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor @Service @Slf4j
public class UserService {
    private final UserRepository repo;
    private final MongoTemplate template;

    public Page<User> getUsers(String search, Pageable pageable, boolean status) {
        Query query = new Query().with(pageable);
        final List<Criteria> criteria = new ArrayList<>();

        criteria.add(Criteria.where("status").is(status));
        if (search != null && !search.isBlank()) {
            criteria.add(Criteria.where("title").regex(search, "i"));
        }
        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));

        return PageableExecutionUtils.getPage(
                template.find(query, User.class),
                pageable,
                () -> template.count(query.skip(0).limit(0), User.class));
    }

    public User getUser(String email) {
        return repo.findByEmail(email).orElseThrow(() -> new IllegalStateException("User doesnt exist!"));
    }
}
