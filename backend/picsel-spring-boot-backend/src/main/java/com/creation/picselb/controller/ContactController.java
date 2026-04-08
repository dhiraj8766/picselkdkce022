package com.creation.picselb.controller;

import com.creation.picselb.model.Contact;
import com.creation.picselb.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/contacts") @RequiredArgsConstructor
public class ContactController {
    private final ContactRepository repo;

    @GetMapping
    public List<Contact> getAll() { return repo.findAll(); }

    @PostMapping
    public ResponseEntity<Contact> create(@RequestBody Contact contact) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(contact));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { repo.deleteById(id); return ResponseEntity.noContent().build(); }
}