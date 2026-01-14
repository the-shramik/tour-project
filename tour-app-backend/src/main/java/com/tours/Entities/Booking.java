package com.tours.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "booking")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Users customer; // User who made the booking

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tour_id", referencedColumnName = "id", nullable = false)
    private Tour tour; // Selected tour

    private int numberOfTickets; // Number of tickets booked
    private Double totalPrice; // Total cost of the booking

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // Payment status (e.g., SUCCESS, FAILED)

    @Temporal(TemporalType.TIMESTAMP)
    private Date bookingDate; // Date and time of booking

    private boolean isBookingConfirmed; // Whether the booking was confirmed

    private String paymentTransactionId; // Transaction ID from payment gateway


    // Nested enum for PaymentStatus
    public enum PaymentStatus {
        SUCCESS,
        PENDING,
        FAILED
    }

    // Method to check if tickets are available
    public boolean checkAvailability() {
        return tour.getTicketsAvailable() > 0;
    }

    // Method to confirm booking after payment success
    public void confirmBooking() {
        if (paymentStatus == PaymentStatus.SUCCESS && checkAvailability()) {
            tour.setTicketsAvailable(tour.getTicketsAvailable() - numberOfTickets);
            this.isBookingConfirmed = true;
        } else {
            this.isBookingConfirmed = false;
        }
    }

    // Method to handle payment failure
    public void handlePaymentFailure(String reason) {
        this.paymentStatus = PaymentStatus.FAILED;
        this.isBookingConfirmed = false;
    }
}
