package com.tours.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class CloudinaryImageService {

    private static final Logger logger = Logger.getLogger(CloudinaryImageService.class.getName());

    private final Cloudinary cloudinary;

    // Constructor initializes Cloudinary with credentials from application.properties
    public CloudinaryImageService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret
    ) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
        logger.info("Cloudinary initialized with provided credentials.");
    }

    // Upload an image to Cloudinary and return its URL
    public String uploadImage(MultipartFile file) {
        logger.info("Starting image upload process.");
        try {
            if (file.isEmpty()) {
                logger.warning("Upload failed: File is empty.");
                throw new IllegalArgumentException("File is empty");
            }

            // Upload file to Cloudinary
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = (String) uploadResult.get("secure_url");
            logger.info("Image uploaded successfully to Cloudinary. URL: " + imageUrl);
            return imageUrl;

        } catch (IOException e) {
            logger.log(Level.SEVERE, "IOException during image upload: " + e.getMessage(), e);
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    // Update an existing image in Cloudinary
    public String updateImage(String oldImageUrl, MultipartFile newFile) {
        logger.info("Starting image update process.");
        try {
            if (newFile == null || newFile.isEmpty()) {
                logger.warning("Update failed: New file is empty or null.");
                throw new IllegalArgumentException("New file is empty or null");
            }

            // Delete old image if a URL is provided
            if (oldImageUrl != null && !oldImageUrl.trim().isEmpty()) {
                logger.info("Deleting old image: " + oldImageUrl);
                try {
                    String publicId = extractPublicIdFromUrl(oldImageUrl);
                    if (publicId != null) {
                        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                        logger.info("Old image deleted successfully.");
                    }
                } catch (Exception e) {
                    logger.log(Level.WARNING, "Could not delete old image: " + e.getMessage(), e);
                }
            }

            // Upload new image and return its URL
            return uploadImage(newFile);

        } catch (RuntimeException e) {
            logger.log(Level.SEVERE, "Failed to update image: " + e.getMessage(), e);
            throw new RuntimeException("Failed to update image: " + e.getMessage());
        }
    }

    // Delete an image from Cloudinary using its URL
    public void deleteImage(String imageUrl) {
        logger.info("Starting image deletion process.");
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            logger.warning("Deletion failed: Image URL is null or empty.");
            return;
        }

        try {
            // Extract the public ID from the provided URL and delete the image
            String publicId = extractPublicIdFromUrl(imageUrl);
            if (publicId != null) {
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                logger.info("Image deleted successfully.");
            }
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Failed to delete image: " + e.getMessage(), e);
            throw new RuntimeException("Failed to delete image: " + e.getMessage());
        }
    }

    // Extract the public ID from the Cloudinary URL to perform operations like deletion
    private String extractPublicIdFromUrl(String url) {
        logger.info("Extracting public ID from URL: " + url);
        if (url == null) return null;

        String[] urlParts = url.split("/");
        for (int i = 0; i < urlParts.length; i++) {
            if (urlParts[i].equals("upload") && i + 2 < urlParts.length) {
                String publicId = urlParts[i + 2];
                int dotIndex = publicId.lastIndexOf('.');
                publicId = dotIndex > 0 ? publicId.substring(0, dotIndex) : publicId;
                logger.info("Public ID extracted: " + publicId);
                return publicId;
            }
        }
        logger.warning("Public ID could not be extracted from URL: " + url);
        return null;
    }
}
