package com.tours.Exception;

public class TransportNotFoundException extends RuntimeException {
    public TransportNotFoundException(String message) {
        super(message);
    }
}