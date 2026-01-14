package com.tours;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class TeluskoToursProjectApplication {

	public static void main(String[] args) {
		clearLogFile("src/main/java/com/tours/Logging/app.log");
		SpringApplication.run(TeluskoToursProjectApplication.class, args);
		System.out.println("Hello....git ..");
	}

	private static void clearLogFile(String logFilePath) {
		try {
			// Convert relative path to absolute path
			Path absolutePath = Paths.get(logFilePath).toAbsolutePath();
			try (FileWriter fileWriter = new FileWriter(absolutePath.toString(), false)) {
				fileWriter.write("");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}