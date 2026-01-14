package com.tours.Controller;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.tours.Entities.Booking;
import com.tours.Entities.Tour;
import com.tours.Entities.Users;
import com.tours.Repo.TourRepo;
import com.tours.Repo.UserRepo;
import com.tours.Service.BookingService;
import com.tours.Service.TourService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@Tag(name = "Booking Controller", description = "Manage bookings, payments, and tours for customers and admins.")
public class BookingController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Autowired
    private TourService tourService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TourRepo tourRepository;

    @Autowired
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    private Users getLoggedInUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDetails == null) {
            return null;
        }
        return userRepo.getUserByEmail(userDetails.getUsername());
    }

    @Operation(summary = "Get all available tours", description = "Fetches all tours available for booking.")
    @GetMapping("customer/tours")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getAllTours() {
        Users loggedInUser = getLoggedInUser();
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in.");
        }

        List<Tour> tours = tourService.getAllToursWithDetails();
        return ResponseEntity.ok(Map.of(
                "message", "User: " + loggedInUser.getEmail() + " is viewing the tours.",
                "availableTours", tours
        ));
    }

    @Operation(summary = "Get tour by ID", description = "Fetches details of a specific tour by its ID.")
    @GetMapping("customer/tours/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getTourById(@PathVariable Long id) {
        Users loggedInUser = getLoggedInUser();
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "User is not logged in."));
        }

        return tourService.getTourById(id)
                .map(tour -> ResponseEntity.ok(Map.of(
                        "message", "User: " + loggedInUser.getEmail() + " is viewing the tour.",
                        "tourDetails", tour
                )))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Tour not found with ID: " + id)));
    }

    @Operation(summary = "Create payment intent", description = "Generates a payment intent for booking a tour.")
    @PostMapping("customer/create-payment-intent/{tourId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> createPaymentIntent(
            @PathVariable Long tourId,
            @RequestParam int numberOfTickets) {
        Users loggedInUser = getLoggedInUser();
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User is not logged in.");
        }

        try {
            // Create a preliminary booking with required tour and ticket details
            Booking preliminaryBooking = bookingService.createBooking(loggedInUser, tourId, numberOfTickets);

            // Build Stripe Payment Intent parameters
            PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                    .setCurrency("usd")
                    .setAmount(preliminaryBooking.getTotalPrice().longValue() * 100) // Amount in cents
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(createParams); // Create the PaymentIntent in Stripe

            // Build Stripe Checkout Session parameters
            SessionCreateParams checkoutParams = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/success?paymentIntentId=" + paymentIntent.getId() + "&bookingId=" + preliminaryBooking.getBookingId())
                    .setCancelUrl("http://localhost:5173/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity((long) numberOfTickets)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount((long) (preliminaryBooking.getTour().getPrice() * 100)) // Unit price in cents
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Tour Booking") // Product name
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            // Create a Checkout Session in Stripe
            Session checkoutSession = Session.create(checkoutParams);

            return ResponseEntity.ok(Map.of(
                    "paymentIntentId", paymentIntent.getId(),
                    "checkoutSessionId", checkoutSession.getId(),
                    "bookingId", preliminaryBooking.getBookingId(),
                    "totalAmount", preliminaryBooking.getTotalPrice(),
                    "checkoutUrl", checkoutSession.getUrl() // URL for completing payment
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }


    @Operation(summary = "Confirm booking", description = "Confirms a booking after successful payment.")
    @PostMapping("customer/confirm-payment/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> confirmPayment(
            @PathVariable Long bookingId,
            @RequestParam String paymentIntentId) {
        Users loggedInUser = getLoggedInUser();
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User is not logged in.");
        }

        try {
            Booking confirmedBooking = bookingService.confirmBooking(bookingId, paymentIntentId);

            return ResponseEntity.ok(Map.of(
                    "message", "Booking confirmed successfully",
                    "booking", confirmedBooking
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(summary = "Filter tours", description = "Filters tours based on specified criteria.")
    @GetMapping("customer/filterTours")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> filterTours(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String lodgingType,
            @RequestParam(required = false) String transportType,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        Users loggedInUser = getLoggedInUser();
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in.");
        }




        List<Tour> filteredTours = bookingService.filterTours(country, lodgingType, transportType, minPrice, maxPrice);

        if (filteredTours.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No tours found matching the specified criteria."));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Filtered tours fetched successfully.",
                "filteredTours", filteredTours
        ));
    }

    @Operation(summary = "Get ticket summary", description = "Fetches ticket sales summary for each tour.")
    @GetMapping("admin/tourTicketSummary")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getTicketSummaryPerTour() {
        Users loggedInUser = getLoggedInUser();
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in.");
        }

        try {
            List<Map<String, Object>> ticketSummary = bookingService.getTicketSummaryPerTour();
            return ResponseEntity.ok(Map.of(
                    "message", "Admin: " + loggedInUser.getEmail() + " is viewing ticket summary.",
                    "summary", ticketSummary
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(summary = "Get tour details with bookings", description = "Fetches tour and associated booking details.")
    @GetMapping("admin/tourDetails/{tourId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getTourDetailsWithBookings(@PathVariable Long tourId) {
        Users loggedInUser = getLoggedInUser();
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in.");
        }

        try {
            Map<String, Object> tourDetails = bookingService.getTourDetailsWithBookings(tourId);
            if (tourDetails != null) {
                return ResponseEntity.ok(Map.of(
                        "message", "Admin: " + loggedInUser.getEmail() + " is viewing tour details.",
                        "details", tourDetails
                ));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "message", "Tour not found with ID: " + tourId
                ));
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
