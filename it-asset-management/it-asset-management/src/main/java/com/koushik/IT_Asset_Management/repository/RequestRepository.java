// src/main/java/com/koushik/IT_Asset_Management/repository/RequestRepository.java
package com.koushik.IT_Asset_Management.repository;

import com.koushik.IT_Asset_Management.model.AssetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RequestRepository extends JpaRepository<AssetRequest, Long> {
    List<AssetRequest> findByStatus(String status);
}