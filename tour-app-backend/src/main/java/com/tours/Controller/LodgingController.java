package com.tours.Controller;

import com.tours.Entities.Lodging;
import com.tours.Service.LodgingService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/lodgings")
@CrossOrigin(origins = "*") // Allow CORS for all origins
public class LodgingController {

    @Autowired
    private LodgingService lodgingService;

    // Add a new lodging - Only accessible by ADMIN role
    @Operation(summary = "Add a new lodging")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Lodging> addLodging(@RequestBody Lodging lodging) {
        return ResponseEntity.ok(lodgingService.addLodging(lodging));
    }

    // Get lodging by ID - Only accessible by ADMIN role
    @Operation(summary = "Get lodging by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Lodging> getLodgingById(@PathVariable Long id) {
        Optional<Lodging> lodging = Optional.ofNullable(lodgingService.getLodgingById(id));
        return lodging.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all lodgings - Only accessible by ADMIN role
    @Operation(summary = "Get all lodgings")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<List<Lodging>> getAllLodgings() {
        return ResponseEntity.ok(lodgingService.getAllLodgings());
    }

    // Update a lodging - Only accessible by ADMIN role
    @Operation(summary = "Update a lodging")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Lodging> updateLodging(@PathVariable Long id, @RequestBody Lodging lodgingDetails) {
        return ResponseEntity.ok(lodgingService.updateLodging(id, lodgingDetails));
    }

    // Delete a lodging - Only accessible by ADMIN role
    @Operation(summary = "Delete a lodging")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Void> deleteLodging(@PathVariable Long id) {
        lodgingService.deleteLodging(id);
        return ResponseEntity.noContent().build();
    }
}
