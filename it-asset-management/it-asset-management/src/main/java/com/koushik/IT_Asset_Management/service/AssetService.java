package com.koushik.IT_Asset_Management.service;

import com.koushik.IT_Asset_Management.model.Asset;
import com.koushik.IT_Asset_Management.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssetService {
    @Autowired
    private AssetRepository assetRepository;

    public List<Asset> getAllAssets() { return assetRepository.findAll(); }
    public Asset saveAsset(Asset asset) { return assetRepository.save(asset); }
    public void deleteAsset(Long id) { assetRepository.deleteById(id); }
}