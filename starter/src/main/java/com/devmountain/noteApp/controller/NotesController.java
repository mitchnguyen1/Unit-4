package com.devmountain.noteApp.controller;

import com.devmountain.noteApp.dtos.NotesDto;
import com.devmountain.noteApp.entities.Notes;
import com.devmountain.noteApp.services.NotesService;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.persistence.PostUpdate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/notes")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/addNote/{userId}")
    public void addNote(@RequestBody NotesDto notesDto, @PathVariable Long userId){
        notesService.addNote(notesDto,userId);
    };

    @DeleteMapping("/deleteNote/{id}")
    public void deleteNote(@PathVariable Long id){
        notesService.deleteNote(id);
    };


    @PutMapping("/updateNote")
    public void updateNote(@RequestBody NotesDto notesDto){
        notesService.updateNote(notesDto);
    };

    @GetMapping("/notesByUser/{id}")
    public List<NotesDto> findAllNotesByUser(@PathVariable Long id, Model theModel){
        return notesService.findAllNotesByUser(id);
    };

    @GetMapping("/noteById/{id}")
    public Optional<NotesDto> getNoteByID(@PathVariable Long id){
        return notesService.getNoteByID(id);
    };
}
