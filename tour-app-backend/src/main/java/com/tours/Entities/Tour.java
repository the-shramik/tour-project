package com.tours.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "tour")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tourName;
    private String tourDescription;
    private String tourGuide;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    @ElementCollection
    @CollectionTable(name = "tour_meals", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "meal")
    private List<String> meals = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "tour_activities", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "activity")
    private List<String> activities = new ArrayList<>();

    private Double price;
    private Integer ticketsAvailable;

    @ElementCollection
    @CollectionTable(name = "tour_images", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "image")
    private List<String> tourImages = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToOne
    @JoinColumn(name = "lodging_id", referencedColumnName = "id")
    private Lodging lodging;

    @OneToOne
    @JoinColumn(name = "transport_id", referencedColumnName = "id")
    private Transport transport;
}