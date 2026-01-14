package com.tours.Repo;

import com.tours.Entities.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TourRepo extends JpaRepository<Tour, Long> {


    // Custom query to fetch all tours with their related entities (location, lodging, and transport)
    @Query("SELECT t FROM Tour t " +
            "JOIN FETCH t.location " +
            "JOIN FETCH t.lodging " +
            "JOIN FETCH t.transport")
    List<Tour> findAllToursWithDetails();


    // Custom query to fetch a tour by its ID with related entities
    @Query("SELECT t FROM Tour t " +
            "JOIN FETCH t.location " +
            "JOIN FETCH t.lodging " +
            "JOIN FETCH t.transport " +
            "WHERE t.id = :tourId")
    Optional<Tour> findTourByIdWithDetails(@Param("tourId") Long tourId);
}
