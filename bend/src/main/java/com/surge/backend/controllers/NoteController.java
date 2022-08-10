package com.surge.backend.controllers;

import com.surge.backend.domains.Note;
import com.surge.backend.services.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/note")
public class NoteController {

    private final NoteService service;

    @PatchMapping
    public void editNote(@RequestBody Note note) {
        service.editNote(note);
    }

    @PostMapping
    public void saveNote(@RequestBody Note note) {
        service.saveNote(note);
    }

    @DeleteMapping
    public void deleteNote(@RequestParam String id) {
        service.deleteNote(id);
    }

    @GetMapping
    public Page<Note> getNotes(@RequestParam String email,
                               @RequestParam(required = false) String search,
                               @RequestParam(required = false) Integer page,
                               @RequestParam(required = false) Integer size
                               ) {
        Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size : 6);
        return service.getNotes(search, pageable, email);
    }
}
