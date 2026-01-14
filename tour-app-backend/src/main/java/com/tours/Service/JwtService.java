package com.tours.Service;

import com.tours.Repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Autowired
    private UserRepo userRepo;

    private static final String SECRET = "TmV3U2VjcmV0S2V5Rm9ySldUU2lnbmluZ1B1cnBvc2VzMTIzNDU2Nzg=\r\n";

    private String secretKey;

    public JwtService() {
        secretKey = generateSecretKey(); // Generate a secret key at service initialization
    }

    public String generateSecretKey() {
        try {
            logger.info("Generating a new secret key.");
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256"); // Generate key using HMAC-SHA256 algorithm
            SecretKey secretKey = keyGen.generateKey();
            logger.info("Secret key generated successfully.");
            return Base64.getEncoder().encodeToString(secretKey.getEncoded()); // Convert key to Base64 for storage
        } catch (NoSuchAlgorithmException e) {
            logger.error("Error generating secret key: {}", e.getMessage(), e);
            throw new RuntimeException("Error generating secret key", e);
        }
    }

    public String generateToken(String username) {
        logger.info("Generating token for username: {}", username);
        String role = userRepo.findRoleByUsername(username); // Fetch user's role from the repository
        logger.info("Role for user {}: {}", username, role);

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role); // Add role information as a claim in the token

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(username) // Set username as the token subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Add the issued timestamp
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // Token valid for 24 hours
                .signWith(getKey(), SignatureAlgorithm.HS256) // Sign token using the secret key
                .compact();

        logger.info("Token generated successfully for username: {}", username);
        return token;
    }

    private Key getKey() {
        logger.info("Retrieving signing key.");
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // Decode the Base64-encoded secret key
        return Keys.hmacShaKeyFor(keyBytes); // Create an HMAC-SHA256 signing key
    }

    public String extractUserName(String token) {
        logger.info("Extracting username from token.");
        return extractClaim(token, Claims::getSubject); // Retrieve the subject claim (username)
    }

    public String extractUserRole(String token) {
        logger.info("Extracting user role from token.");
        return extractClaim(token, claims -> claims.get("role", String.class)); // Retrieve the "role" claim from the token
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token); // Extract all claims
        return claimResolver.apply(claims); // Resolve specific claim
    }

    private Claims extractAllClaims(String token) {
        logger.info("Extracting all claims from token.");
        return Jwts.parser()
                .setSigningKey(getKey()) // Use signing key to parse the token
                .build()
                .parseClaimsJws(token)
                .getBody(); // Retrieve the claims
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        logger.info("Validating token for user: {}", userDetails.getUsername());
        final String userName = extractUserName(token);
        boolean isValid = userName.equals(userDetails.getUsername()) && !isTokenExpired(token); // Check username match and expiration
        if (isValid) {
            logger.info("Token is valid for user: {}", userDetails.getUsername());
        } else {
            logger.warn("Token validation failed for user: {}", userDetails.getUsername());
        }
        return isValid;
    }

    private boolean isTokenExpired(String token) {
        logger.info("Checking if token is expired.");
        return extractExpiration(token).before(new Date()); // Compare token expiration with current time
    }

    private Date extractExpiration(String token) {
        logger.info("Extracting expiration date from token.");
        return extractClaim(token, Claims::getExpiration); // Retrieve expiration date from claims
    }
}
