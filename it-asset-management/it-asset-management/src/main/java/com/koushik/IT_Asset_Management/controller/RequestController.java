package com.koushik.IT_Asset_Management.controller;

import com.koushik.IT_Asset_Management.model.*;
import com.koushik.IT_Asset_Management.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired private RequestRepository requestRepository;
    @Autowired private AssetRepository assetRepository;

    @PostMapping
    public AssetRequest submitRequest(@RequestBody AssetRequest req) {
        req.setStatus("Pending");
        return requestRepository.save(req);
    }

    @GetMapping("/pending")
    public List<AssetRequest> getPending() {
        return requestRepository.findByStatus("Pending");
    }

    @PutMapping("/approve/{id}")
    public void approveRequest(@PathVariable Long id) {
        AssetRequest req = requestRepository.findById(id).orElseThrow();

        // Find the asset by name that is currently Available
        List<Asset> assets = assetRepository.findAll();
        Asset targetAsset = assets.stream()
                .filter(a -> a.getName().equalsIgnoreCase(req.getAssetName()) && "Available".equalsIgnoreCase(a.getStatus()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No available asset found with that name"));

        req.setStatus("Approved");
        requestRepository.save(req);

        targetAsset.setStatus("Assigned");
        targetAsset.setAssignedTo(req.getRequestedBy());
        assetRepository.save(targetAsset);
    }
}