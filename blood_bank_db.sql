-- Step 1: Create the database
-- CREATE DATABASE blood_bank_db;

-- Step 2: Use the database
USE blood_bank_db;

CREATE TABLE IF NOT EXISTS donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bloodGroup VARCHAR(10) NOT NULL,
    address TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Step 4: Insert sample data
INSERT INTO donors (name, bloodGroup, address, contact) VALUES
('Alice Smith', 'A+', '123 Maple St, Springfield', '555-1234'),
('Bob Johnson', 'O-', '456 Elm St, Springfield', '555-5678'),
('Charlie Brown', 'B+', '789 Oak St, Springfield', '555-8765');

-- To check the inserted data
SELECT * FROM donors;
