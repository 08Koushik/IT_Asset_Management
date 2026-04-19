// src/main/java/com/koushik/IT_Asset_Management/controller/AssetController.java
package com.koushik.IT_Asset_Management.controller;

import com.koushik.IT_Asset_Management.model.Asset;
import com.koushik.IT_Asset_Management.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")
public class AssetController {
    @Autowired
    private AssetService assetService;

    @GetMapping
    public List<Asset> getAssets() { return assetService.getAllAssets(); }

    @PostMapping
    public Asset addAsset(@RequestBody Asset asset) { return assetService.saveAsset(asset); }

    @PutMapping("/{id}")
    public Asset updateAsset(@PathVariable Long id, @RequestBody Asset assetDetails) {
        return assetService.getAssetById(id).map(asset -> {
            if (assetDetails.getName() != null) asset.setName(assetDetails.getName());
            if (assetDetails.getStatus() != null) asset.setStatus(assetDetails.getStatus());
            if (assetDetails.getAssignedTo() != null) asset.setAssignedTo(assetDetails.getAssignedTo());
            return assetService.saveAsset(asset);
        }).orElseThrow(() -> new RuntimeException("Asset not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable Long id) { assetService.deleteAsset(id); }
}