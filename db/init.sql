-- ============================================================
--  Web-Based Automated Car Service Advisor
--  Full Database Schema  |  car_service_advisor
-- ============================================================

CREATE DATABASE IF NOT EXISTS car_service_advisor
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE car_service_advisor;

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
    userID      VARCHAR(10)  PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL UNIQUE,
    fullName    VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    phoneNum    VARCHAR(20),
    role        ENUM('Admin','Employee','Customer') NOT NULL DEFAULT 'Customer',
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (userID, username, fullName, email, password, phoneNum, role) VALUES
('u1','izzuls','Izzul Syahmi','izzuls@gmail.com','$2b$12$MPTj706AUWJIZ7S5ihnRQe.MN/XE4ko9m7J7k4FtSpdp39Jd8FFbS','0123456789','Admin'),
('u2','ali','Ali','ali@gmail.com','$2b$12$KhstieMzvL8nKt2VsBNIXuH7dKm.m3ryBZDN7vG6q4oq/idy5hl2y','0198765432','Customer'),
('u3','ahmad','Ahmad','ahmad@gmail.com','$2b$12$MPTj706AUWJIZ7S5ihnRQe.MN/XE4ko9m7J7k4FtSpdp39Jd8FFbS','0171234567','Employee');

-- Force-update seed user passwords to bcrypt hashes (fixes existing rows seeded with plain text)
UPDATE users SET password = '$2b$12$MPTj706AUWJIZ7S5ihnRQe.MN/XE4ko9m7J7k4FtSpdp39Jd8FFbS' WHERE userID = 'u1';
UPDATE users SET password = '$2b$12$KhstieMzvL8nKt2VsBNIXuH7dKm.m3ryBZDN7vG6q4oq/idy5hl2y' WHERE userID = 'u2';
UPDATE users SET password = '$2b$12$MPTj706AUWJIZ7S5ihnRQe.MN/XE4ko9m7J7k4FtSpdp39Jd8FFbS' WHERE userID = 'u3';

-- 2. EMPLOYEES
CREATE TABLE IF NOT EXISTS employees (
    employeeID  VARCHAR(10) PRIMARY KEY,
    userID      VARCHAR(10) NOT NULL,
    position    VARCHAR(50) NOT NULL,
    managerID   VARCHAR(10) DEFAULT NULL,
    FOREIGN KEY (userID)    REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (managerID) REFERENCES employees(employeeID) ON DELETE SET NULL
);

INSERT IGNORE INTO employees (employeeID, userID, position, managerID) VALUES
('e1','u1','Admin',NULL),
('e2','u3','Employee','e1');

-- 3. CUSTOMERS
CREATE TABLE IF NOT EXISTS customers (
    customerID  VARCHAR(10) PRIMARY KEY,
    userID      VARCHAR(10) NOT NULL UNIQUE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);

INSERT IGNORE INTO customers (customerID, userID) VALUES ('c1','u2');

-- 4. CAR MODELS
CREATE TABLE IF NOT EXISTS car_models (
    modelID     VARCHAR(10)  PRIMARY KEY,
    brand       VARCHAR(50)  NOT NULL DEFAULT 'Perodua',
    modelName   VARCHAR(100) NOT NULL
);

INSERT IGNORE INTO car_models (modelID, brand, modelName) VALUES
('m1','Perodua','Axia'),('m2','Perodua','Bezza'),('m3','Perodua','Myvi'),
('m4','Perodua','Ativa'),('m5','Perodua','Alza'),('m6','Perodua','Aruz'),
('m7','Perodua','Kenari'),('m8','Perodua','Kembara'),('m9','Perodua','Kelisa'),
('m10','Perodua','Kancil'),('m11','Perodua','Viva'),('m12','Perodua','Nautica'),
('m13','Perodua','Traz');

-- 5. CAR VARIANTS
CREATE TABLE IF NOT EXISTS car_variants (
    variantID   VARCHAR(10)  PRIMARY KEY,
    modelID     VARCHAR(10)  NOT NULL,
    variantName VARCHAR(100) NOT NULL,
    FOREIGN KEY (modelID) REFERENCES car_models(modelID) ON DELETE CASCADE
);

