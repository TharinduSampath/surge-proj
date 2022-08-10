package com.surge.backend.services;

import com.surge.backend.domains.Note;
import com.surge.backend.repos.UserRepository;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor @Service
public class UserService {
    private final UserRepository repo;
    private final MongoTemplate template;

    public Page<User> getUsers(String search, Pageable pageable, String status) {
        Query query = new Query().with(pageable);
        final List<Criteria> criteria = new ArrayList<>();

        criteria.add(Criteria.where("status").regex(String.format("^%s$",status), "i"));
        if (search != null && !search.isBlank()) {
            criteria.add(Criteria.where("title").regex(search, "i"));
        }
        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));

        return PageableExecutionUtils.getPage(
                template.find(query, User.class),
                pageable,
                () -> template.count(query.skip(0).limit(0), User.class));
    }
}
