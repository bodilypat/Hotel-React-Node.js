CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_role ENUM('Admin','Receptionist','Housekeeping','Manager') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)
CREATE TRIGGER trg_users_updated
BEFORE UPDATE ON users
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;

--2. Rooms Table 
CREATE TABLE rooms (
    room_id INT GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    room_type ENUM('Single','Double','Suite','Deluxe','Family') NOT NULL,
    floor INT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL CHECK (price_per_night >= 0),
    status ENUM('Available','Occupied','Cleaning','Maintenance') NOT NULL DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_rooms_updated
BEFORE UPDATE ON rooms
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;

--3. Guests Table
CREATE TABLE guests (
    guest_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    id_proof_type ENUM('Passport','Driver License','National ID') NOT NULL,
    id_proof_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TRIGGER trg_guests_updated
BEFORE UPDATE ON guests
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;


--4. Reservations Table
CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    guest_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status ENUM('Booked','Checked-in','Checked-out','Cancelled') NOT NULL DEFAULT 'Booked',
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);  
CREATE TRIGGER trg_reservations_updated
BEFORE UPDATE ON reservations
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;


--5. Payments Table
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('Credit Card','Debit Card','Cash','Online') NOT NULL,
    status ENUM('Pending','Completed','Failed') NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id)
);
CREATE INDEX idx_payment_status ON payments(status);
