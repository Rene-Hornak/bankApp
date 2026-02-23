package com.example.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class testHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("Output: ...");
        System.out.println(encoder.encode("1234"));
    }
}