INSERT IGNORE INTO car_variants (variantID, modelID, variantName) VALUES
('v1','m1','Axia E MT 1.0'),('v2','m1','Axia G MT 1.0'),('v3','m1','Axia X MT 1.0'),
('v4','m1','Axia AV CVT 1.0'),('v5','m1','Axia Style CVT 1.0'),
('v6','m2','Bezza G CVT 1.0'),('v7','m2','Bezza X CVT 1.0'),
('v8','m2','Bezza AV CVT 1.3'),('v9','m2','Bezza Premium X CVT 1.3'),
('v10','m3','Myvi G MT 1.3'),('v36','m3','Myvi G AT 1.3'),('v11','m3','Myvi H CVT 1.3'),
('v12','m3','Myvi X CVT 1.3'),('v13','m3','Myvi AV CVT 1.5'),('v14','m3','Myvi H CVT 1.5'),
('v37','m3','Myvi AV AT 1.5'),
('v15','m4','Ativa H CVT 1.0T'),('v16','m4','Ativa X CVT 1.0T'),('v17','m4','Ativa AV CVT 1.0T'),
('v18','m5','Alza Standard AT 1.5'),('v19','m5','Alza Standard MT 1.5'),('v20','m5','Alza AV AT 1.5'),
('v21','m6','Aruz X CVT 1.5'),('v22','m6','Aruz AV CVT 1.5'),
('v23','m7','Kenari EX 1.0'),('v24','m7','Kenari GX 1.0'),
('v25','m8','Kembara GX 1.3'),('v26','m8','Kembara EX 1.3'),
('v27','m9','Kelisa GX 1.0'),('v28','m9','Kelisa EX 1.0'),
('v29','m10','Kancil 660'),('v30','m10','Kancil 850'),
('v31','m11','Viva 660 Auto'),('v32','m11','Viva 850 Manual'),('v33','m11','Viva Elite 1.0'),
('v34','m12','Nautica 1.5 FWD'),('v35','m12','Nautica 1.5 AWD'),
('v38','m13','Traz CVT 1.5');

-- 6. SERVICE CATEGORIES
CREATE TABLE IF NOT EXISTS service_categories (
    categoryID  VARCHAR(10)  PRIMARY KEY,
    title       VARCHAR(50)  NOT NULL,
    imagePath   VARCHAR(200)
);

INSERT IGNORE INTO service_categories (categoryID, title, imagePath) VALUES
('cat1','engine','images/engine.jpg'),('cat2','brake','images/brake.jpg'),
('cat3','wheels','images/wheels.png'),('cat4','suspension','images/suspension.jpg'),
('cat5','battery','images/battery.jpg'),('cat6','aircond','images/ac.png'),
('cat7','general','images/general.png'),('cat8','electrical','images/electrical.png'),
('cat9','exhaust','images/exhaust.png'),('cat10','lighting','images/lighting.jpg');

-- 7. SERVICE PARTS
CREATE TABLE IF NOT EXISTS service_parts (
    partID      VARCHAR(10)   PRIMARY KEY,
    categoryID  VARCHAR(10)   NOT NULL,
    partName    VARCHAR(200)  NOT NULL,
    partCode    VARCHAR(50)   NOT NULL UNIQUE,
    price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    isMandatory TINYINT(1)    NOT NULL DEFAULT 0,
    FOREIGN KEY (categoryID) REFERENCES service_categories(categoryID)
);

INSERT IGNORE INTO service_parts (partID, categoryID, partName, partCode, price, isMandatory) VALUES
('p1','cat1','Engine Oil (Semi-Synthetic)','OIL-SS',89.00,1),
('p2','cat1','Engine Oil (Fully-Synthetic)','OIL-FS',159.00,1),
('p3','cat1','Oil Filter','FLT-OIL',18.00,1),
('p4','cat1','Air Filter','FLT-AIR',35.00,0),
('p5','cat1','Spark Plugs (Set of 3, Nickel)','SPK-NI',55.00,0),
('p6','cat1','Spark Plugs (Set of 3, Iridium)','SPK-IR',185.00,0),
('p7','cat1','Coolant Top-Up (1L)','CLT-1L',28.00,0),
('p8','cat1','CVT Transmission Fluid','FLD-CVT',120.00,0),
('p9','cat1','Drive Belt (Serpentine)','BLT-DRV',65.00,0),
('p10','cat2','Brake Pads (Front Pair)','BRK-FP',120.00,0),
('p11','cat2','Brake Pads (Rear Pair)','BRK-RP',90.00,0),
('p12','cat2','Brake Fluid (500ml DOT3)','FLD-BRK',35.00,0),
('p13','cat3','Wheel Alignment and Balancing','SVC-ALN',55.00,0),
('p14','cat3','Tire Rotation','SVC-ROT',30.00,0),
('p15','cat4','Shock Absorber (Front Each)','SUS-SHA',230.00,0),
('p16','cat5','Car Battery (NS40)','BAT-NS40',195.00,0),
('p17','cat5','Car Battery (NS60)','BAT-NS60',235.00,0),
('p18','cat7','Wiper Blades (Pair)','WPR-PR',45.00,0),
('p19','cat7','Labour / Workshop Fee','SVC-LAB',50.00,1);

