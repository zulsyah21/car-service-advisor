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

INSERT IGNORE INTO service_centers (centerName, address, state, phone, lat, lng) VALUES
('Perodua Sales & Service Shah Alam', 'Lot 2, Jalan Pelabur 23/1, Seksyen 23, 40300 Shah Alam', 'Selangor', '03-5192 1888', 3.0738, 101.5183),
('Perodua Service Centre Petaling Jaya', 'No. 2, Jalan 51/205, Section 51, 46050 Petaling Jaya', 'Selangor', '03-7958 9888', 3.1073, 101.6067),
('Perodua Sales & Service Kuala Lumpur (Kepong)', 'No. 29, Jalan Metro Perdana Barat 1, Taman Usahawan, 52100 Kepong', 'Kuala Lumpur', '03-6257 1888', 3.2113, 101.6386),
('Perodua Service Centre Cheras', 'No. 2, Jalan Pandan Maju 1, Off Jalan Pandan Indah, 55100 Cheras', 'Kuala Lumpur', '03-9284 8888', 3.1089, 101.7326),
('Perodua Sales & Service Johor Bahru (Larkin)', 'No. 10, Jalan Tampoi, Kawasan Perindustrian Larkin, 80350 Johor Bahru', 'Johor', '07-238 8888', 1.4937, 103.7333),
('Perodua Service Centre Skudai', 'No. 1, Jalan Perjiranan 12, Taman Mutiara Rini, 81300 Skudai', 'Johor', '07-557 8888', 1.5328, 103.6778),
('Perodua Sales & Service Penang (Butterworth)', 'No. 2388, Jalan Chain Ferry, 13400 Butterworth', 'Penang', '04-331 8888', 5.3996, 100.3683),
('Perodua Service Centre Georgetown', 'No. 1, Jalan Mahsuri, Bayan Baru, 11950 Bayan Lepas', 'Penang', '04-641 8888', 5.3399, 100.2941),
('Perodua Sales & Service Kota Kinabalu', 'Lot 1, Block A, Kolombong Industrial Estate, 88450 Kota Kinabalu', 'Sabah', '088-421 888', 6.0527, 116.1474),
('Perodua Service Centre Sandakan', 'Lot 14, Block 7, Jalan Utama, Bandar Indah, 90000 Sandakan', 'Sabah', '089-221 888', 5.8456, 118.0776),
('Perodua Sales & Service Kuching', 'No. 1, Jalan Stakan, 93250 Kuching', 'Sarawak', '082-348 888', 1.5531, 110.3592),
('Perodua Service Centre Miri', 'Lot 1258, Block 9, Jalan Miri Pujut, 98000 Miri', 'Sarawak', '085-432 888', 4.3995, 113.9914),
('Perodua Sales & Service Kota Bharu', 'No. 5, Jalan Hamzah, 15050 Kota Bharu', 'Kelantan', '09-748 8888', 6.1248, 102.2407),
('Perodua Service Centre Kuantan', 'No. 2, Jalan Gambut, 25000 Kuantan', 'Pahang', '09-514 8888', 3.8178, 103.3236),
('Perodua Sales & Service Alor Setar', 'No. 1, Lebuhraya Darulaman, 05100 Alor Setar', 'Kedah', '04-731 8888', 6.1197, 100.3707);

-- 16. KNOWLEDGE BLOCKS SEED DATA
INSERT IGNORE INTO knowledge_blocks (blockID, categoryID, employeeID, blockTitle, description, whyItMatters, maintenanceTip, didYouKnow, costEstimate, difficultyLevel, urgency) VALUES

('kb1', 'cat1', 'e2',
 'Engine Oil & Lubrication',
 'Engine oil is the lifeblood of your car''s engine. It lubricates all moving metal parts, reduces friction and heat, and carries away contaminants from combustion. Without adequate clean oil, engine components grind against each other, causing rapid wear and potentially catastrophic failure.',
 'Neglecting oil changes leads to sludge buildup that clogs oil passages, causing overheating, reduced engine efficiency, and eventually complete engine seizure. A seized engine can cost RM 5,000–15,000 to rebuild — far more than a simple RM 89 oil change.',
 'Check your oil level monthly using the dipstick when the engine is cold. The oil should be between the MIN and MAX marks and appear amber/light brown. Dark black oil or oil with a milky appearance means it''s overdue or may indicate a head gasket issue.',
 'Modern fully-synthetic engine oils can last up to 10,000 km between changes, while conventional mineral oil should be changed every 5,000 km. Perodua recommends 5W-30 or 0W-20 fully-synthetic oil for most newer models.',
 'RM 89–159 (semi/fully synthetic) + RM 18 oil filter', 'Easy', 'Routine'),

