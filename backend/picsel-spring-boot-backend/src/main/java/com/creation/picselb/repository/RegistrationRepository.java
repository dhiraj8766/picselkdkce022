package com.creation.picselb.repository;

import com.creation.picselb.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByEventId(Long eventId);
    boolean existsByEmailAndEventId(String email, Long eventId);
}