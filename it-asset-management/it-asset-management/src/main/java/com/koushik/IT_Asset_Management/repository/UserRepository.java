// src/main/java/com/koushik/IT_Asset_Management/repository/UserRepository.java
package com.koushik.IT_Asset_Management.repository;

import com.koushik.IT_Asset_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}