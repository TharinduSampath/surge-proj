package com.surge.backend.services;

import com.surge.backend.domains.Note;
import com.surge.backend.repos.NoteRepository;
import lombok.AllArgsConstructor;
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


@Slf4j
@Service @AllArgsConstructor
public class NoteService {
    private final NoteRepository repo;
    private final MongoTemplate template;

    public Page<Note> getNotes(String search, Pageable pageable, String email) {
        var query = new Query().with(pageable);
        final List<Criteria> criteria = new ArrayList<>();

        criteria.add(Criteria.where("userEmail").regex(String.format("^%s$",email), "i"));
        if (search != null && !search.isBlank()) {
            criteria.add(Criteria.where("title").regex(search, "i"));
        }
        query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));

        //Understand what this does later.
        return PageableExecutionUtils.getPage(
                template.find(query, Note.class),
                pageable,
                () -> template.count(query.skip(0).limit(0), Note.class));
    }

    public void saveNote(Note note) {
        repo.save(note);
    }

    public void deleteNote(String email, String id) {
        Note note = repo.findById(id).orElseThrow(() -> new IllegalStateException("No such note!"));
        if (!note.getUserEmail().equals(email)) {
            throw new IllegalStateException("That note is not yours to delete!");
        }
        repo.deleteById(id);
    }

    public void editNote(Note note) {
        Note newNote = repo.findById(note.getId()).orElseThrow(() -> new IllegalStateException("No such note!"));
        newNote.setTitle(note.getTitle());
        newNote.setDescription(note.getDescription());
        log.info("Editing a note {} ", newNote);
        repo.save(newNote);
    }
}
