package com.tours.Repo;

import com.tours.Entities.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportRepo extends JpaRepository<Transport, Long> {
    Transport findTopByOrderByIdDesc();
}


