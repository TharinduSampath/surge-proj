package com.surge.backend.controllers;

import com.surge.backend.domains.AppUser;
import com.surge.backend.domains.Note;
import com.surge.backend.services.AppUserService;
import com.surge.backend.services.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/note")
@AllArgsConstructor
public class NoteController {

    private NoteService service;

    @PostMapping
    public void createNote(@RequestBody Note note) {
        service.createNote(note);
    }

    //TODO: Make controllers support pagination.
    @GetMapping
    public List<Note> getNotes() {
        return service.getNotes();
    }

    @PatchMapping
    public void updateNote(@RequestBody Note note) {
        service.updateNote(note);
    }

    @DeleteMapping
    public void deleteUser(@RequestBody Note note) {
        service.deleteNote(note);
    }

}
