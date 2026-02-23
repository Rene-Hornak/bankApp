package com.example.backend.security;

import java.util.Date;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    private final String SECRET = "verySecretKey"; // change later
    private final long EXPIRATION = 1000 * 60 * 60; // 1 hous

    // Generate JWT token for a username
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    // Extract username from token
    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET)
                .parseClaimsJws(token).getBody().getSubject();
    }
}