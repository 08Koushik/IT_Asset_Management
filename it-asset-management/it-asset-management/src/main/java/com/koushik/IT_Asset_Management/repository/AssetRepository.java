package com.koushik.IT_Asset_Management.repository;

import com.koushik.IT_Asset_Management.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
}