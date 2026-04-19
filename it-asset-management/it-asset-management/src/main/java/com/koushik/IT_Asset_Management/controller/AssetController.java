package com.koushik.IT_Asset_Management.controller;

import com.koushik.IT_Asset_Management.model.Asset;
import com.koushik.IT_Asset_Management.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*") // Allows your HTML files to talk to the backend
public class AssetController {
    @Autowired
    private AssetService assetService;

    @GetMapping
    public List<Asset> getAssets() { return assetService.getAllAssets(); }

    @PostMapping
    public Asset addAsset(@RequestBody Asset asset) { return assetService.saveAsset(asset); }
}