-- 8. SERVICE SCHEDULES
CREATE TABLE IF NOT EXISTS service_schedules (
    scheduleID      INT AUTO_INCREMENT PRIMARY KEY,
    modelID         VARCHAR(10)   NOT NULL,
    mileage         INT           NOT NULL,
    transmission    ENUM('Any','Automatic','Manual') DEFAULT 'Any',
    totalPeninsular DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    totalEM         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (modelID) REFERENCES car_models(modelID) ON DELETE CASCADE
);

-- 9. SERVICE SCHEDULE ITEMS
CREATE TABLE IF NOT EXISTS service_schedule_items (
    itemID      INT AUTO_INCREMENT PRIMARY KEY,
    scheduleID  INT           NOT NULL,
    itemName    VARCHAR(200)  NOT NULL,
    quantity    INT           NOT NULL DEFAULT 1,
    priceP      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    priceEM     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    itemType    ENUM('Part','Labour','Tax') NOT NULL DEFAULT 'Part',
    FOREIGN KEY (scheduleID) REFERENCES service_schedules(scheduleID) ON DELETE CASCADE
);

-- 10. QUOTATIONS
CREATE TABLE IF NOT EXISTS quotations (
    quoteID     VARCHAR(20)   PRIMARY KEY,
    customerID  VARCHAR(10)   NOT NULL,
    variantID   VARCHAR(10)   NOT NULL,
    mileage     INT           NOT NULL,
    region      ENUM('Peninsular','East Malaysia') NOT NULL DEFAULT 'Peninsular',
    totalCost   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quoteDate   DATE          NOT NULL,
    createdAt   DATETIME      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerID) REFERENCES customers(customerID) ON DELETE CASCADE,
    FOREIGN KEY (variantID)  REFERENCES car_variants(variantID)
);

-- 11. QUOTATION PARTS
CREATE TABLE IF NOT EXISTS quotation_parts (
    quotePartID VARCHAR(50)   PRIMARY KEY,
    quoteID     VARCHAR(20)   NOT NULL,
    partName    VARCHAR(200)  NOT NULL,
    partCode    VARCHAR(50),
    price       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quantity    INT           NOT NULL DEFAULT 1,
    itemType    ENUM('Part','Labour','Tax') NOT NULL DEFAULT 'Part',
    subtotal    DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (quoteID) REFERENCES quotations(quoteID) ON DELETE CASCADE
);

-- 12. SERVICE RECORDS
CREATE TABLE IF NOT EXISTS service_records (
    serviceID   VARCHAR(20)   PRIMARY KEY,
    quoteID     VARCHAR(20)   DEFAULT NULL,
    customerID  VARCHAR(10)   NOT NULL,
    employeeID  VARCHAR(10)   DEFAULT NULL,
    variantID   VARCHAR(10)   NOT NULL,
    mileage     INT           NOT NULL,
    serviceDate DATE          NOT NULL,
    totalCost   DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status      ENUM('Pending','In Progress','Completed','Cancelled') DEFAULT 'Pending',
    notes       TEXT,
    createdAt   DATETIME      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (employeeID) REFERENCES employees(employeeID) ON DELETE SET NULL,
    FOREIGN KEY (variantID)  REFERENCES car_variants(variantID),
    FOREIGN KEY (quoteID)    REFERENCES quotations(quoteID) ON DELETE SET NULL
);

-- 13. KNOWLEDGE BLOCKS
CREATE TABLE IF NOT EXISTS knowledge_blocks (
    blockID         VARCHAR(10)  PRIMARY KEY,
    categoryID      VARCHAR(10)  NOT NULL,
    employeeID      VARCHAR(10)  DEFAULT NULL,
    blockTitle      VARCHAR(200) NOT NULL,
    description     TEXT,
    whyItMatters    TEXT,
    maintenanceTip  TEXT,
    didYouKnow      TEXT,
    costEstimate    VARCHAR(100),
    difficultyLevel VARCHAR(50) DEFAULT 'Moderate',
    urgency         VARCHAR(50) DEFAULT 'Routine',
    FOREIGN KEY (categoryID) REFERENCES service_categories(categoryID),
    FOREIGN KEY (employeeID) REFERENCES employees(employeeID) ON DELETE SET NULL
);

-- 14. KNOWLEDGE BLOCK WARNING SIGNS
CREATE TABLE IF NOT EXISTS knowledge_warning_signs (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    blockID  VARCHAR(10) NOT NULL,
    warnSign TEXT        NOT NULL,
    FOREIGN KEY (blockID) REFERENCES knowledge_blocks(blockID) ON DELETE CASCADE
);

-- 15. SERVICE CENTERS
CREATE TABLE IF NOT EXISTS service_centers (
    centerID   INT AUTO_INCREMENT PRIMARY KEY,
    centerName VARCHAR(200) NOT NULL,
    address    TEXT,
    state      VARCHAR(100),
    phone      VARCHAR(30),
    lat        DECIMAL(10,7),
    lng        DECIMAL(10,7)
);

-- Verify
SHOW TABLES;
