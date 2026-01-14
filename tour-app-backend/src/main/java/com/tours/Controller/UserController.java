package com.tours.Controller;

import com.tours.Entities.Users;
import com.tours.Service.JwtService;
import com.tours.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Tag(name = "User Authentication", description = "APIs for User Signup, Login, and Role-Based Dashboards")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Operation(summary = "Register a new user", description = "Allows users to sign up with their details")
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody Users user) throws Exception {
        if (!user.isEnabled()) { // Assuming `enabled` is a boolean field in the Users class
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Please agree to the terms and conditions");
        }
        userService.register(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @Operation(summary = "Login user", description = "Authenticate user and return a JWT token")
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Users loginUser) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword()));

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(loginUser.getEmail());
            return ResponseEntity.ok(token); // Return the token to the client
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed");
        }
    }

    @Operation(summary = "Admin Dashboard", description = "Accessible only to users with the ADMIN role")
    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminDashboard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = getUsername(authentication);
        return ResponseEntity.ok("Welcome to the Admin Dashboard, " + username);
    }

    @Operation(summary = "Customer Dashboard", description = "Accessible only to users with the CUSTOMER role")
    @GetMapping("/customer/dashboard")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> customerDashboard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = getUsername(authentication);
        return ResponseEntity.ok("Welcome to the Customer Dashboard, " + username);
    }

    private String getUsername(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return "Unknown User";
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return principal.toString();
    }
}
