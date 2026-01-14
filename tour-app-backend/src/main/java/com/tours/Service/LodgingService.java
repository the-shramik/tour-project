package com.tours.Service;

import com.tours.Entities.Lodging;
import com.tours.Exception.LodgingNotFoundException;
import com.tours.Repo.LodgingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class LodgingService {

    private static final Logger logger = Logger.getLogger(LodgingService.class.getName());

    @Autowired
    private LodgingRepo lodgingRepository;

    // Add a new Lodging
    @CachePut(value = "lodgings", key = "#lodging.id")
    public Lodging addLodging(Lodging lodging) {
        logger.info("Adding a new lodging with details: " + lodging);
        Lodging savedLodging = lodgingRepository.save(lodging);
        logger.info("Lodging added successfully with ID: " + savedLodging.getId());
        return savedLodging;
    }

    // Get Lodging by ID
    @Cacheable(value = "lodgings", key = "#id")
    public Lodging getLodgingById(Long id) {
        logger.info("Fetching lodging with ID: " + id);
        Lodging lodging = lodgingRepository.findById(id)
                .orElseThrow(() -> new LodgingNotFoundException("Lodging not found with id " + id));
        logger.info("Lodging fetched successfully: " + lodging);
        return lodging;
    }

    // Get all Lodgings
    @Cacheable(value = "LodgingCache", key = "'allLodgings'")
    public List<Lodging> getAllLodgings() {
        logger.info("Fetching all lodgings");
        List<Lodging> lodgings = lodgingRepository.findAll();
        logger.info("Fetched " + lodgings.size() + " lodgings");
        return lodgings;
    }

    // Update Lodging by ID
    @CachePut(value = "lodgings", key = "#id")
    public Lodging updateLodging(Long id, Lodging lodgingDetails) {
        logger.info("Updating lodging with ID: " + id);
        Lodging lodging = lodgingRepository.findById(id)
                .orElseThrow(() -> new LodgingNotFoundException("Lodging not found with id " + id));

        // Update Lodging details
        lodging.setLodgingName(lodgingDetails.getLodgingName());
        lodging.setLodgingType(lodgingDetails.getLodgingType());
        lodging.setLodgingDescription(lodgingDetails.getLodgingDescription());
        lodging.setAddress(lodgingDetails.getAddress());
        lodging.setRating(lodgingDetails.getRating());

        Lodging updatedLodging = lodgingRepository.save(lodging);
        logger.info("Lodging updated successfully: " + updatedLodging);
        return updatedLodging;
    }

    // Delete Lodging by ID
    @CacheEvict(value = "lodgings", key = "#id")
    public void deleteLodging(Long id) {
        logger.info("Deleting lodging with ID: " + id);
        lodgingRepository.findById(id)
                .orElseThrow(() -> new LodgingNotFoundException("Lodging not found with id " + id));

        lodgingRepository.deleteById(id);
        logger.info("Lodging deleted successfully with ID: " + id);
    }
}
