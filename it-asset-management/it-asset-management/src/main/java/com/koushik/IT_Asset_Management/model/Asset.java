// src/main/java/com/koushik/IT_Asset_Management/model/Asset.java
package com.koushik.IT_Asset_Management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String purchaseDate;
    private String status; // e.g., "Available", "Assigned", "Damaged"
    private String assignedTo; // Stores the username of the assigned employee
}