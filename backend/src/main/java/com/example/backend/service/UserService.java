package com.example.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

@Service // Marks this class as a Spring service component
public class UserService {

    // Repository for database operations on User table
    private final UserRepository userRepository;
    // Interface to hash and verify passwords securely
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

         // BCrypt for hashing passwords
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Registers a new user in the database
    public User register(String username, String password) {

        // Hash the plain-text password using BCrypt
        String hashed = passwordEncoder.encode(password);

        // Create a new User entity, set it's username and hashed password
        User user = new User();
        user.setUsername(username);
        user.setPassword(hashed);

        // Save the user entity to DB and return it       
        return userRepository.save(user);
    }

    // Validates a user credentials
    public boolean validateUser(String username, String password) {
        // Look for a user by username in the database
        return userRepository.findByUsername(username)
                // If user exists, compare password with hashed in DB
                .map(u -> passwordEncoder.matches(password, u.getPassword()))
                // If user does not exist, return false
                .orElse(false);
    }
}