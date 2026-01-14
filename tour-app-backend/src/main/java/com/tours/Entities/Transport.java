package com.tours.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "transports")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transport {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transportName;
    private String transportType;
    private String estimatedTravelTime;
    private String transportDescription;

    //Getters and Setters
}
