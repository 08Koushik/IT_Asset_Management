// src/main/java/com/koushik/IT_Asset_Management/model/AssetRequest.java
package com.koushik.IT_Asset_Management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "requests")
public class AssetRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetName;
    private String requestedBy;
    private String status; // "Pending", "Approved", "Rejected"
}