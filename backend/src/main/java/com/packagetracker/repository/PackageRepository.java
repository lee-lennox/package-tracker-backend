package com.packagetracker.repository;

import com.packagetracker.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {
    Optional<Package> findByTrackingId(String trackingId);
    List<Package> findBySenderId(Long senderId);
}

