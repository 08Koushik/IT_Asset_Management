// src/main/java/com/koushik/IT_Asset_Management/service/AssetService.java
package com.koushik.IT_Asset_Management.service;

import com.koushik.IT_Asset_Management.model.Asset;
import com.koushik.IT_Asset_Management.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AssetService {
    @Autowired
    private AssetRepository assetRepository;

    public List<Asset> getAllAssets() { return assetRepository.findAll(); }
    public Asset saveAsset(Asset asset) { return assetRepository.save(asset); }
    public Optional<Asset> getAssetById(Long id) { return assetRepository.findById(id); }
    public void deleteAsset(Long id) { assetRepository.deleteById(id); }
}