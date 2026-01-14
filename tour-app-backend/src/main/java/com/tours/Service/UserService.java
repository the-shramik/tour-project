package com.tours.Service;

import com.tours.Entities.Users;
import com.tours.Exception.UserNotFoundException;
import com.tours.Exception.InvalidCredentialsException;
import com.tours.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class UserService {

    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Registers a new user by validating email and password, then saves the user to the repository
    public void register(Users user) {
        logger.info("Attempting to register user with email: " + user.getEmail());

        // Sets a default role of "ROLE_CUSTOMER" if no role is provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_CUSTOMER");
        }

        // Checks if the email is already in use, and throws an exception if it is
        if (userRepository.existsByEmail(user.getEmail())) {
            logger.warning("Email already in use: " + user.getEmail());
            throw new RuntimeException("Email is already in use. Please use a different email.");
        }

        // Encodes the user's password before saving to ensure it's stored securely
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        logger.info("User successfully registered with email: " + user.getEmail());
    }

    // Handles user login, checking if the email exists and the password matches
    public Users login(String email, String password) throws UserNotFoundException, InvalidCredentialsException {
        logger.info("Attempting to login user with email: " + email);

        // Fetches the user by email from the database
        Users user = userRepository.getUserByEmail(email);
        if (user == null) {
            logger.warning("Email not found: " + email);
            throw new UserNotFoundException("Invalid email or password.");
        }

        // Checks if the provided password matches the encoded password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            logger.warning("Invalid password for email: " + email);
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        logger.info("User successfully logged in with email: " + email);
        return user;
    }
}
