package com.tours.Service;

import com.tours.Entities.Location;
import com.tours.Exception.LocationNotFoundException;
import com.tours.Repo.LocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class LocationService {

    private static final Logger logger = Logger.getLogger(LocationService.class.getName());

    @Autowired
    private LocationRepo locationRepository;

    // Add a new location
    @CachePut(value = "locations", key = "#location.id")
    public Location addLocation(Location location) {
        logger.info("Adding a new location with details: " + location);
        Location savedLocation = locationRepository.save(location);
        logger.info("Location added successfully with ID: " + savedLocation.getId());
        return savedLocation;
    }

    // Get location by ID
    @Cacheable(value = "locations", key = "#id")
    public Optional<Location> getLocationById(Long id) {
        logger.info("Fetching location with ID: " + id);
        Optional<Location> location = Optional.ofNullable(locationRepository.findById(id)
                .orElseThrow(() -> new LocationNotFoundException("Location not found with id " + id)));
        logger.info("Location fetched successfully: " + location);
        return location;
    }

    // Get all locations
    @Cacheable(value = "LocationCache", key = "'allLocations'")
    public List<Location> getAllLocations() {
        logger.info("Fetching all locations");
        List<Location> locations = locationRepository.findAll();
        logger.info("Fetched " + locations.size() + " locations");
        return locations;
    }

    // Update location
    @Transactional
    @CachePut(value = "locations", key = "#id")
    public Location updateLocation(Long id, Location locationDetails) {
        logger.info("Updating location with ID: " + id);
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new LocationNotFoundException("Location not found with id " + id));

        // Update location details
        location.setFromLocation(locationDetails.getFromLocation());
        location.setToLocation(locationDetails.getToLocation());
        location.setCountry(locationDetails.getCountry());
        location.setDistance(locationDetails.getDistance());
        location.setLocationDescription(locationDetails.getLocationDescription());
        location.setEstimatedTravelTime(locationDetails.getEstimatedTravelTime());

        Location updatedLocation = locationRepository.save(location);
        logger.info("Location updated successfully: " + updatedLocation);
        return updatedLocation;
    }

    // Delete location
    @CacheEvict(value = "locations", key = "#id")
    public void deleteLocation(Long id) {
        logger.info("Deleting location with ID: " + id);
        locationRepository.findById(id)
                .orElseThrow(() -> new LocationNotFoundException("Location not found with id " + id));

        locationRepository.deleteById(id);
        logger.info("Location deleted successfully with ID: " + id);
    }
}
