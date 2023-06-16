package com.devmountain.noteApp.dtos;

import com.devmountain.noteApp.entities.Notes;
import com.devmountain.noteApp.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotesDto {

    private Long id;
    private String body;
    private User user;

    public NotesDto(Notes note){
        if (note.getId() != null) {
            this.id = note.getId();
        }if (note.getBody() != null) {
            this.body = note.getBody();
        }
    }
}
