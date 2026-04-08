package com.creation.picselb.controller;

import com.creation.picselb.model.Registration;
import com.creation.picselb.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationRepository repo;

    @GetMapping
    public List<Registration> getAll() {
        return repo.findAll();
    }

    @GetMapping("/event/{eventId}")
    public List<Registration> getByEvent(@PathVariable Long eventId) {
        return repo.findByEventId(eventId);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Registration reg) {
        if (repo.existsByEmailAndEventId(reg.getEmail(), reg.getEventId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Already registered for this event");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(reg));
    }

    // ✅ DELETE registration by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Registration not found");
        }

        repo.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }
}