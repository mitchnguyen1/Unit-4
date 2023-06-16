package com.devmountain.noteApp.services;

import com.devmountain.noteApp.dtos.NotesDto;
import com.devmountain.noteApp.entities.Notes;
import com.devmountain.noteApp.entities.User;
import com.devmountain.noteApp.repositories.NotesRepository;
import com.devmountain.noteApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotesServiceImpl implements NotesService {

    //find all notes by user
    //add a note
    //delete a note
    //update a note
    //find note by id

    @Autowired
    private NotesRepository notesRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void addNote(NotesDto notesDto,Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        Notes note = new Notes(notesDto);
        if(userOptional.isPresent()){
            note.setUser(userOptional.get());
            notesRepository.saveAndFlush(note);
        }

    }

    @Override
    public void deleteNote(Long id){
        Optional<Notes> optionalNotes = notesRepository.findById(id);
        if(optionalNotes.isPresent()){
            notesRepository.deleteById(id);
        }
    }

    @Override
    public void updateNote(NotesDto notesDto){
        Optional<Notes> notesOptional = notesRepository.findById(notesDto.getId());
        notesOptional.ifPresent(notes -> {
            notes.setBody(notesDto.getBody());
            notesRepository.saveAndFlush(notes);
        });
    }

    @Override
    public List<NotesDto> findAllNotesByUser(Long id){
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isPresent()){
            List<Notes> notesList = notesRepository.findAllByUserEquals(userOptional);
            return notesList.stream().map(note -> new NotesDto(note)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public Optional<NotesDto> getNoteByID(Long id){
        Optional<Notes> notesOptional = notesRepository.findById(id);
        if(notesOptional.isPresent()){
            return Optional.of(new NotesDto(notesOptional.get()));
        }
        return Optional.empty();
    }


}
