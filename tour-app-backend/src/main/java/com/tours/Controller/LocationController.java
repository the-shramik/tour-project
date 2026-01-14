package com.tours.Controller;

import com.tours.Entities.Location;
import com.tours.Service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/locations")
@CrossOrigin(origins = "*") // Allow CORS for all origins
public class LocationController {

    @Autowired
    private LocationService locationService;

    // Add a new location - Only accessible by ADMIN role
    @Operation(summary = "Add a new location")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Location> addLocation(@RequestBody Location location) {
        return ResponseEntity.ok(locationService.addLocation(location));
    }

    // Get a location by ID - Only accessible by ADMIN role
    @Operation(summary = "Get a location by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        Optional<Location> location = locationService.getLocationById(id);
        return location.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all locations - Only accessible by ADMIN role
    @Operation(summary = "Get all locations")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<List<Location>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAllLocations());
    }

    // Update a location - Only accessible by ADMIN role
    @Operation(summary = "Update a location")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location locationDetails) {
        return ResponseEntity.ok(locationService.updateLocation(id, locationDetails));
    }

    // Delete a location - Only accessible by ADMIN role
    @Operation(summary = "Delete a location")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}
