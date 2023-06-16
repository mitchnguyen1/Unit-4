package com.devmountain.noteApp.repositories;

import com.devmountain.noteApp.entities.Notes;
import com.devmountain.noteApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotesRepository extends JpaRepository<Notes,Long> {
    List<Notes> findAllByUserEquals(Optional<User> userOptional);
}
