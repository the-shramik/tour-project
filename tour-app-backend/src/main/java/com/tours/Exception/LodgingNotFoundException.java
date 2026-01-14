package com.tours.Exception;

public class LodgingNotFoundException extends RuntimeException {
    public LodgingNotFoundException(String message) {
        super(message);
    }
}