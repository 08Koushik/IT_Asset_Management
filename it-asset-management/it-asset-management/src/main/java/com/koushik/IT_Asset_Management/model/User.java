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

    // Always store as "ROLE_ADMIN" or "ROLE_USER" — never plain "ADMIN"/"USER"
    @Column(nullable = false)
    private String role;

    // Safety setter: auto-prefix if someone saves "ADMIN" or "USER" accidentally
    public void setRole(String role) {
        if (role != null && !role.startsWith("ROLE_")) {
            this.role = "ROLE_" + role.toUpperCase();
        } else {
            this.role = role;
        }
    }
}