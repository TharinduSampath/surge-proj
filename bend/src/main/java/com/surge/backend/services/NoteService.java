package com.surge.backend.services;

import com.surge.backend.domains.AppUser;
import com.surge.backend.domains.Note;
import com.surge.backend.repos.NoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @AllArgsConstructor
public class NoteService {

    private NoteRepository repo;

    public void createNote(Note note) {
        repo.save(note);
    }

    public List<Note> getNotes() {
        return repo.findAll();
    }

    public void updateNote(Note note) {
        repo.save(note);
    }

    public void deleteNote(Note note) {
        repo.delete(note);
    }
}
