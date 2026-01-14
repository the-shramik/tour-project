package com.tours.Exception;

public class TourNotFoundException extends RuntimeException {
    public TourNotFoundException(String message) {
        super(message);
    }
}
