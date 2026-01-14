package com.tours.Repo;

import com.tours.Entities.Location;
import com.tours.Entities.Lodging;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LodgingRepo extends JpaRepository<Lodging, Long> {
    Lodging findTopByOrderByIdDesc();
}