('kb2', 'cat2',
 'e2',
 'Brake System Maintenance',
 'Your vehicle''s braking system is the single most critical safety system. It consists of brake pads, rotors (discs), brake fluid, callipers, and brake lines. Hydraulic pressure transfers your pedal force to the callipers which clamp the pads onto the rotating rotors to slow the car.',
 'Worn brake pads can grind metal-to-metal against the rotors, destroying both components. This dramatically increases stopping distance and creates a serious accident risk. Contaminated brake fluid absorbs moisture over time, lowering its boiling point and causing brake fade under heavy use.',
 'Listen for squealing or grinding sounds when braking — these are the wear indicators telling you pads are low. Have brake fluid flushed every 2 years regardless of mileage as it is hygroscopic (absorbs water from the atmosphere). Front brake pads typically wear faster than rear pads.',
 'It takes about 40–50 metres to stop from 100km/h with good brakes. With worn pads, this can increase by 20–30%, which at highway speeds is the difference between a near-miss and a serious collision.',
 'RM 90–120 per axle (pads) + RM 35 fluid flush', 'Moderate', 'High Priority'),

('kb3', 'cat3',
 'e2',
 'Tyres, Alignment & Wheel Balancing',
 'Tyres are your only contact with the road — four patches roughly the size of your palm each. Tyre condition directly impacts grip, fuel economy, ride comfort, and safety. Wheel alignment refers to the angle of the wheels relative to the road and each other, while balancing ensures even weight distribution around each wheel.',
 'Under-inflated tyres increase rolling resistance, costing up to 3% more fuel and causing premature shoulder wear. Misaligned wheels cause uneven tyre wear, pulling to one side, and stress on suspension components. Unbalanced wheels cause vibration and faster bearing wear.',
 'Check tyre pressure monthly when cold — Perodua Myvi typically requires 30–32 PSI. Rotate tyres every 10,000 km for even wear. The legal tread depth minimum in Malaysia is 1.6mm — use a RM 1 coin: if you can see the full rim of the coin in the tread grooves, replace immediately.',
 'A 10 PSI under-inflation increases tyre wear by 25% and reduces fuel efficiency. Proper tyre maintenance can extend tyre life from 30,000 km to 60,000 km — saving RM 400–800 per set.',
 'RM 30–55 (rotation + alignment + balancing)', 'Easy', 'Routine'),

('kb4', 'cat4',
 'e2',
 'Suspension & Steering System',
 'The suspension system (shock absorbers, struts, springs, control arms, tie rods) keeps your tyres in contact with the road and provides ride comfort by absorbing bumps and road imperfections. The steering system (rack and pinion or power steering) translates your steering wheel input to wheel movement.',
 'Worn shock absorbers increase braking distance by up to 20% because the tyres bounce off the road surface instead of maintaining contact. Faulty suspension causes tyre cupping (uneven wear), vibration, and poor handling — especially dangerous during emergency manoeuvres or wet road conditions.',
 'Test shock absorbers by pressing down firmly on each corner of the car and releasing — it should bounce back once and settle immediately. If it continues bouncing, the shocks are worn. Listen for clunking over bumps (worn bushings) or knocking during turns (worn ball joints or tie rod ends).',
 'Perodua vehicles generally last 80,000–100,000 km before shock absorbers need replacement under normal Malaysian road conditions. Rough roads or frequent potholes can reduce this significantly.',
 'RM 230 per shock absorber (front)', 'Moderate', 'High Priority'),

('kb5', 'cat5',
 'e2',
 'Car Battery Health & Charging',
 'The 12V lead-acid car battery provides the initial electrical surge to crank the starter motor and start the engine, while also powering all electronics when the engine is off. The alternator charges the battery and powers electronics while driving. Most car batteries last 2–4 years in Malaysia''s tropical climate.',
 'A weak battery may fail to start the car — especially on hot days when thermal load is high. Modern vehicles with many electronic systems (keyless entry, ECU, infotainment) drain batteries faster. A completely dead battery can damage the alternator if jump-started incorrectly.',
 'Get your battery tested (load test) annually after 2 years. Signs of a failing battery include slow engine cranking, dim headlights at idle, and frequent need to jump-start. Keep battery terminals clean from white/blue corrosion using a wire brush and bicarbonate of soda solution.',
 'Malaysia''s heat accelerates battery degradation. A battery that lasts 5 years in Europe may only last 2–3 years here due to constant heat cycling. Park in shade when possible to extend battery life.',
 'RM 195–235 (NS40/NS60 battery)', 'Easy', 'Routine'),

