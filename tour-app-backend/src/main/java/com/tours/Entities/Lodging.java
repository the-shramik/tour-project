package com.tours.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lodgings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lodging {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lodgingName;
    private String lodgingType;
    private String lodgingDescription;
    private String address;
    private Double rating;


    // Getters and setters

}
