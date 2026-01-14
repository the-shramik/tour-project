INSERT INTO location (from_location, to_location, distance, description, estimated_travel_time)
VALUES ('New York', 'Los Angeles', 3940.0, 'A long drive across the country.', '40 hours');

INSERT INTO lodging (lodging_name, lodging_type, description, address, rating)
VALUES ('Beachfront Hotel', 'Hotel', 'A beautiful hotel overlooking the ocean.', '123 Ocean Drive, Miami, FL', 4.5);

INSERT INTO transport (transport_name, transport_type, estimated_travel_time, description)
VALUES ('Luxury Bus', 'Bus', '5 hours', 'A comfortable luxury bus with reclining seats.');

INSERT INTO tours (
    tour_name,
    tour_description,
    tour_guide,
    start_date,
    end_date,
    meals,
    activities,
    price,
    tickets_available,
    tour_images
) VALUES (
    'Grand Canyon Adventure',
    'A breathtaking tour of the Grand Canyon.',
    'John Doe',
    '2024-12-01',
    '2024-12-05',
    ARRAY['Breakfast', 'Lunch', 'Dinner'],
    ARRAY['Hiking', 'Rafting', 'Camping'],
    1500.00,
    20,
    ARRAY['image1.jpg', 'image2.jpg', 'image3.jpg']
);
