package com.packagetracker.repository;

import com.packagetracker.model.TrackingEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackingEventRepository extends JpaRepository<TrackingEvent, Long> {
    List<TrackingEvent> findByPackageEntityIdOrderByTimestampDesc(Long packageId);
}

