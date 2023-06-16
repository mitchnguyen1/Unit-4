package com.devmountain.noteApp.services;

import com.devmountain.noteApp.dtos.NotesDto;

import java.util.List;
import java.util.Optional;

public interface NotesService {
    void addNote(NotesDto notesDto, Long userId);

    void deleteNote(Long id);

    void updateNote(NotesDto notesDto);

    List<NotesDto> findAllNotesByUser(Long id);

    Optional<NotesDto> getNoteByID(Long id);
}
