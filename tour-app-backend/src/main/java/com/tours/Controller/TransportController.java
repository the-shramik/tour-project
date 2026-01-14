package com.tours.Controller;

import com.tours.Entities.Transport;
import com.tours.Service.TransportService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/transports")
@CrossOrigin(origins = "*") // Allow CORS for all origins
public class TransportController {

    @Autowired
    private TransportService transportService;

    // Add a new transport - Only accessible by ADMIN role
    @Operation(summary = "Add a new transport")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Transport> addTransport(@RequestBody Transport transport) {
        return ResponseEntity.ok(transportService.addTransport(transport));
    }

    // Get transport by ID - Only accessible by ADMIN role
    @Operation(summary = "Get transport by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Transport> getTransportById(@PathVariable Long id) {
        Optional<Transport> transport = Optional.ofNullable(transportService.getTransportById(id));
        return transport.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all transports - Only accessible by ADMIN role
    @Operation(summary = "Get all transports")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<List<Transport>> getAllTransports() {
        return ResponseEntity.ok(transportService.getAllTransports());
    }

    // Update a transport - Only accessible by ADMIN role
    @Operation(summary = "Update a transport")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Transport> updateTransport(@PathVariable Long id, @RequestBody Transport transportDetails) {
        return ResponseEntity.ok(transportService.updateTransport(id, transportDetails));
    }

    // Delete a transport - Only accessible by ADMIN role
    @Operation(summary = "Delete a transport")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Ensuring only ADMIN can access this endpoint
    public ResponseEntity<Void> deleteTransport(@PathVariable Long id) {
        transportService.deleteTransport(id);
        return ResponseEntity.noContent().build();
    }
}
