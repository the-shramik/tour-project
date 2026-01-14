package com.tours.Service;

import com.tours.Entities.Transport;
import com.tours.Exception.TransportNotFoundException;
import com.tours.Repo.TransportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class TransportService {

    private static final Logger logger = Logger.getLogger(TransportService.class.getName());

    @Autowired
    private TransportRepo transportRepository;

    // Add a new transport
    @CachePut(value = "transports", key = "#transport.id")
    public Transport addTransport(Transport transport) {
        logger.info("Adding a new transport with details: " + transport);
        Transport savedTransport = transportRepository.save(transport);
        logger.info("Transport added successfully with ID: " + savedTransport.getId());
        return savedTransport;
    }

    // Get transport by ID
    @Cacheable(value = "transports", key = "#id")
    public Transport getTransportById(Long id) {
        logger.info("Fetching transport with ID: " + id);
        Transport transport = transportRepository.findById(id)
                .orElseThrow(() -> new TransportNotFoundException("Transport not found with id " + id));
        logger.info("Transport fetched successfully: " + transport);
        return transport;
    }

    // Get all transports
    @Cacheable(value = "TransportCache", key = "'allTransports'")
    public List<Transport> getAllTransports() {
        logger.info("Fetching all transports");
        List<Transport> transports = transportRepository.findAll();
        logger.info("Fetched " + transports.size() + " transports");
        return transports;
    }

    // Update transport
    @CachePut(value = "transports", key = "#id")
    public Transport updateTransport(Long id, Transport transportDetails) {
        logger.info("Updating transport with ID: " + id);
        Transport transport = transportRepository.findById(id)
                .orElseThrow(() -> new TransportNotFoundException("Transport not found with id " + id));

        // Update transport details
        transport.setTransportName(transportDetails.getTransportName());
        transport.setTransportType(transportDetails.getTransportType());
        transport.setTransportDescription(transportDetails.getTransportDescription());
        transport.setEstimatedTravelTime(transportDetails.getEstimatedTravelTime());

        Transport updatedTransport = transportRepository.save(transport);
        logger.info("Transport updated successfully: " + updatedTransport);
        return updatedTransport;
    }

    // Delete transport
    @CacheEvict(value = "transports", key = "#id")
    public void deleteTransport(Long id) {
        logger.info("Deleting transport with ID: " + id);
        transportRepository.findById(id)
                .orElseThrow(() -> new TransportNotFoundException("Transport not found with id " + id));

        transportRepository.deleteById(id);
        logger.info("Transport deleted successfully with ID: " + id);
    }
}
