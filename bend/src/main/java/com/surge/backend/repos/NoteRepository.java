package com.surge.backend.repos;


import com.surge.backend.domains.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoteRepository extends MongoRepository<Note, Long> {
}
