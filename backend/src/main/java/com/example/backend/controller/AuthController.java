package com.example.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.User;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.UserService;

@RestController
@RequestMapping("/api/auth") // path for controller: /api/auth
public class AuthController {

    // UserService to handle registration and login logic
    private final UserService userService;

    // utility class for creating JWT tokens
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    
    // POST /api/auth/register - registers a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String,String> body) {
        // Call service to create a new user with hashed password
        User user = userService.register(body.get("username"), body.get("password"));

        // Return basic info of the new user (id + username)
        return ResponseEntity.ok(Map.of("id", user.getId(), "username", user.getUsername()));
    }

    // POST /api/auth/login - login user and return JWT token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        // Validate the username/password against the database
        boolean valid = userService.validateUser(
            body.get("username"), 
            body.get("password")
        );

        if (valid) {
            // Generate JWT token for the user
            String token = jwtUtil.generateToken(body.get("username"));

            // Return token as JSON
            return ResponseEntity.ok(Map.of("token", token));
        }

        // If invalid credentials, return 401 Unauthorized
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid credentials"));
    }
}