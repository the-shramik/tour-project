package com.tours.Exception;

public class InvalidTourDataException extends RuntimeException {
    public InvalidTourDataException(String message) {
        super(message);
    }
}
