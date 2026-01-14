CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    from_location VARCHAR(255) NOT NULL,
    to_location VARCHAR(255) NOT NULL,
    distance DOUBLE PRECISION NOT NULL,
    description TEXT,
    estimated_travel_time VARCHAR(50)
);


CREATE TABLE lodging (
    id SERIAL PRIMARY KEY,
    lodging_name VARCHAR(255) NOT NULL,
    lodging_type VARCHAR(100) NOT NULL,
    description TEXT,
    address VARCHAR(255) NOT NULL,
    rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5)
);


CREATE TABLE transport (
    id SERIAL PRIMARY KEY,
    transport_name VARCHAR(255) NOT NULL,
    transport_type VARCHAR(50) NOT NULL,
    estimated_travel_time VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_name VARCHAR(255),
    tour_description VARCHAR(255),
    tour_guide VARCHAR(255),
    start_date DATE,
    end_date DATE,
    meals VARCHAR(255) ARRAY,
    activities VARCHAR(255) ARRAY,
    price DECIMAL(10, 2),
    tickets_available INT,
    tour_images VARCHAR(255) ARRAY
);
