// src/main/java/com/koushik/IT_Asset_Management/model/User.java
package com.koushik.IT_Asset_Management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // Standard format: ROLE_ADMIN or ROLE_USER
}