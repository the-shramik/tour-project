package com.tours.Service;

import com.tours.Entities.*;
import com.tours.Exception.TourNotFoundException;
import com.tours.Exception.LocationNotFoundException;
import com.tours.Exception.LodgingNotFoundException;
import com.tours.Exception.TransportNotFoundException;
import com.tours.Repo.TourRepo;
import com.tours.Repo.LocationRepo;
import com.tours.Repo.LodgingRepo;
import com.tours.Repo.TransportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class TourService {

    private static final Logger logger = Logger.getLogger(TourService.class.getName());

    @Autowired
    private TourRepo tourRepo;

    @Autowired
    private LocationRepo locationRepo;

    @Autowired
    private LodgingRepo lodgingRepo;

    @Autowired
    private TransportRepo transportRepo;

    @Autowired
    private LocationService locationService;

    @Autowired
    private LodgingService lodgingService;

    @Autowired
    private TransportService transportService;

    @Autowired
    private BookingService bookingService;

    // Save a new tour
    public Tour saveTour(Tour tour, Long locationId, Long lodgingId, Long transportId) {
        logger.info("Saving a new tour with ID: " + tour.getId());

        Location location = locationRepo.findById(locationId)
                .orElseThrow(() -> new LocationNotFoundException("Location not found with id " + locationId));
        Lodging lodging = lodgingRepo.findById(lodgingId)
                .orElseThrow(() -> new LodgingNotFoundException("Lodging not found with id " + lodgingId));
        Transport transport = transportRepo.findById(transportId)
                .orElseThrow(() -> new TransportNotFoundException("Transport not found with id " + transportId));

        tour.setLocation(location);
        tour.setLodging(lodging);
        tour.setTransport(transport);

        Tour savedTour = tourRepo.save(tour);
        logger.info("Tour saved successfully with ID: " + savedTour.getId());
        return savedTour;
    }

    // Get all tours with their details
    @Transactional
    public List<Tour> getAllToursWithDetails() {
        logger.info("Fetching all tours with details.");
        List<Tour> tours = tourRepo.findAllToursWithDetails();
        return tourRepo.findAllToursWithDetails();
    }

    // Get a tour by its ID
    @Transactional
    public Optional<Tour> getTourById(Long id) {
        logger.info("Fetching tour with ID: " + id);
        Tour tour = tourRepo.findById(id)
                .orElseThrow(() -> new TourNotFoundException("Tour not found with id " + id));


        return Optional.ofNullable(tourRepo.findById(id)
                .orElseThrow(() -> new TourNotFoundException("Tour not found with id " + id)));
    }

    // Delete a tour by its ID with associated location, lodging, and transport
    @Transactional
    public void deleteTour(Long id) {
        logger.info("Deleting tour with ID: " + id);
        Tour tour = tourRepo.findById(id)
                .orElseThrow(() -> new TourNotFoundException("Tour not found with id " + id));

        // First delete all bookings associated with this tour
        bookingService.deleteBookingsByTourId(id);
        logger.info("Associated bookings deleted for Tour ID: " + id);


        // Delete associated entities if they exist
        if (tour.getLocation() != null) {
            Long locationId = tour.getLocation().getId();
            locationService.deleteLocation(locationId);
            logger.info("Associated location deleted with ID: " + locationId);
        }

        if (tour.getLodging() != null) {
            Long lodgingId = tour.getLodging().getId();
            lodgingService.deleteLodging(lodgingId);
            logger.info("Associated lodging deleted with ID: " + lodgingId);
        }

        if (tour.getTransport() != null) {
            Long transportId = tour.getTransport().getId();
            transportService.deleteTransport(transportId);
            logger.info("Associated transport deleted with ID: " + transportId);
        }

        tourRepo.delete(tour);
        logger.info("Tour deleted successfully with ID: " + id);
    }

    // Update a tour with associations
    @Transactional
    public Tour updateTourWithAssociations(Long tourId, Tour updatedTour) {
        logger.info("Updating tour with ID: " + tourId);
        Tour existingTour = tourRepo.findById(tourId)
                .orElseThrow(() -> new TourNotFoundException("Tour not found with id " + tourId));

        // Update Location if necessary
        if (updatedTour.getLocation() != null) {
            locationService.updateLocation(existingTour.getLocation().getId(), updatedTour.getLocation());
        }

        // Update Lodging if necessary
        if (updatedTour.getLodging() != null) {
            lodgingService.updateLodging(existingTour.getLodging().getId(), updatedTour.getLodging());
        }

        // Update Transport if necessary
        if (updatedTour.getTransport() != null) {
            transportService.updateTransport(existingTour.getTransport().getId(), updatedTour.getTransport());
        }

        // Update other tour details
        existingTour.setTourName(updatedTour.getTourName());
        existingTour.setTourDescription(updatedTour.getTourDescription());
        existingTour.setTourGuide(updatedTour.getTourGuide());
        existingTour.setStartDate(updatedTour.getStartDate());
        existingTour.setEndDate(updatedTour.getEndDate());
        existingTour.setMeals(updatedTour.getMeals());
        existingTour.setActivities(updatedTour.getActivities());
        existingTour.setPrice(updatedTour.getPrice());
        existingTour.setTicketsAvailable(updatedTour.getTicketsAvailable());
        existingTour.setTourImages(updatedTour.getTourImages());

        Tour savedTour = tourRepo.save(existingTour);
        logger.info("Tour updated successfully with ID: " + savedTour.getId());
        return savedTour;
    }


}
