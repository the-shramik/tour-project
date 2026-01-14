package com.tours.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

@Service
public class ImageService {

    private static final Logger logger = Logger.getLogger(ImageService.class.getName());
    private static final String UPLOAD_DIR = "src/main/resources/static/upload_images";

    // Uploads an image to the specified directory and assigns it a unique name
    public String uploadImage(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
            }

            // Check if the upload directory exists, create it if necessary
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                boolean dirCreated = directory.mkdirs(); // Creates directories recursively
                if (!dirCreated) {
                    throw new IOException("Failed to create directories");
                }
            }

            // Generate a unique filename using the current timestamp
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, filename);

            // Write the file to the specified directory
            Files.write(filePath, file.getBytes());

            logger.info("File uploaded successfully: " + filename);
            return filename; // Returning the unique filename for reference
        } catch (IOException e) {
            logger.severe("Failed to upload image: " + e.getMessage());
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            // Handle case where file is empty
            logger.warning(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    // Updates an existing image by replacing it with a new one
    public String updateImage(String oldFilename, MultipartFile newFile) {
        try {
            if (newFile == null || newFile.isEmpty()) {
                throw new IllegalArgumentException("New file is empty or null");
            }

            // Attempt to delete the old file if it exists
            if (oldFilename != null && !oldFilename.trim().isEmpty()) {
                Path oldFilePath = Paths.get(UPLOAD_DIR, oldFilename);
                File oldFile = oldFilePath.toFile();

                if (oldFile.exists()) {
                    if (!oldFile.delete()) {
                        logger.warning("Could not delete old file: " + oldFilename);
                    } else {
                        logger.info("Successfully deleted old file: " + oldFilename);
                    }
                }
            }

            // Upload the new file and return its filename
            String newFilename = uploadImage(newFile);
            logger.info("Successfully updated image. New filename: " + newFilename);
            return newFilename;

        } catch (RuntimeException e) {
            logger.severe("Failed to update image: " + e.getMessage());
            throw new RuntimeException("Failed to update image: " + e.getMessage());
        }
    }

    // Deletes an image from the specified directory
    public void deleteImage(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            logger.warning("Attempted to delete null or empty filename");
            return;
        }

        try {
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            File file = filePath.toFile();

            // Log if the file does not exist before attempting deletion
            if (!file.exists()) {
                logger.warning("File does not exist: " + filename);
                return;
            }

            // Attempt to delete the file
            if (!file.delete()) {
                throw new IOException("Failed to delete file: " + filename);
            }

            logger.info("File deleted successfully: " + filename);

        } catch (IOException e) {
            logger.severe("Failed to delete image: " + e.getMessage());
            throw new RuntimeException("Failed to delete image: " + e.getMessage());
        }
    }
}
