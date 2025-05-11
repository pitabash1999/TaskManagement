package com.task.main.exceptions;

public class UsernameAlreadyExistsException extends RuntimeException{

    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
