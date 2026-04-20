package com.packagetracker.controller;

import com.packagetracker.dto.MessageResponse;
import com.packagetracker.model.Package;
import com.packagetracker.model.User;
import com.packagetracker.repository.PackageRepository;
import com.packagetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
public class PackageController {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Package>> getAllPackages() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        List<Package> packages;
        if (user.getRole().getName().equals("CUSTOMER")) {
            packages = packageRepository.findBySenderId(user.getId());
        } else {
            packages = packageRepository.findAll();
        }

        return ResponseEntity.ok(packages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPackageById(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        // Check if customer is the owner
        if (user.getRole().getName().equals("CUSTOMER") && 
            (pkg.getSender() == null || !pkg.getSender().getId().equals(user.getId()))) {
            return ResponseEntity.status(403).body(new MessageResponse("Access denied"));
        }

        return ResponseEntity.ok(pkg);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT')")
    public ResponseEntity<Package> createPackage(@RequestBody Package packageRequest) {
        Package pkg = new Package();
        pkg.setTrackingId(packageRequest.getTrackingId());
        pkg.setStatus(packageRequest.getStatus() != null ? packageRequest.getStatus() : "Pending");
        pkg.setDescription(packageRequest.getDescription());
        pkg.setReceiverAddress(packageRequest.getReceiverAddress());
        pkg.setExpectedDeliveryDate(packageRequest.getExpectedDeliveryDate());

        if (packageRequest.getSender() != null && packageRequest.getSender().getId() != null) {
            User sender = userRepository.findById(packageRequest.getSender().getId()).orElse(null);
            pkg.setSender(sender);
        }

        Package savedPackage = packageRepository.save(pkg);
        return ResponseEntity.ok(savedPackage);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT')")
    public ResponseEntity<Package> updatePackage(@PathVariable Long id, @RequestBody Package packageRequest) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        if (packageRequest.getStatus() != null) {
            pkg.setStatus(packageRequest.getStatus());
        }
        if (packageRequest.getDescription() != null) {
            pkg.setDescription(packageRequest.getDescription());
        }
        if (packageRequest.getReceiverAddress() != null) {
            pkg.setReceiverAddress(packageRequest.getReceiverAddress());
        }
        if (packageRequest.getExpectedDeliveryDate() != null) {
            pkg.setExpectedDeliveryDate(packageRequest.getExpectedDeliveryDate());
        }

        Package updatedPackage = packageRepository.save(pkg);
        return ResponseEntity.ok(updatedPackage);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deletePackage(@PathVariable Long id) {
        packageRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Package deleted successfully"));
    }
}

