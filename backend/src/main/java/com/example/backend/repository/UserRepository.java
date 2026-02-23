package com.example.backend.repository;

import java.util.Optional; // Container for possibly empty values

import org.springframework.data.jpa.repository.JpaRepository; // Spring Data JPA base repository

import com.example.backend.entity.User; // User entity

/**
 * UserRepository is a Spring Data JPA repository for the User entity.
 * 
 * By extending JpaRepository, it automatically provides:
 * - CRUD operations (save, findById, findAll, delete, etc.)
 * - Pagination and sorting support
 * 
 * You can also define custom query methods following Spring Data conventions.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Custom query method to find a user by username.
     * Spring Data automatically implements this method based on the method name:
     * "findBy" + "Username" → generates a query like:
     * SELECT u FROM User u WHERE u.username = ?1
     *
     * @param username the username to search for
     * @return an Optional containing the User if found, or empty if not
     */
    Optional<User> findByUsername(String username);
}