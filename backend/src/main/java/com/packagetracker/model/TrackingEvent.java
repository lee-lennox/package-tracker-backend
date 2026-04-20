package com.packagetracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tracking_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackingEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    @JsonIgnore
    private Package packageEntity;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    private String location;

    @Column(nullable = false)
    private String status;

    private String description;
}

