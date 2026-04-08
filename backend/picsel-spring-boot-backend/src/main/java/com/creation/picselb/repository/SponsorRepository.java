package com.creation.picselb.repository;

import com.creation.picselb.model.Sponsor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SponsorRepository extends JpaRepository<Sponsor, Long> {

}