('kb6', 'cat6',
 'e2',
 'Air Conditioning System',
 'The automotive air conditioning system cools and dehumidifies cabin air. It consists of a compressor (driven by the engine), condenser (front of the car), expansion valve, evaporator (inside dashboard), and refrigerant (R-134a or R-1234yf). The cabin air filter traps dust, pollen, and pollutants before they enter the cabin.',
 'A poorly maintained A/C system forces the compressor to work harder, increasing fuel consumption by 5–10%. Clogged cabin filters reduce airflow, allow mould and bacteria to grow on the evaporator, and cause musty smells. Low refrigerant reduces cooling efficiency and can damage the compressor.',
 'Replace the cabin air filter every 15,000 km or annually — in Malaysia''s dusty conditions, possibly more frequently. If you notice a musty smell when first turning on the A/C, run the fan on high with A/C off for 10 minutes before parking to dry the evaporator. Have refrigerant levels checked every 2 years.',
 'A clean cabin air filter can improve A/C cooling efficiency by up to 15% and reduce allergens in the cabin air. Some Perodua models (Myvi, Bezza) use a simple slide-out filter accessible without tools.',
 'RM 40–80 (cabin filter replacement)', 'Easy', 'Routine'),

('kb7', 'cat7',
 'e2',
 'General Vehicle Maintenance',
 'General maintenance covers all the routine checks and replacements that keep your vehicle running safely and efficiently beyond the major systems. This includes wiper blades, engine coolant, power steering fluid, transmission fluid, drive belts, and hoses. These items are often overlooked but are critical to vehicle longevity.',
 'Neglecting general maintenance leads to compounding problems: a snapped serpentine belt stops the alternator and power steering simultaneously. Degraded coolant causes overheating that can warp the cylinder head. Worn wipers impair visibility in rain, which is dangerous on Malaysian roads.',
 'Follow the manufacturer''s service schedule in your owner''s manual. Keep a service logbook — this also maintains resale value. Check all fluid levels (coolant, power steering, brake, windscreen washer) at every oil change. Replace wiper blades at least once a year, or whenever they streak.',
 'Regular servicing as per schedule can extend a car''s lifespan by 30–50% and maintain fuel efficiency. A well-maintained Perodua can comfortably run 250,000–400,000 km before needing major engine work.',
 'RM 50 labour + parts as required', 'Easy', 'Routine'),

('kb8', 'cat8',
 'e2',
 'Electrical System & ECU',
 'Modern vehicles like Perodua''s latest lineup are heavily computerised. The Engine Control Unit (ECU) manages fuel injection, ignition timing, emissions, and dozens of other parameters in real time. Other control modules manage ABS, airbags, transmission, and infotainment. Wiring harnesses connect all these systems.',
 'Electrical faults can trigger warning lights, cause intermittent starting problems, affect fuel economy, and disable safety features like ABS or airbags. Corroded connections and damaged wiring are common in Malaysia''s humidity. An unaddressed electrical fault can lead to fire risk in extreme cases.',
 'Never ignore a Check Engine light — use an OBD-II scanner (widely available, RM 30–100) to read fault codes before they become expensive repairs. Keep battery connections clean and tight. Avoid aftermarket accessories that draw excessive current without proper fusing.',
 'Perodua''s newer models (Ativa, Alza, Bezza facelift) use a CAN-bus network where modules communicate digitally. A fault in one module can trigger warning lights in seemingly unrelated systems — always diagnose with a proper scan tool.',
 'RM 50–200+ depending on fault (diagnostics + repair)', 'Complex', 'High Priority'),

('kb9', 'cat9',
 'e2',
 'Exhaust System & Emissions',
 'The exhaust system routes combustion gases from the engine through the catalytic converter (which neutralises harmful emissions), the muffler (which reduces noise), and out through the tailpipe. The oxygen sensors (lambda sensors) monitor exhaust gases and feed data back to the ECU to optimise the air-fuel mixture.',
 'A failing catalytic converter causes increased fuel consumption and failed emissions tests (PUSPAKOM). Exhaust leaks allow dangerous carbon monoxide to potentially enter the cabin. Failing oxygen sensors cause the engine to run rich (too much fuel), increasing fuel costs by 10–15%.',
 'Listen for rattling from underneath (damaged catalytic converter heat shield), hissing/ticking exhaust sounds (manifold leak), or strong fuel smell (rich mixture from faulty O2 sensor). Have exhaust system inspected annually, especially if your car is older than 5 years.',
 'The catalytic converter contains precious metals (platinum, palladium, rhodium) — which is why catalytic converter theft is increasingly common globally. Malaysia''s Jabatan Alam Sekitar (DOE) enforces emission standards — a failed emissions test means your roadtax cannot be renewed.',
 'RM 200–800 (catalytic converter), RM 80–150 (O2 sensor)', 'Complex', 'Routine'),

