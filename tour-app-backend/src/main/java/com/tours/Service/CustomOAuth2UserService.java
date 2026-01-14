package com.tours.Service;

import com.tours.Entities.Users;
import com.tours.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger logger = Logger.getLogger(CustomOAuth2UserService.class.getName());

    @Autowired
    private UserRepo userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        logger.info("Starting OAuth2 user loading process.");

        OAuth2User oauth2User = super.loadUser(userRequest);

        // Extract user details from OAuth2 provider
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");
        String contactNumber = oauth2User.getAttribute("contactNumber");

        logger.info("User details retrieved from OAuth2 provider: Email=" + email + ", Name=" + name);

        try {
            // Check if user exists, if not create a new user
            Optional<Users> existingUser = userRepository.findByEmail(email);

            if (existingUser.isEmpty()) {
                logger.info("No existing user found with email: " + email + ". Creating a new user.");

                Users newUser = new Users();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setContactNumber(contactNumber);
                newUser.setRole("ROLE_CUSTOMER"); // Default role
                newUser.setEnabled(true);

                userRepository.save(newUser);

                logger.info("New user created and saved successfully: " + email);
            } else {
                logger.info("Existing user found: " + email);
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error during user processing: " + e.getMessage(), e);
            throw new OAuth2AuthenticationException("Failed to process user details.");
        }

        logger.info("OAuth2 user loading process completed successfully.");
        return oauth2User;
    }
}
