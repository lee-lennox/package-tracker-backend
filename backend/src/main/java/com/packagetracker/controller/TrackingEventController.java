package com.packagetracker.controller;

import com.packagetracker.model.Package;
import com.packagetracker.model.TrackingEvent;
import com.packagetracker.repository.PackageRepository;
import com.packagetracker.repository.TrackingEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/packages/{packageId}/events")
@CrossOrigin(origins = "*")
public class TrackingEventController {

    @Autowired
    private TrackingEventRepository trackingEventRepository;

    @Autowired
    private PackageRepository packageRepository;

    @GetMapping
    public ResponseEntity<List<TrackingEvent>> getTrackingEvents(@PathVariable Long packageId) {
        List<TrackingEvent> events = trackingEventRepository.findByPackageEntityIdOrderByTimestampDesc(packageId);
        return ResponseEntity.ok(events);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'AGENT')")
    public ResponseEntity<TrackingEvent> createTrackingEvent(
            @PathVariable Long packageId,
            @RequestBody TrackingEvent eventRequest) {

        Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        TrackingEvent event = new TrackingEvent();
        event.setPackageEntity(pkg);
        event.setTimestamp(LocalDateTime.now());
        event.setStatus(eventRequest.getStatus());
        event.setLocation(eventRequest.getLocation());
        event.setDescription(eventRequest.getDescription());

        // Update package status
        pkg.setStatus(eventRequest.getStatus());
        packageRepository.save(pkg);

        TrackingEvent savedEvent = trackingEventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }
}