('kb10', 'cat10',
 'e2',
 'Lighting & Visibility Systems',
 'Vehicle lighting includes headlights (low/high beam), tail lights, brake lights, turn signals, hazard lights, reverse lights, and interior lighting. Modern Perodua vehicles use halogen, LED, or projector headlights. Daytime Running Lights (DRL) are standard on newer models for safety.',
 'Non-functioning lights are illegal under Malaysian Road Transport Act 1987 and create serious safety hazards. Brake lights are critical — other drivers depend on them to know you''re stopping. Dim or yellowed headlight lenses reduce night visibility by up to 80%. Faulty indicators are a leading cause of lane-change accidents.',
 'Check all lights monthly — walk around the car with hazard lights flashing. Clean yellowed headlight lenses with headlight restoration polish or a toothpaste rub (mild abrasive) to improve clarity temporarily. Replace bulbs in pairs so both sides have equal brightness. LED upgrades can significantly improve visibility.',
 'A standard H4 halogen headlight bulb costs RM 15–25 and takes 10 minutes to replace. LED replacements (RM 50–150/pair) last 5× longer and provide 3× more light output — a worthwhile upgrade for frequent night drivers.',
 'RM 15–150 depending on bulb type (halogen to LED)', 'Easy', 'Routine');

-- Knowledge Block Warning Signs
INSERT IGNORE INTO knowledge_warning_signs (blockID, warnSign) VALUES
('kb1', 'Dark black or gritty oil on dipstick'),
('kb1', 'Oil warning light illuminated on dashboard'),
('kb1', 'Engine knocking or ticking sounds, especially on startup'),
('kb1', 'Burning oil smell from engine bay'),
('kb1', 'Blue/grey smoke from exhaust on acceleration'),
('kb1', 'Milky or frothy oil (possible coolant contamination)'),
('kb2', 'Squealing or grinding noise when applying brakes'),
('kb2', 'Car pulling to one side when braking'),
('kb2', 'Brake pedal feels soft, spongy, or goes to the floor'),
('kb2', 'Vibration or pulsing through brake pedal'),
('kb2', 'Brake warning light is on'),
('kb2', 'Longer stopping distances than usual'),
('kb3', 'Uneven or rapid tyre wear on edges or centre'),
('kb3', 'Car pulling left or right on a straight road'),
('kb3', 'Steering wheel vibration at certain speeds'),
('kb3', 'Tyre pressure warning light (TPMS) activated'),
('kb3', 'Visible cracks, bulges, or sidewall damage on tyres'),
('kb4', 'Clunking or banging noises over bumps or potholes'),
('kb4', 'Car continues to bounce after going over a bump'),
('kb4', 'Excessive body roll when cornering'),
('kb4', 'Uneven tyre wear (cupping or scalloping pattern)'),
('kb4', 'Steering wheel vibrates or feels loose'),
('kb5', 'Engine cranks slowly or struggles to start'),
('kb5', 'Dashboard warning lights flash on startup'),
('kb5', 'Headlights dim noticeably at idle or when A/C is on'),
('kb5', 'Battery warning light (charging system) is illuminated'),
('kb5', 'Swollen or bloated battery case'),
('kb6', 'Musty or mouldy smell from A/C vents'),
('kb6', 'A/C takes much longer than usual to cool the cabin'),
('kb6', 'Unusual noises from the compressor area when A/C is on'),
('kb6', 'Water dripping excessively inside the cabin'),
('kb6', 'A/C only blows slightly cool air even on maximum setting'),
('kb7', 'Windscreen wipers leave streaks or skip across the glass'),
('kb7', 'Sweet smell from engine bay (coolant leak)'),
('kb7', 'Power steering feels heavy or makes whining noise on turns'),
('kb7', 'Temperature gauge reads higher than normal'),
('kb8', 'Check Engine (CEL) or other warning lights on dashboard'),
('kb8', 'Intermittent electrical failures (windows, locks, lights)'),
('kb8', 'Fuses blowing repeatedly'),
('kb8', 'Strong burning smell from electrical components'),
('kb9', 'Rotten egg smell from exhaust (failing catalytic converter)'),
('kb9', 'Hissing or ticking sound from under the bonnet'),
('kb9', 'Reduced engine power or poor fuel economy'),
('kb9', 'Rattling noise from underneath the car at idle'),
('kb9', 'Black smoke from exhaust (running rich)'),
('kb10', 'One or more exterior lights not working'),
('kb10', 'Headlights appear dim or yellowish'),
('kb10', 'Turn signal blinks faster than normal (bulb failure)'),
('kb10', 'Brake lights do not illuminate when pedal is pressed');

-- Verify
SHOW TABLES;
