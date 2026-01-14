package com.tours.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class Users implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotBlank(message ="This is required !!")
    @Size(min=2, max=20, message ="Min 2 and Max 20 charcters are allowed!!")
    private String name;

    @Email(regexp="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message="Invalid Email!!")
    @Column(unique = true)
    private String email;

    @NotBlank(message ="This is required !!")
    @Size(min=5, message ="Password must be at least 5 characters long!!")
    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = "Contact number must be a valid 10-digit number!!")
    @Column(unique = true)
    private String contactNumber;

    private String role; // ROLE_ADMIN or ROLE_CUSTOMER
    private boolean enabled;


    // Getters, setters, and other fields
}


