/**
 * db-init.js
 * Seeds all localStorage database tables with default data on first load.
 * Only seeds a table if it doesn't already exist (won't overwrite user data).
 * Must be loaded BEFORE script.js so all data is ready when pages initialize.
 */

(function () {
    function seedTable(name, data) {
        if (!localStorage.getItem(name)) {
            localStorage.setItem(name, JSON.stringify(data));
        }
    }

    // Version-aware seed: re-seeds whenever DATA_VERSION is bumped
    const DATA_VERSION = "2.3";
    function seedWithVersionCheck(key, data) {
        const versionKey = key + '_version';
        if (localStorage.getItem(versionKey) !== DATA_VERSION) {
            localStorage.setItem(key, JSON.stringify(data));
            localStorage.setItem(versionKey, DATA_VERSION);
        }
    }

    // â”€â”€â”€ USERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    seedTable('userTable', [
        { userID: "u1", username: "izzuls",  fullName: "Izzul Syahmi", email: "izzuls@gmail.com",  password: "123", phoneNum: "0123456789", role: "Admin" },
        { userID: "u2", username: "ali",     fullName: "Ali",           email: "ali@gmail.com",    password: "111", phoneNum: "0198765432", role: "Customer" },
        { userID: "u3", username: "ahmad",   fullName: "Ahmad",         email: "ahmad@gmail.com",  password: "123", phoneNum: "0171234567", role: "Employee" }
    ]);

    seedTable('employeeTable', [
        { employeeID: "e1", userID: "u1", position: "Admin",    managerID: null },
        { employeeID: "e2", userID: "u3", position: "Employee", managerID: "e1" }
    ]);

    seedTable('customerTable', [
        { customerID: "c1", userID: "u2" }
    ]);

    // â”€â”€â”€ CAR MODELS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    seedTable('carModelTable', [
        { modelID: "m1",  brand: "Perodua", modelName: "Axia" },
        { modelID: "m2",  brand: "Perodua", modelName: "Bezza" },
        { modelID: "m3",  brand: "Perodua", modelName: "Myvi" },
        { modelID: "m4",  brand: "Perodua", modelName: "Ativa" },
        { modelID: "m5",  brand: "Perodua", modelName: "Alza" },
        { modelID: "m6",  brand: "Perodua", modelName: "Aruz" },
        { modelID: "m7",  brand: "Perodua", modelName: "Kenari" },
        { modelID: "m8",  brand: "Perodua", modelName: "Kembara" },
        { modelID: "m9",  brand: "Perodua", modelName: "Kelisa" },
        { modelID: "m10", brand: "Perodua", modelName: "Kancil" },
        { modelID: "m11", brand: "Perodua", modelName: "Viva" },
        { modelID: "m12", brand: "Perodua", modelName: "Nautica" },
        { modelID: "m13", brand: "Perodua", modelName: "Traz" }
    ]);

    // â”€â”€â”€ CAR VARIANTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    seedTable('carVariantTable', [
        // Axia (m1)
        { variantID: "v1",  modelID: "m1", variantName: "Axia E MT 1.0" },
        { variantID: "v2",  modelID: "m1", variantName: "Axia G MT 1.0" },
        { variantID: "v3",  modelID: "m1", variantName: "Axia X MT 1.0" },
        { variantID: "v4",  modelID: "m1", variantName: "Axia AV CVT 1.0" },
        { variantID: "v5",  modelID: "m1", variantName: "Axia Style CVT 1.0" },

        // Bezza (m2)
        { variantID: "v6",  modelID: "m2", variantName: "Bezza G CVT 1.0" },
        { variantID: "v7",  modelID: "m2", variantName: "Bezza X CVT 1.0" },
        { variantID: "v8",  modelID: "m2", variantName: "Bezza AV CVT 1.3" },
        { variantID: "v9",  modelID: "m2", variantName: "Bezza Premium X CVT 1.3" },

        // Myvi (m3)
        { variantID: "v10", modelID: "m3", variantName: "Myvi G MT 1.3" },
        { variantID: "v36", modelID: "m3", variantName: "Myvi G AT 1.3" },
        { variantID: "v11", modelID: "m3", variantName: "Myvi H CVT 1.3" },
        { variantID: "v12", modelID: "m3", variantName: "Myvi X CVT 1.3" },
        { variantID: "v13", modelID: "m3", variantName: "Myvi AV CVT 1.5" },
        { variantID: "v14", modelID: "m3", variantName: "Myvi H CVT 1.5" },
        { variantID: "v37", modelID: "m3", variantName: "Myvi AV AT 1.5" },

        // Ativa (m4)
        { variantID: "v15", modelID: "m4", variantName: "Ativa H CVT 1.0T" },
        { variantID: "v16", modelID: "m4", variantName: "Ativa X CVT 1.0T" },
        { variantID: "v17", modelID: "m4", variantName: "Ativa AV CVT 1.0T" },

        // Alza (m5)
        { variantID: "v18", modelID: "m5", variantName: "Alza Standard AT 1.5" },
        { variantID: "v19", modelID: "m5", variantName: "Alza Standard MT 1.5" },
        { variantID: "v20", modelID: "m5", variantName: "Alza AV AT 1.5" },

        // Aruz (m6)
        { variantID: "v21", modelID: "m6", variantName: "Aruz X CVT 1.5" },
        { variantID: "v22", modelID: "m6", variantName: "Aruz AV CVT 1.5" },

        // Kenari (m7)
        { variantID: "v23", modelID: "m7", variantName: "Kenari EX 1.0" },
        { variantID: "v24", modelID: "m7", variantName: "Kenari GX 1.0" },

        // Kembara (m8)
        { variantID: "v25", modelID: "m8", variantName: "Kembara GX 1.3" },
        { variantID: "v26", modelID: "m8", variantName: "Kembara EX 1.3" },

        // Kelisa (m9)
        { variantID: "v27", modelID: "m9", variantName: "Kelisa GX 1.0" },
        { variantID: "v28", modelID: "m9", variantName: "Kelisa EX 1.0" },

        // Kancil (m10)
        { variantID: "v29", modelID: "m10", variantName: "Kancil 660" },
        { variantID: "v30", modelID: "m10", variantName: "Kancil 850" },

        // Viva (m11)
        { variantID: "v31", modelID: "m11", variantName: "Viva 660 Auto" },
        { variantID: "v32", modelID: "m11", variantName: "Viva 850 Manual" },
        { variantID: "v33", modelID: "m11", variantName: "Viva Elite 1.0" },

        // Nautica (m12)
        { variantID: "v34", modelID: "m12", variantName: "Nautica 1.5 FWD" },
        { variantID: "v35", modelID: "m12", variantName: "Nautica 1.5 AWD" },

        // Traz (m13)
        { variantID: "v38", modelID: "m13", variantName: "Traz CVT 1.5" }
    ]);

    // â”€â”€â”€ SERVICE PARTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    seedTable('servicePartTable', [
        { partID: "p1",  categoryID: "cat1", partName: "Engine Oil (Semi-Synthetic)",    partCode: "OIL-SS",  price: 89.00,  isMandatory: true  },
        { partID: "p2",  categoryID: "cat1", partName: "Engine Oil (Fully-Synthetic)",   partCode: "OIL-FS",  price: 159.00, isMandatory: true  },
        { partID: "p3",  categoryID: "cat1", partName: "Oil Filter",                     partCode: "FLT-OIL", price: 18.00,  isMandatory: true  },
        { partID: "p4",  categoryID: "cat1", partName: "Air Filter",                     partCode: "FLT-AIR", price: 35.00,  isMandatory: false },
        { partID: "p5",  categoryID: "cat1", partName: "Spark Plugs (Set of 3, Nickel)", partCode: "SPK-NI",  price: 55.00,  isMandatory: false },
        { partID: "p6",  categoryID: "cat1", partName: "Spark Plugs (Set of 3, Iridium)",partCode: "SPK-IR",  price: 185.00, isMandatory: false },
        { partID: "p7",  categoryID: "cat1", partName: "Coolant Top-Up (1L)",            partCode: "CLT-1L",  price: 28.00,  isMandatory: false },
        { partID: "p8",  categoryID: "cat1", partName: "CVT Transmission Fluid",         partCode: "FLD-CVT", price: 120.00, isMandatory: false },
        { partID: "p9",  categoryID: "cat1", partName: "Drive Belt (Serpentine)",        partCode: "BLT-DRV", price: 65.00,  isMandatory: false },
        { partID: "p10", categoryID: "cat2", partName: "Brake Pads (Front Pair)",        partCode: "BRK-FP",  price: 120.00, isMandatory: false },
        { partID: "p11", categoryID: "cat2", partName: "Brake Pads (Rear Pair)",         partCode: "BRK-RP",  price: 90.00,  isMandatory: false },
        { partID: "p12", categoryID: "cat2", partName: "Brake Fluid (500ml DOT3)",       partCode: "FLD-BRK", price: 35.00,  isMandatory: false },
        { partID: "p13", categoryID: "cat3", partName: "Wheel Alignment & Balancing",    partCode: "SVC-ALN", price: 55.00,  isMandatory: false },
        { partID: "p14", categoryID: "cat3", partName: "Tire Rotation",                  partCode: "SVC-ROT", price: 30.00,  isMandatory: false },
        { partID: "p15", categoryID: "cat4", partName: "Shock Absorber (Front, Each)",   partCode: "SUS-SHA", price: 230.00, isMandatory: false },
        { partID: "p16", categoryID: "cat5", partName: "Car Battery (NS40)",              partCode: "BAT-NS40",price: 195.00, isMandatory: false },
        { partID: "p17", categoryID: "cat5", partName: "Car Battery (NS60)",              partCode: "BAT-NS60",price: 235.00, isMandatory: false },
        { partID: "p18", categoryID: "cat7", partName: "Wiper Blades (Pair)",             partCode: "WPR-PR",  price: 45.00,  isMandatory: false },
        { partID: "p19", categoryID: "cat7", partName: "Labour / Workshop Fee",           partCode: "SVC-LAB", price: 50.00,  isMandatory: true  }
    ]);

    // â”€â”€â”€ OFFICIAL ATIVA SERVICE SCHEDULE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    seedTable('serviceScheduleTable', [
        {
            modelID: "m4",
            mileage: 10000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 183.90,
            totalEM: 192.00
        },
        {
            modelID: "m4",
            mileage: 20000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Element, Air Refiner", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 81.00, em: 81.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.48, em: 6.48, type: "Tax" }
            ],
            totalPeninsular: 304.88,
            totalEM: 314.98
        },
        {
            modelID: "m4",
            mileage: 30000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.06,
            totalEM: 248.16
        },
        {
            modelID: "m4",
            mileage: 40000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Element S/A Air Cleaner Filter", qty: 1, peninsular: 53.80, em: 57.00, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Element, Air Refiner", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 119.00, em: 119.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 9.52, em: 9.52, type: "Tax" }
            ],
            totalPeninsular: 426.12,
            totalEM: 440.72
        },
        {
            modelID: "m4",
            mileage: 50000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.06,
            totalEM: 248.16
        },
        {
            modelID: "m4",
            mileage: 60000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Element, Air Refiner", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 81.00, em: 81.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.48, em: 6.48, type: "Tax" }
            ],
            totalPeninsular: 304.88,
            totalEM: 314.98
        },
        {
            modelID: "m4",
            mileage: 70000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.06,
            totalEM: 248.16
        },
        {
            modelID: "m4",
            mileage: 80000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Element S/A Air Cleaner Filter", qty: 1, peninsular: 53.80, em: 57.00, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Element, Air Refiner", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 119.00, em: 119.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 9.52, em: 9.52, type: "Tax" }
            ],
            totalPeninsular: 426.12,
            totalEM: 440.72
        },
        {
            modelID: "m4",
            mileage: 90000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.06,
            totalEM: 248.16
        },
        {
            modelID: "m4",
            mileage: 100000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 471.90, em: 500.10, type: "Part" },
                { name: "CVT Fluid 1.0L", qty: 3, peninsular: 140.70, em: 149.10, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.00, em: 3.20, type: "Part" },
                { name: "Drain Plug Gasket - CVT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Element, Air Refiner", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 92.00, em: 92.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.36, em: 7.36, type: "Tax" }
            ],
            totalPeninsular: 933.16,
            totalEM: 980.26
        },
        // â”€â”€â”€ OFFICIAL ALZA SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m5",
            mileage: 1000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SL 4L", qty: 1, peninsular: 80.00, em: 86.60, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 96.30,
            totalEM: 104.05
        },
        {
            modelID: "m5",
            mileage: 5000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SL 4L", qty: 1, peninsular: 80.00, em: 86.60, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 96.30,
            totalEM: 104.05
        },
        {
            modelID: "m5",
            mileage: 10000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 127.40,
            totalEM: 133.65
        },
        {
            modelID: "m5",
            mileage: 20000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 60.40, em: 66.40, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 83.00, em: 83.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.64, em: 6.64, type: "Tax" }
            ],
            totalPeninsular: 277.44,
            totalEM: 289.69
        },
        {
            modelID: "m5",
            mileage: 30000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 55.00, em: 55.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.40, em: 4.40, type: "Tax" }
            ],
            totalPeninsular: 221.80,
            totalEM: 229.05
        },
        {
            modelID: "m5",
            mileage: 40000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 19.30, em: 20.50, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 60.40, em: 66.40, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 530.04,
            totalEM: 553.59
        },
        {
            modelID: "m5",
            mileage: 40000,
            transmission: "Manual",
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 19.30, em: 20.50, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 60.40, em: 66.40, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 3, peninsular: 57.30, em: 60.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 447.64,
            totalEM: 465.29
        },
        {
            modelID: "m5",
            mileage: 50000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 185.72,
            totalEM: 191.97
        },
        {
            modelID: "m5",
            mileage: 60000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 60.40, em: 66.40, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 83.00, em: 83.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.64, em: 6.64, type: "Tax" }
            ],
            totalPeninsular: 312.44,
            totalEM: 325.69
        },
        {
            modelID: "m5",
            mileage: 70000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 185.72,
            totalEM: 191.97
        },
        {
            modelID: "m5",
            mileage: 80000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 19.30, em: 20.50, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 60.40, em: 66.40, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 530.04,
            totalEM: 553.59
        },
        {
            modelID: "m5",
            mileage: 80000,
            transmission: "Manual",
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 19.30, em: 20.50, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 60.40, em: 66.40, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 3, peninsular: 57.30, em: 60.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 447.64,
            totalEM: 465.29
        },
        {
            modelID: "m5",
            mileage: 90000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 55.00, em: 55.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.40, em: 4.40, type: "Tax" }
            ],
            totalPeninsular: 221.80,
            totalEM: 229.05
        },
        {
            modelID: "m5",
            mileage: 100000,
            items: [
                { name: "Perodua Engine Oil Semi Syn 5W-30 SM 4L", qty: 1, peninsular: 111.10, em: 116.20, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 60.40, em: 66.40, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 83.00, em: 83.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.64, em: 6.64, type: "Tax" }
            ],
            totalPeninsular: 277.44,
            totalEM: 289.69
        },
        // â”€â”€â”€ PERODUA AXIA OFFICIAL SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m1",
            mileage: 10000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 156.80,
            totalEM: 165.85
        },
        {
            modelID: "m1",
            mileage: 20000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 285.26,
            totalEM: 297.01
        },
        {
            modelID: "m1",
            mileage: 30000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 55.00, em: 55.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.40, em: 4.40, type: "Tax" }
            ],
            totalPeninsular: 251.20,
            totalEM: 261.25
        },
        {
            modelID: "m1",
            mileage: 40000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 579.34,
            totalEM: 604.49
        },
        {
            modelID: "m1",
            mileage: 40000,
            transmission: "Manual",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 477.84,
            totalEM: 496.19
        },
        {
            modelID: "m1",
            mileage: 50000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 215.12,
            totalEM: 224.17
        },
        {
            modelID: "m1",
            mileage: 60000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 320.26,
            totalEM: 333.01
        },
        {
            modelID: "m1",
            mileage: 70000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 215.12,
            totalEM: 224.17
        },
        {
            modelID: "m1",
            mileage: 80000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 579.34,
            totalEM: 604.49
        },
        {
            modelID: "m1",
            mileage: 80000,
            transmission: "Manual",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 477.84,
            totalEM: 496.19
        },
        {
            modelID: "m1",
            mileage: 90000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 55.00, em: 55.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.40, em: 4.40, type: "Tax" }
            ],
            totalPeninsular: 251.20,
            totalEM: 261.25
        },
        {
            modelID: "m1",
            mileage: 100000,
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 285.26,
            totalEM: 297.01
        },
        // â”€â”€â”€ OFFICIAL PERODUA AXIA E (MANUAL TRANSMISSION) SERVICE SCHEDULES â”€
        {
            modelID: "m1",
            mileage: 10000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 156.80,
            totalEM: 165.85
        },
        {
            modelID: "m1",
            mileage: 20000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plugs", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 320.26,
            totalEM: 333.01
        },
        {
            modelID: "m1",
            mileage: 30000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 215.12,
            totalEM: 224.17
        },
        {
            modelID: "m1",
            mileage: 40000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Element Sub-Assy, Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Brake Fluid 1.0l", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 138.00, em: 138.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.04, em: 11.04, type: "Tax" }
            ],
            totalPeninsular: 466.84,
            totalEM: 484.19
        },
        {
            modelID: "m1",
            mileage: 50000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 215.12,
            totalEM: 224.17
        },
        {
            modelID: "m1",
            mileage: 60000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plugs", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 320.26,
            totalEM: 333.01
        },
        {
            modelID: "m1",
            mileage: 70000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 215.12,
            totalEM: 224.17
        },
        {
            modelID: "m1",
            mileage: 80000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Element Sub-Assy, Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Perodua 80W GL4 1L", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Drain Plug Gasket - Manual", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 143.00, em: 143.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 11.44, em: 11.44, type: "Tax" }
            ],
            totalPeninsular: 512.84,
            totalEM: 532.19
        },
        {
            modelID: "m1",
            mileage: 90000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 54.00, em: 54.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.32, em: 4.32, type: "Tax" }
            ],
            totalPeninsular: 215.12,
            totalEM: 224.17
        },
        {
            modelID: "m1",
            mileage: 100000,
            transmission: "Manual",
            variantSubstr: "E MT",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plugs", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 320.26,
            totalEM: 333.01
        },
        // â”€â”€â”€ OFFICIAL NEW AXIA (CVT) SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m1",
            mileage: 10000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 156.80,
            totalEM: 165.85
        },
        {
            modelID: "m1",
            mileage: 20000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plugs", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 89.00, em: 89.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.12, em: 7.12, type: "Tax" }
            ],
            totalPeninsular: 333.22,
            totalEM: 345.97
        },
        {
            modelID: "m1",
            mileage: 30000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 65.00, em: 65.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 5.20, em: 5.20, type: "Tax" }
            ],
            totalPeninsular: 227.00,
            totalEM: 236.05
        },
        {
            modelID: "m1",
            mileage: 40000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Element Sub-Assy, Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Brake Fluid 1.0l", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 99.00, em: 99.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.92, em: 7.92, type: "Tax" }
            ],
            totalPeninsular: 424.72,
            totalEM: 442.07
        },
        {
            modelID: "m1",
            mileage: 50000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 65.00, em: 65.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 5.20, em: 5.20, type: "Tax" }
            ],
            totalPeninsular: 227.00,
            totalEM: 236.05
        },
        {
            modelID: "m1",
            mileage: 60000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plugs", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 89.00, em: 89.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.12, em: 7.12, type: "Tax" }
            ],
            totalPeninsular: 333.22,
            totalEM: 345.97
        },
        {
            modelID: "m1",
            mileage: 70000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 65.00, em: 65.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 5.20, em: 5.20, type: "Tax" }
            ],
            totalPeninsular: 227.00,
            totalEM: 236.05
        },
        {
            modelID: "m1",
            mileage: 80000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Element Sub-Assy, Air Cleaner Filter", qty: 1, peninsular: 54.30, em: 57.60, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Brake Fluid 1.0l", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 99.00, em: 99.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.92, em: 7.92, type: "Tax" }
            ],
            totalPeninsular: 424.72,
            totalEM: 442.07
        },
        {
            modelID: "m1",
            mileage: 90000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 65.00, em: 65.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 5.20, em: 5.20, type: "Tax" }
            ],
            totalPeninsular: 227.00,
            totalEM: 236.05
        },
        {
            modelID: "m1",
            mileage: 100000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 SN-3.0L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plugs", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "CVT Fluid 1.0L", qty: 3, peninsular: 140.70, em: 149.10, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Drain Plug Gasket - CVT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Cabin Filter", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 96.00, em: 96.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.68, em: 7.68, type: "Tax" }
            ],
            totalPeninsular: 485.28,
            totalEM: 506.83
        },
        // â”€â”€â”€ OFFICIAL PERODUA MYVI (CVT) 1300CC SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m3",
            mileage: 10000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 177.40,
            totalEM: 185.25
        },
        {
            modelID: "m3",
            mileage: 20000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 81.00, em: 81.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.48, em: 6.48, type: "Tax" }
            ],
            totalPeninsular: 300.68,
            totalEM: 310.63
        },
        {
            modelID: "m3",
            mileage: 30000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 233.56,
            totalEM: 241.41
        },
        {
            modelID: "m3",
            mileage: 40000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Element S/A Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 119.00, em: 119.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 9.52, em: 9.52, type: "Tax" }
            ],
            totalPeninsular: 431.02,
            totalEM: 448.57
        },
        {
            modelID: "m3",
            mileage: 50000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 233.56,
            totalEM: 241.41
        },
        {
            modelID: "m3",
            mileage: 60000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 81.00, em: 81.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.48, em: 6.48, type: "Tax" }
            ],
            totalPeninsular: 300.68,
            totalEM: 310.63
        },
        {
            modelID: "m3",
            mileage: 70000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 233.56,
            totalEM: 241.41
        },
        {
            modelID: "m3",
            mileage: 80000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Element S/A Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 119.00, em: 119.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 9.52, em: 9.52, type: "Tax" }
            ],
            totalPeninsular: 431.02,
            totalEM: 448.57
        },
        {
            modelID: "m3",
            mileage: 90000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 233.56,
            totalEM: 241.41
        },
        {
            modelID: "m3",
            mileage: 100000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 263.60, em: 279.60, type: "Part" },
                { name: "CVT Fluid 1.0L", qty: 3, peninsular: 140.70, em: 149.10, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Drain Plug Gasket - CVT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 92.00, em: 92.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.36, em: 7.36, type: "Tax" }
            ],
            totalPeninsular: 720.66,
            totalEM: 755.41
        },
        // â”€â”€â”€ OFFICIAL PERODUA MYVI (4AT/MT) 1300CC SERVICE SCHEDULES â”€â”€â”€â”€â”€
        {
            modelID: "m3",
            mileage: 10000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 177.40,
            totalEM: 185.25
        },
        {
            modelID: "m3",
            mileage: 20000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m3",
            mileage: 30000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 279.08,
            totalEM: 289.03
        },
        {
            modelID: "m3",
            mileage: 40000,
            transmission: "Automatic",
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 587.00,
            totalEM: 611.25
        },
        {
            modelID: "m3",
            mileage: 40000,
            transmission: "Manual",
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 485.50,
            totalEM: 502.95
        },
        {
            modelID: "m3",
            mileage: 50000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m3",
            mileage: 60000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 279.08,
            totalEM: 289.03
        },
        {
            modelID: "m3",
            mileage: 70000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m3",
            mileage: 80000,
            transmission: "Automatic",
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 587.00,
            totalEM: 611.25
        },
        {
            modelID: "m3",
            mileage: 80000,
            transmission: "Manual",
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 485.50,
            totalEM: 502.95
        },
        {
            modelID: "m3",
            mileage: 90000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 279.08,
            totalEM: 289.03
        },
        {
            modelID: "m3",
            mileage: 100000,
            variantSubstr: "G",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 263.60, em: 279.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 524.16,
            totalEM: 548.01
        },
        // â”€â”€â”€ OFFICIAL PERODUA MYVI (CVT) 1500CC SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m3",
            mileage: 10000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 184.70,
            totalEM: 193.00
        },
        {
            modelID: "m3",
            mileage: 20000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 81.00, em: 81.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.48, em: 6.48, type: "Tax" }
            ],
            totalPeninsular: 307.98,
            totalEM: 318.38
        },
        {
            modelID: "m3",
            mileage: 30000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.86,
            totalEM: 249.16
        },
        {
            modelID: "m3",
            mileage: 40000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Element S/A Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 119.00, em: 119.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 9.52, em: 9.52, type: "Tax" }
            ],
            totalPeninsular: 438.32,
            totalEM: 456.32
        },
        {
            modelID: "m3",
            mileage: 50000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.86,
            totalEM: 249.16
        },
        {
            modelID: "m3",
            mileage: 60000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 81.00, em: 81.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.48, em: 6.48, type: "Tax" }
            ],
            totalPeninsular: 307.98,
            totalEM: 318.38
        },
        {
            modelID: "m3",
            mileage: 70000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.86,
            totalEM: 249.16
        },
        {
            modelID: "m3",
            mileage: 80000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Element S/A Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 119.00, em: 119.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 9.52, em: 9.52, type: "Tax" }
            ],
            totalPeninsular: 438.32,
            totalEM: 456.32
        },
        {
            modelID: "m3",
            mileage: 90000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 52.00, em: 52.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.16, em: 4.16, type: "Tax" }
            ],
            totalPeninsular: 240.86,
            totalEM: 249.16
        },
        {
            modelID: "m3",
            mileage: 100000,
            transmission: "Automatic",
            variantSubstr: "CVT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 263.60, em: 279.60, type: "Part" },
                { name: "CVT Fluid 1.0L", qty: 3, peninsular: 140.70, em: 149.10, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Drain Plug Gasket - CVT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Filter Sub Assy, Air Refiner", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 92.00, em: 92.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.36, em: 7.36, type: "Tax" }
            ],
            totalPeninsular: 727.96,
            totalEM: 763.16
        },
        // â”€â”€â”€ OFFICIAL PERODUA MYVI (4AT) 1500CC SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m3",
            mileage: 10000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 177.40,
            totalEM: 185.25
        },
        {
            modelID: "m3",
            mileage: 20000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m3",
            mileage: 30000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 279.08,
            totalEM: 289.03
        },
        {
            modelID: "m3",
            mileage: 40000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 587.00,
            totalEM: 611.25
        },
        {
            modelID: "m3",
            mileage: 50000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m3",
            mileage: 60000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 279.08,
            totalEM: 289.03
        },
        {
            modelID: "m3",
            mileage: 70000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m3",
            mileage: 80000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 587.00,
            totalEM: 611.25
        },
        {
            modelID: "m3",
            mileage: 90000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 279.08,
            totalEM: 289.03
        },
        {
            modelID: "m3",
            mileage: 100000,
            transmission: "Automatic",
            variantSubstr: "AT 1.5",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 263.60, em: 279.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 524.16,
            totalEM: 548.01
        },
        // â”€â”€â”€ OFFICIAL PERODUA BEZZA 1000CC SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m2",
            mileage: 10000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 156.80,
            totalEM: 165.85
        },
        {
            modelID: "m2",
            mileage: 20000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 285.26,
            totalEM: 297.01
        },
        {
            modelID: "m2",
            mileage: 30000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 72.00, em: 72.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 5.76, em: 5.76, type: "Tax" }
            ],
            totalPeninsular: 269.56,
            totalEM: 279.61
        },
        {
            modelID: "m2",
            mileage: 40000,
            transmission: "Automatic",
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.10, em: 68.30, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 2, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 193.00, em: 193.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 15.44, em: 15.44, type: "Tax" }
            ],
            totalPeninsular: 641.14,
            totalEM: 669.19
        },
        {
            modelID: "m2",
            mileage: 40000,
            transmission: "Manual",
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.10, em: 68.30, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 193.00, em: 193.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 15.44, em: 15.44, type: "Tax" }
            ],
            totalPeninsular: 539.64,
            totalEM: 560.89
        },
        {
            modelID: "m2",
            mileage: 50000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 55.00, em: 55.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.40, em: 4.40, type: "Tax" }
            ],
            totalPeninsular: 216.20,
            totalEM: 225.25
        },
        {
            modelID: "m2",
            mileage: 60000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 94.00, em: 94.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 7.52, em: 7.52, type: "Tax" }
            ],
            totalPeninsular: 338.62,
            totalEM: 351.37
        },
        {
            modelID: "m2",
            mileage: 70000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 55.00, em: 55.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.40, em: 4.40, type: "Tax" }
            ],
            totalPeninsular: 216.20,
            totalEM: 225.25
        },
        {
            modelID: "m2",
            mileage: 80000,
            transmission: "Automatic",
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.10, em: 68.30, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 2, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 193.00, em: 193.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 15.44, em: 15.44, type: "Tax" }
            ],
            totalPeninsular: 641.14,
            totalEM: 669.19
        },
        {
            modelID: "m2",
            mileage: 80000,
            transmission: "Manual",
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.10, em: 68.30, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 193.00, em: 193.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 15.44, em: 15.44, type: "Tax" }
            ],
            totalPeninsular: 539.64,
            totalEM: 560.89
        },
        {
            modelID: "m2",
            mileage: 90000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 72.00, em: 72.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 5.76, em: 5.76, type: "Tax" }
            ],
            totalPeninsular: 269.56,
            totalEM: 279.61
        },
        {
            modelID: "m2",
            mileage: 100000,
            variantSubstr: "1.0",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 FS 3L", qty: 1, peninsular: 140.50, em: 148.40, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 3, peninsular: 45.30, em: 48.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 285.26,
            totalEM: 297.01
        },
        // â”€â”€â”€ OFFICIAL PERODUA BEZZA 1300CC SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m2",
            mileage: 10000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 177.40,
            totalEM: 185.25
        },
        {
            modelID: "m2",
            mileage: 20000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m2",
            mileage: 30000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 278.28,
            totalEM: 287.13
        },
        {
            modelID: "m2",
            mileage: 40000,
            transmission: "Automatic",
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 136.00, em: 144.20, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 660.10,
            totalEM: 686.25
        },
        {
            modelID: "m2",
            mileage: 40000,
            transmission: "Manual",
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 136.00, em: 144.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 558.60,
            totalEM: 577.95
        },
        {
            modelID: "m2",
            mileage: 50000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m2",
            mileage: 60000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 278.28,
            totalEM: 287.13
        },
        {
            modelID: "m2",
            mileage: 70000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 224.92,
            totalEM: 232.77
        },
        {
            modelID: "m2",
            mileage: 80000,
            transmission: "Automatic",
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 136.00, em: 144.20, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 3, peninsular: 138.30, em: 146.70, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 660.10,
            totalEM: 686.25
        },
        {
            modelID: "m2",
            mileage: 80000,
            transmission: "Manual",
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 136.00, em: 144.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Gear Oil GL 4 80W", qty: 2, peninsular: 38.20, em: 40.00, type: "Part" },
                { name: "Drain Plug Gasket - MT", qty: 2, peninsular: 2.40, em: 2.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 558.60,
            totalEM: 577.95
        },
        {
            modelID: "m2",
            mileage: 90000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Air Filter (Cabin Filter)", qty: 1, peninsular: 35.00, em: 36.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 278.28,
            totalEM: 287.13
        },
        {
            modelID: "m2",
            mileage: 100000,
            variantSubstr: "1.3",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 12.50, em: 13.25, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 263.60, em: 279.40, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 524.16,
            totalEM: 547.81
        },
        // â”€â”€â”€ OFFICIAL PERODUA ARUZ 1500CC SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        {
            modelID: "m6",
            mileage: 10000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
            ],
            totalPeninsular: 184.70,
            totalEM: 193.00
        },
        {
            modelID: "m6",
            mileage: 20000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 232.22,
            totalEM: 240.52
        },
        {
            modelID: "m6",
            mileage: 30000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 286.38,
            totalEM: 296.78
        },
        {
            modelID: "m6",
            mileage: 40000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Gear Oil GL 5 90", qty: 3, peninsular: 61.50, em: 64.20, type: "Part" },
                { name: "Gasket - Rear Differential", qty: 2, peninsular: 23.40, em: 25.80, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 2, peninsular: 92.20, em: 97.80, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 633.10,
            totalEM: 660.10
        },
        {
            modelID: "m6",
            mileage: 50000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 232.22,
            totalEM: 240.52
        },
        {
            modelID: "m6",
            mileage: 60000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 286.38,
            totalEM: 296.78
        },
        {
            modelID: "m6",
            mileage: 70000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 44.00, em: 44.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 3.52, em: 3.52, type: "Tax" }
            ],
            totalPeninsular: 232.22,
            totalEM: 240.52
        },
        {
            modelID: "m6",
            mileage: 80000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Air Cleaner Filter", qty: 1, peninsular: 62.90, em: 69.20, type: "Part" },
                { name: "Gear Oil GL 5 90", qty: 3, peninsular: 61.50, em: 64.20, type: "Part" },
                { name: "Gasket - Rear Differential", qty: 2, peninsular: 23.40, em: 25.80, type: "Part" },
                { name: "Auto Transmission Oil ATF D3 SP", qty: 2, peninsular: 92.20, em: 97.80, type: "Part" },
                { name: "Drain Plug Gasket - AT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 165.00, em: 165.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 13.20, em: 13.20, type: "Tax" }
            ],
            totalPeninsular: 633.10,
            totalEM: 660.10
        },
        {
            modelID: "m6",
            mileage: 90000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Air Refiner (Cabin Filter)", qty: 1, peninsular: 35.80, em: 37.90, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 61.00, em: 61.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 4.88, em: 4.88, type: "Tax" }
            ],
            totalPeninsular: 286.38,
            totalEM: 296.78
        },
        {
            modelID: "m6",
            mileage: 100000,
            transmission: "Automatic",
            items: [
                { name: "Perodua Engine Oil Fully Syn 0W-20 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                { name: "Engine Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                { name: "Spark Plug", qty: 4, peninsular: 263.60, em: 279.60, type: "Part" },
                { name: "Labour Charges", qty: 1, peninsular: 77.00, em: 77.00, type: "Labour" },
                { name: "SST (8%)", qty: 1, peninsular: 6.16, em: 6.16, type: "Tax" }
            ],
            totalPeninsular: 531.46,
            totalEM: 555.76
        }
    ]);

    // â”€â”€â”€ OFFICIAL TRAZ (CVT) 1500CC SERVICE SCHEDULES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // NOTE: Traz uses its own seedTable call as it's a new model
    (function () {
        const existing = localStorage.getItem('serviceScheduleTable');
        if (!existing) return; // will be seeded by the main seedTable above
        const arr = JSON.parse(existing);
        const hasTrazData = arr.some(s => s.modelID === 'm13' && s.mileage === 100000 && s.totalPeninsular === 769.38);
        if (!hasTrazData) {
            const trazSchedules = [
                {
                    modelID: "m13",
                    mileage: 10000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Labour Charges", qty: 0, peninsular: 0.00, em: 0.00, type: "Labour" },
                        { name: "SST (8%)", qty: 0, peninsular: 0.00, em: 0.00, type: "Tax" }
                    ],
                    totalPeninsular: 184.70,
                    totalEM: 193.00
                },
                {
                    modelID: "m13",
                    mileage: 20000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Cabin Filter", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 113.16, em: 113.16, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 9.05, em: 9.05, type: "Tax" }
                    ],
                    totalPeninsular: 340.41,
                    totalEM: 350.71
                },
                {
                    modelID: "m13",
                    mileage: 30000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 66.24, em: 66.24, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 5.30, em: 5.30, type: "Tax" }
                    ],
                    totalPeninsular: 256.24,
                    totalEM: 264.54
                },
                {
                    modelID: "m13",
                    mileage: 40000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Elements S/A Air Cleaner Filter", qty: 1, peninsular: 53.80, em: 57.00, type: "Part" },
                        { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                        { name: "Cabin Filter", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 128.80, em: 128.80, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 10.30, em: 10.30, type: "Tax" }
                    ],
                    totalPeninsular: 437.50,
                    totalEM: 452.30
                },
                {
                    modelID: "m13",
                    mileage: 50000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 66.24, em: 66.24, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 5.30, em: 5.30, type: "Tax" }
                    ],
                    totalPeninsular: 256.24,
                    totalEM: 264.54
                },
                {
                    modelID: "m13",
                    mileage: 60000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Cabin Filter", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 113.16, em: 113.16, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 9.05, em: 9.05, type: "Tax" }
                    ],
                    totalPeninsular: 340.41,
                    totalEM: 350.71
                },
                {
                    modelID: "m13",
                    mileage: 70000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 66.24, em: 66.24, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 5.30, em: 5.30, type: "Tax" }
                    ],
                    totalPeninsular: 256.24,
                    totalEM: 264.54
                },
                {
                    modelID: "m13",
                    mileage: 80000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Elements S/A Air Cleaner Filter", qty: 1, peninsular: 53.80, em: 57.00, type: "Part" },
                        { name: "Brake Fluid 1.0L", qty: 1, peninsular: 26.40, em: 27.70, type: "Part" },
                        { name: "Cabin Filter", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 128.80, em: 128.80, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 10.30, em: 10.30, type: "Tax" }
                    ],
                    totalPeninsular: 437.50,
                    totalEM: 452.30
                },
                {
                    modelID: "m13",
                    mileage: 90000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 66.24, em: 66.24, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 5.30, em: 5.30, type: "Tax" }
                    ],
                    totalPeninsular: 256.24,
                    totalEM: 264.54
                },
                {
                    modelID: "m13",
                    mileage: 100000,
                    transmission: "Automatic",
                    items: [
                        { name: "Engine Oil (PEO SN 0W-20) 3.5L", qty: 1, peninsular: 161.10, em: 167.80, type: "Part" },
                        { name: "Drain Plug Gasket - Engine Oil", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Element S/A Oil Filter", qty: 1, peninsular: 19.80, em: 21.00, type: "Part" },
                        { name: "CVT Fluid 1.0L", qty: 3, peninsular: 140.70, em: 149.10, type: "Part" },
                        { name: "Drain Plug Gasket - CVT", qty: 1, peninsular: 3.80, em: 4.20, type: "Part" },
                        { name: "Spark Plug", qty: 4, peninsular: 263.60, em: 279.60, type: "Part" },
                        { name: "Cabin Filter", qty: 1, peninsular: 33.50, em: 35.50, type: "Part" },
                        { name: "Labour Charges", qty: 1, peninsular: 132.48, em: 132.48, type: "Labour" },
                        { name: "SST (8%)", qty: 1, peninsular: 10.60, em: 10.60, type: "Tax" }
                    ],
                    totalPeninsular: 769.38,
                    totalEM: 804.48
                }
            ];
            arr.push(...trazSchedules);
            localStorage.setItem('serviceScheduleTable', JSON.stringify(arr));
        }
    })();

    // Ensure stale local storage table is deleted to force refresh
    try {
        const testVar = JSON.parse(localStorage.getItem('carVariantTable')) || [];
        const hasOldAlzaVariant = testVar.some(v => v.modelID === 'm5' && v.variantName.includes('AT'));
        const hasMyviGAT = testVar.some(v => v.variantID === 'v36');
        const hasMyviAVAT = testVar.some(v => v.variantID === 'v37');
        const hasTrazVariant = testVar.some(v => v.variantID === 'v38');
        if (!hasOldAlzaVariant || !hasMyviGAT || !hasMyviAVAT || !hasTrazVariant) {
            localStorage.removeItem('carVariantTable');
        }

        const test = JSON.parse(localStorage.getItem('serviceScheduleTable')) || [];
        const hasAlzaData = test.some(s => s.modelID === 'm5');
        const hasAxiaData = test.some(s => s.modelID === 'm1');
        const isAxiaUpToDate = test.some(s => s.modelID === 'm1' && s.mileage === 60000 && s.totalPeninsular === 320.26);
        const isAlzaUpToDate = test.some(s => s.modelID === 'm5' && s.mileage === 40000 && s.transmission === 'Automatic' && s.totalPeninsular === 530.04);
        const isMyvi13UpToDate = test.some(s => s.modelID === 'm3' && s.mileage === 100000 && s.variantSubstr === 'CVT 1.3' && s.totalPeninsular === 720.66);
        const isMyviGUpToDate = test.some(s => s.modelID === 'm3' && s.mileage === 40000 && s.variantSubstr === 'G' && s.transmission === 'Automatic' && s.totalPeninsular === 587.00);
        const isMyviG60kUpToDate = test.some(s => s.modelID === 'm3' && s.mileage === 60000 && s.variantSubstr === 'G' && s.totalPeninsular === 279.08);
        const isMyviG100kUpToDate = test.some(s => s.modelID === 'm3' && s.mileage === 100000 && s.variantSubstr === 'G' && s.totalEM === 548.01);
        const isMyviCVT15UpToDate = test.some(s => s.modelID === 'm3' && s.mileage === 100000 && s.variantSubstr === 'CVT 1.5' && s.totalPeninsular === 727.96);
        const isMyviAT15UpToDate = test.some(s => s.modelID === 'm3' && s.mileage === 40000 && s.variantSubstr === 'AT 1.5' && s.totalPeninsular === 587.00);
        const isBezza10UpToDate = test.some(s => s.modelID === 'm2' && s.mileage === 100000 && s.variantSubstr === '1.0' && s.totalPeninsular === 285.26);
        const isBezza60kUpToDate = test.some(s => s.modelID === 'm2' && s.mileage === 60000 && s.variantSubstr === '1.0' && s.totalPeninsular === 338.62);
        const isBezza13UpToDate = test.some(s => s.modelID === 'm2' && s.mileage === 100000 && s.variantSubstr === '1.3' && s.totalEM === 547.81) && test.some(s => s.modelID === 'm2' && s.mileage === 60000 && s.variantSubstr === '1.3' && s.totalPeninsular === 278.28);
        const hasAruzData = test.some(s => s.modelID === 'm6');
        const isAruzUpToDate = test.some(s => s.modelID === 'm6' && s.mileage === 100000 && s.totalPeninsular === 531.46);
        const isAxiaEUpToDate = test.some(s => s.modelID === 'm1' && s.mileage === 80000 && s.variantSubstr === 'E MT' && s.totalPeninsular === 512.84);
        const isAxiaCVTUpToDate = test.some(s => s.modelID === 'm1' && s.mileage === 100000 && s.variantSubstr === 'CVT 1.0' && s.totalPeninsular === 485.28);
        if (!hasAlzaData || !hasAxiaData || !isAxiaUpToDate || !isAlzaUpToDate || !isMyvi13UpToDate || !isMyviGUpToDate || !isMyviG60kUpToDate || !isMyviG100kUpToDate || !isMyviCVT15UpToDate || !isMyviAT15UpToDate || !isBezza10UpToDate || !isBezza60kUpToDate || !isBezza13UpToDate || !hasAruzData || !isAruzUpToDate || !isAxiaEUpToDate || !isAxiaCVTUpToDate) {
            localStorage.removeItem('serviceScheduleTable');
        }

        // Force refresh Knowledge Hub tables if they are empty or incomplete
        const testKB = JSON.parse(localStorage.getItem('knowledgeBlockTable')) || [];
        const testCat = JSON.parse(localStorage.getItem('serviceCategoryTable')) || [];
        const hasNewImage = testCat.some(c => c.categoryID === 'cat10' && c.imagePath === 'images/lighting.jpg');
        if (testKB.length < 42 || !hasNewImage) {
            localStorage.removeItem('knowledgeBlockTable');
            localStorage.removeItem('serviceCategoryTable');
        }
    } catch(e) {
        localStorage.removeItem('serviceScheduleTable');
        localStorage.removeItem('knowledgeBlockTable');
        localStorage.removeItem('serviceCategoryTable');
    }

    // â”€â”€â”€ EMPTY TABLES (created if absent) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    seedTable('quotationTable',     []);
    seedTable('quotationPartTable', []);
    seedTable('serviceTable',       []);

    // â”€â”€â”€ MAINTENANCE KNOWLEDGE HUB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Upgrade to serviceCategoryTable
const serviceCategoryTable = [
    { categoryID: "cat1", title: "engine", imagePath: "images/engine.jpg" },
    { categoryID: "cat2", title: "brake", imagePath: "images/brake.jpg" },
    { categoryID: "cat3", title: "wheels", imagePath: "images/wheels.png" },
    { categoryID: "cat4", title: "suspension", imagePath: "images/suspension.jpg" },
    { categoryID: "cat5", title: "battery", imagePath: "images/battery.jpg" },
    { categoryID: "cat6", title: "aircond", imagePath: "images/ac.png" },
    { categoryID: "cat8", title: "electrical", imagePath: "images/electrical.png" },
    { categoryID: "cat9", title: "exhaust", imagePath: "images/exhaust.png" },
    { categoryID: "cat10", title: "lighting", imagePath: "images/lighting.jpg" },
    { categoryID: "cat7", title: "general", imagePath: "images/general.png" }
];

// Expanded and enriched knowledgeBlockTable
const knowledgeBlockTable = [
    // === ENGINE SYSTEM (cat1) ===
    {
        blockID: "b1",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Engine Oil (The Blood)",
        description: "Engine oil lubricates the engine's moving parts, reducing friction, cooling critical components, and cleaning away engine debris.",
        whyItMatters: "Metal-on-metal friction inside an engine generates intense heat. Without clean oil, components like pistons and camshafts will wear rapidly, overheat, and eventually seize, causing complete engine failure that costs thousands of ringgit to rebuild.",
        warningSigns: [
            "Low engine oil warning light illuminated on the dashboard",
            "Oil looks dark, black, or gritty on the dipstick (should be transparent amber)",
            "Engine makes loud ticking or knocking noises at cold start",
            "Burning oil smell inside or outside the cabin",
            "Blue-tinted smoke emerging from the exhaust pipe"
        ],
        maintenanceTip: "Check oil level monthly using the dipstick. For Perodua models, fully synthetic oil (0W-20) should be changed every 10,000 km or 6 months. Semi-synthetic (5W-30) should be changed every 5,000 km or 3 months.",
        didYouKnow: "Starting your car with insufficient oil causes more wear in 10 seconds than driving 500 kilometers on the highway with healthy oil.",
        costEstimate: "RM 80 (Semi-Syn) to RM 180 (Fully-Syn with filter)",
        difficultyLevel: "Easy",
        urgency: "Critical"
    },
    {
        blockID: "b2",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Coolant (The Sweat)",
        description: "Coolant is a mixture of water and antifreeze that circulates through the engine and radiator to absorb and dissipate heat.",
        whyItMatters: "An engine operates best within a strict temperature range. If the coolant leaks or degrades, heat builds up rapidly. Overheating can warp the engine head, blow the head gasket, and mix oil with water, resulting in catastrophic engine failure.",
        warningSigns: [
            "Temperature gauge needle creeping into the red zone",
            "Sweet, syrupy smell near the front of the car or from the vents",
            "Puddles of bright green, red, or orange fluid under the engine bay",
            "Steam or smoke pouring out from under the hood",
            "Heater stops blowing warm air inside the cabin"
        ],
        maintenanceTip: "Never open the radiator cap when the engine is hot! Check the plastic coolant reservoir tank monthly to ensure the fluid level is between 'MIN' and 'MAX'. Replace Perodua Long Life Coolant every 40,000 km or 2 years.",
        didYouKnow: "Modern car coolant contains special bittering agents to prevent pets and wildlife from drinking it, as its sweet taste is highly toxic.",
        costEstimate: "RM 30 to RM 70",
        difficultyLevel: "Moderate",
        urgency: "Critical"
    },
    {
        blockID: "b3",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Spark Plugs",
        description: "Spark plugs provide the electrical spark that ignites the air-fuel mixture inside the engine cylinders, generating power.",
        whyItMatters: "Healthy spark plugs ensure optimal combustion. When spark plugs wear out, the engine misfires, leading to rough idling, high fuel consumption, loss of power, and potential damage to the expensive catalytic converter due to unburnt fuel.",
        warningSigns: [
            "Engine has difficulty starting, especially in cold mornings",
            "Rough, shaky idling or engine vibrations at stoplights",
            "Slow acceleration and noticeably reduced engine power",
            "Frequent engine misfires (feels like a sudden jerking or sputtering)",
            "A sudden, severe drop in fuel economy (using more petrol than usual)"
        ],
        maintenanceTip: "For Perodua models like Axia, Bezza, and Myvi, standard nickel spark plugs should be replaced every 20,000 km. If your variant uses iridium spark plugs (like the Ativa or Myvi AV), they can last up to 100,000 km.",
        didYouKnow: "A single spark plug in a 4-cylinder engine fires about 2,000 times per minute while driving, which means it sparks millions of times over its lifespan!",
        costEstimate: "RM 45 (Standard Set of 3) to RM 470 (Iridium Set for Ativa)",
        difficultyLevel: "Moderate",
        urgency: "Important"
    },
    {
        blockID: "b15",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Timing Belt / Chain",
        description: "The timing belt or chain synchronizes the rotation of the crankshaft and camshaft so the engine valves open and close at the perfect time.",
        whyItMatters: "Most Perodua engines are 'interference' engines. If the timing belt snaps while driving, the pistons will slam into the open valves at high speed, instantly destroying the internal engine components and requiring a full engine replacement.",
        warningSigns: [
            "High-pitched squealing or ticking noise coming from the front engine cover",
            "Engine misfires or fails to start at all",
            "Engine vibrates excessively while driving",
            "Oil leaking from the front cover area onto the belts",
            "Loud clanking noise indicating a stretched timing chain (in chain-driven models)"
        ],
        maintenanceTip: "Older Perodua models (like Alza Old or Viva) use rubber timing belts that MUST be replaced strictly every 80,000 to 100,000 km. Newer models (Myvi Gen 3, Bezza, Axia) use metal timing chains which generally last the lifetime of the vehicle if engine oil is changed regularly.",
        didYouKnow: "A timing chain is bathed in engine oil, which is why keeping your engine oil clean is the key to preventing the timing chain from stretching or breaking.",
        costEstimate: "RM 180 to RM 350 (Timing Belt Kit)",
        difficultyLevel: "Professional Only",
        urgency: "Critical"
    },
    {
        blockID: "b16",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Radiator & Cooling Fan",
        description: "The radiator cools the hot coolant flowing out of the engine, assisted by an electric cooling fan that pulls air through the radiator core.",
        whyItMatters: "If the radiator gets clogged with dirt or the electric fan motor burns out, the coolant cannot release its heat. This leads to immediate overheating even if the coolant level is full, especially when stuck in Malaysian traffic jams.",
        warningSigns: [
            "Temperature spikes rapidly when idling in traffic, but drops when the car is moving fast",
            "Radiator cooling fan is extremely loud or doesn't spin at all when engine is hot",
            "Brown, muddy-looking sludge inside the radiator cap instead of clean liquid",
            "Visible cooling fins on the front radiator are bent, clogged, or leaking",
            "Puddles of coolant under the front bumper area"
        ],
        maintenanceTip: "Periodically spray low-pressure water through the front grille to clear out leaves, insects, and road grime from the radiator fins. Replace the radiator cap if the rubber seal is cracked or hardened, as a faulty cap cannot maintain proper system pressure.",
        didYouKnow: "The radiator cap acts as a pressure relief valve. By keeping the cooling system under pressure, it actually raises the boiling point of the coolant to over 120Â°C!",
        costEstimate: "RM 150 to RM 380 (Radiator replacement)",
        difficultyLevel: "Professional Only",
        urgency: "Critical"
    },
    {
        blockID: "b17",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Engine Air Filter",
        description: "The engine air filter traps dust, dirt, and airborne particles before they can enter the engine cylinders and cause internal wear.",
        whyItMatters: "An engine needs to breathe massive amounts of clean air to burn fuel efficiently. A clogged filter suffocates the engine, forcing it to burn more fuel, reducing acceleration, and potentially letting abrasive dirt scratch the cylinder walls.",
        warningSigns: [
            "Reduced acceleration response and noticeable lack of power",
            "Black smoke or strong petrol smell coming from the exhaust pipe",
            "Engine idling roughly or struggling to maintain steady RPM",
            "The filter element looks dark gray, dusty, or clogged with debris",
            "Check Engine light is activated due to improper air-to-fuel ratio"
        ],
        maintenanceTip: "Remove the air filter every 5,000 km and gently tap it to shake off loose dust, or blow it clean with low-pressure air. Replace the filter element strictly every 20,000 to 30,000 km, especially if you drive in dusty urban environments.",
        didYouKnow: "An engine consumes about 10,000 liters of air for every 1 liter of petrol it burns, making the air filter's job incredibly demanding!",
        costEstimate: "RM 20 to RM 65 (depending on Perodua model)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },
    {
        blockID: "b18",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Transmission Fluid (CVT / AT)",
        description: "Transmission fluid lubricates and cools the gears, shafts, and clutches inside the gearbox, enabling smooth gear shifts and power transfer.",
        whyItMatters: "Modern Peroduas use either automatic gearboxes or advanced Continuously Variable Transmissions (CVT). If the transmission fluid is neglected, the gears slip, shifts become harsh, metal shavings build up, and the gearbox will eventually fail, requiring a replacement costing over RM 3,000.",
        warningSigns: [
            "Car hesitates or jerks when shifting from Park (P) to Drive (D) or Reverse (R)",
            "Engine revs up high but the car struggles to accelerate (transmission slipping)",
            "A loud whining, humming, or grinding noise coming from under the center console",
            "Burning oil smell or red/brown fluid leaking under the center of the car",
            "The dashboard warning light for transmission temperature illuminates"
        ],
        maintenanceTip: "For Perodua models with conventional automatic gearboxes (like older Myvis or Alzas), replace ATF every 40,000 km. For newer CVT-equipped models (like Ativa, New Myvi, New Alza, Axia 2023+), replace Perodua CVT Fluid every 40,000 km strictly, as CVTs are highly sensitive to fluid degradation.",
        didYouKnow: "CVT gearboxes do not have traditional gears; instead, they use a steel belt and two adjustable pulleys to provide infinite gear ratios for maximum fuel efficiency.",
        costEstimate: "RM 90 to RM 150 (Fluid only)",
        difficultyLevel: "Professional Only",
        urgency: "Critical"
    },
    {
        blockID: "b19",
        categoryID: "cat1",
        employeeID: "e1",
        blockTitle: "Drive Belt (Serpentine Belt)",
        description: "The drive belt is a heavy-duty rubber belt that transfers power from the spinning engine crankshaft to accessories like the alternator, AC compressor, and water pump.",
        whyItMatters: "If the drive belt slips, accessories won't get enough power (e.g. AC stops cooling or battery stops charging). If the belt snaps completely while driving, the water pump stops, causing immediate engine overheating, and the alternator stops, killing all electrical systems within minutes.",
        warningSigns: [
            "Loud, high-pitched squealing or chirping noise from under the hood, especially when starting the car or turning on the AC",
            "Visible cracks, fraying, or missing chunks of rubber on the ribbed side of the belt",
            "Battery light illuminates on dashboard indicating the alternator is not spinning properly",
            "Heavy steering or sudden loss of air conditioning cooling",
            "The belt looks shiny or glazed on the flat side due to friction slippage"
        ],
        maintenanceTip: "Inspect the drive belt at every oil change for signs of wear, cracking, or tension loss. Replace the belt immediately if cracked, or proactively every 60,000 to 80,000 km. Adjust the tensioner if the belt squeals under load.",
        didYouKnow: "A drive belt is made of highly durable EPDM synthetic rubber, allowing it to withstand extreme engine temperatures from -40Â°C to over 130Â°C.",
        costEstimate: "RM 40 to RM 90",
        difficultyLevel: "Moderate",
        urgency: "Important"
    },

    // === BRAKING SYSTEM (cat2) ===
    {
        blockID: "b4",
        categoryID: "cat2",
        employeeID: "e1",
        blockTitle: "Brake Pads",
        description: "Brake pads are the friction materials that clamp down onto the spinning metal brake discs to slow down and stop your vehicle.",
        whyItMatters: "Brake pads wear down naturally every time you press the brake pedal. If you ignore worn-out pads, you will experience drastically increased stopping distances, risk of brake failure, and costly damage to the metal brake rotors from metal-on-metal grinding.",
        warningSigns: [
            "Squealing, screeching, or high-pitched squeaking noise when applying brakes",
            "Loud metallic grinding, scraping, or growling sound (indicates zero brake pad material remaining!)",
            "Brake pedal feels soft, spongy, or goes almost to the floor before engaging",
            "Visible thickness of the pad is less than 3mm through the wheel spokes",
            "Brake warning light glows red on the instrument panel"
        ],
        maintenanceTip: "Inspect brake pad thickness at every tire rotation (10,000 km). Replace brake pads immediately when the friction material thickness drops below 3mm. Always replace brake pads in axle pairs (both fronts or both rears) to ensure even braking force.",
        didYouKnow: "Brake pads have a built-in metallic tab called a 'wear indicator.' When the pad is nearly worn out, this tab scrapes against the rotor to intentionally make a screeching noise, warning the driver to replace them.",
        costEstimate: "RM 60 to RM 150 (Front set, parts only)",
        difficultyLevel: "Moderate",
        urgency: "Critical"
    },
    {
        blockID: "b5",
        categoryID: "cat2",
        employeeID: "e1",
        blockTitle: "Brake Fluid",
        description: "Brake fluid is a specialized hydraulic fluid that transmits the physical force of your foot on the brake pedal directly to the brake calipers at the wheels.",
        whyItMatters: "Brake fluid is 'hygroscopic,' meaning it actively absorbs moisture from the air over time. Moisture lowers the fluid's boiling point. Under heavy braking (like driving down Genting Highlands), the water in the fluid boils into gas bubbles. Since gas is compressible, your brakes will suddenly fail, resulting in a 'spongy' pedal that cannot stop the car.",
        warningSigns: [
            "Brake pedal feels extremely soft, spongy, or sinks to the floor without much stopping power",
            "Brake fluid in the plastic reservoir looks dark brown or black (should be clear or light yellow)",
            "The brake warning light on the dashboard remains lit",
            "Brake performance feels significantly weaker after driving downhill for a while",
            "Fluid level in the brake reservoir is visibly below the 'MIN' mark"
        ],
        maintenanceTip: "Never top up brake fluid with a bottle that has been open for more than a few months, as it has already absorbed moisture. Check fluid level monthly and flush/replace the brake fluid completely every 40,000 km or 2 years.",
        didYouKnow: "Brake fluid can eat through automotive paint in seconds! If you accidentally spill any on your car body, wash it off with massive amounts of soapy water immediately.",
        costEstimate: "RM 26 to RM 60",
        difficultyLevel: "Advanced",
        urgency: "Critical"
    },
    {
        blockID: "b20",
        categoryID: "cat2",
        employeeID: "e1",
        blockTitle: "Brake Rotors (Discs)",
        description: "Brake rotors are large, shiny metal discs that spin along with your car wheels. The brake pads clamp onto these discs to stop the vehicle.",
        whyItMatters: "Rotors must be perfectly flat and smooth to provide consistent braking. Over time, friction generates extreme heat, causing rotors to wear thin, warp, or develop deep grooves. Warped rotors lead to pedal vibrations and unstable, dangerous stopping behavior.",
        warningSigns: [
            "Brake pedal or steering wheel vibrates and shakes rapidly when applying the brakes, especially at high speeds",
            "Visible deep circular rings, grooves, or lips around the edge of the rotor disc",
            "Brakes make a loud, pulsating squealing or thumping noise",
            "Stopping distances are noticeably longer and braking feels uneven",
            "Rotor has a blue or purple tint, indicating extreme heat damage"
        ],
        maintenanceTip: "When replacing brake pads, always ask the mechanic to inspect the rotors. If the rotors are still thick enough but have uneven surfaces, they can be skimmed (machined) flat. Otherwise, they must be replaced. Never spray cold water directly on hot brakes (like immediately after a long drive), as the sudden temperature drop will warp the metal rotors instantly.",
        didYouKnow: "Skimming a rotor removes a micro-layer of metal to make it perfectly flat, but it can only be done if the remaining thickness is above the manufacturer's safe limit stamped on the disc.",
        costEstimate: "RM 100 to RM 220 per pair (Front rotors)",
        difficultyLevel: "Professional Only",
        urgency: "Critical"
    },
    {
        blockID: "b21",
        categoryID: "cat2",
        employeeID: "e1",
        blockTitle: "ABS System",
        description: "The Anti-lock Braking System (ABS) prevents the wheels from locking up (skidding) during emergency hard braking, allowing you to maintain steering control.",
        whyItMatters: "If you slam on the brakes on a wet Malaysian road without ABS, your tires will lock and skid. You lose all steering control, and the car will slide straight forward even if you turn the steering wheel. A functional ABS system pumps the brakes hundreds of times per second to keep the wheels rolling slightly, saving lives.",
        warningSigns: [
            "The yellow 'ABS' warning light remains lit on the dashboard while driving",
            "Wheels lock up and skid during moderately hard braking on wet roads",
            "Brake pedal feels extremely stiff and hard to press",
            "Braking feels inconsistent or grabs suddenly"
        ],
        maintenanceTip: "If the ABS warning light comes on, the system is disabled, but your standard mechanical brakes will still work. However, you should visit a service center immediately to scan for fault codes (usually caused by a dirty or broken speed sensor at one of the wheels). Ensure your brake fluid is changed regularly, as old fluid can clog the delicate ABS hydraulic modulator unit.",
        didYouKnow: "When ABS activates during emergency braking, the brake pedal will vibrate violently and make a loud grinding noise. This is normal behavior! Do not release your foot; press down hard and steer safely.",
        costEstimate: "RM 80 to RM 200 (sensor replacement); RM 1,000+ (ABS modulator replacement)",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },
    {
        blockID: "b22",
        categoryID: "cat2",
        employeeID: "e1",
        blockTitle: "Handbrake / Parking Brake",
        description: "The handbrake (or parking brake) is a secondary mechanical brake system that locks the rear wheels to keep the car completely stationary when parked.",
        whyItMatters: "The handbrake bypasses the hydraulic system and uses a physical steel cable to engage the rear brakes. If this cable snaps or stretches, your car can roll away when parked on a steep slope, causing severe damage or injury. It also serves as an emergency backup if your main hydraulic brakes fail.",
        warningSigns: [
            "You have to pull the handbrake lever very high up (more than 7-9 clicks) before the car holds in place",
            "The car slowly rolls backward or forward when parked on a hill with the handbrake fully pulled",
            "The handbrake lever feels extremely loose, floppy, or has no resistance",
            "The rear wheels feel stuck or drag when driving, even though the handbrake is fully released (stuck handbrake cable)"
        ],
        maintenanceTip: "To check your handbrake, find a safe incline, pull the lever, and put the car in Neutral. If the car rolls, the cable is stretched and needs adjustment. When releasing the handbrake, make sure the lever is pushed all the way down to avoid dragging the brake pads while driving, which will burn them out.",
        didYouKnow: "In vehicles with automatic transmissions, relying solely on the transmission's 'Park' (P) gear puts intense pressure on a tiny metal latch called a 'parking pawl'. Using your handbrake first protects this expensive internal component from breaking.",
        costEstimate: "RM 50 to RM 120 (cable adjustment or replacement)",
        difficultyLevel: "Moderate",
        urgency: "Important"
    },

    // === WHEELS SYSTEM (cat3) ===
    {
        blockID: "b6",
        categoryID: "cat3",
        employeeID: "e1",
        blockTitle: "Wheel Alignment",
        description: "Wheel alignment adjusts the angles of the steering and suspension components so the tires point straight and contact the road at the correct angle.",
        whyItMatters: "Misaligned wheels cause your tires to drag unevenly. This results in rapid and uneven tire wear (costing you a new set of tires prematurely), poor handling, and constant steering wheel pulling, which tires out the driver and wastes fuel.",
        warningSigns: [
            "The car constantly drifts or pulls to the left or right when you let go of the steering wheel on a straight flat road",
            "The steering wheel is off-center or crooked when the car is driving straight ahead",
            "Tires wear down unevenly, such as the inner edge wearing flat while the outer edge is healthy",
            "Steering wheel vibrates or shakes at highway speeds (though this is often tire balancing)"
        ],
        maintenanceTip: "Perform a professional wheel alignment, balancing, and tire rotation strictly every 10,000 km or at least once a year. Always do an alignment immediately after hitting a deep pothole at high speed or replacing any suspension parts.",
        didYouKnow: "Wheel alignment involves adjusting three specific angles: Camber (tilt inward/outward), Caster (steering axis tilt), and Toe (pigeon-toed or duck-toed angle of the wheels).",
        costEstimate: "RM 30 to RM 70 (Alignment & Balancing pack)",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },
    {
        blockID: "b10",
        categoryID: "cat3",
        employeeID: "e1",
        blockTitle: "Tire Pressure",
        description: "Tire pressure is the amount of compressed air inside your tires, measured in PSI or kPa, supporting the weight of the vehicle.",
        whyItMatters: "Correct tire pressure keeps the tire tread perfectly flat on the road. Under-inflated tires bulge at the sides, causing high rolling resistance (burning 5-10% more petrol), excessive heat buildup, and a high risk of dangerous high-speed blowouts on highways.",
        warningSigns: [
            "Tire pressure warning light (TPMS) illuminates on the instrument cluster",
            "Tires look visibly flat, saggy, or bulged at the bottom sides",
            "The car feels heavy, sluggish, or steering requires more effort than usual",
            "Screeching sound from the tires when cornering at normal speeds",
            "Poor fuel economy (frequent petrol station visits)"
        ],
        maintenanceTip: "Check your tire pressure at least once every two weeks when the tires are 'cold' (driven less than 3 km). You can find the correct PSI placard on the driver-side door B-pillar frame. For most Perodua models, it is between 32 to 36 PSI (220-250 kPa). Do not forget to check the spare tire!",
        didYouKnow: "Tire pressure drops naturally by about 1 to 2 PSI every single month, even if there are no punctures, due to air molecules migrating slowly through the tire's microscopic rubber pores.",
        costEstimate: "Free (using air pump at petrol stations)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },
    {
        blockID: "b11",
        categoryID: "cat3",
        employeeID: "e1",
        blockTitle: "Tire Rotation",
        description: "Tire rotation is the practice of moving a car's tires from one position to another (e.g. front-to-back, side-to-side) to ensure even tread wear.",
        whyItMatters: "On front-wheel-drive Peroduas, the front tires handle 100% of the steering, 100% of the engine power, and 70% of the braking force. Consequently, front tires wear down twice as fast as the rear tires. Regular rotation spreads this wear evenly across all four tires, doubling their useful lifespan.",
        warningSigns: [
            "Front tires are almost bald while the rear tires look brand new",
            "Noticeable road noise, humming, or roaring sounds at highway speeds",
            "Uneven wear patterns across the same tire (feathered or cupped tread)",
            "The car feels less stable on wet, slippery roads"
        ],
        maintenanceTip: "Rotate your tires strictly every 10,000 km. The standard rotation pattern for front-wheel-drive cars is: move rear tires straight to the front, and cross the front tires to the opposite rear positions (e.g. Left Front goes to Right Rear). Always re-balance tires after rotating.",
        didYouKnow: "Failing to rotate your tires regularly can void the wear-life warranty provided by major tire manufacturers like Michelin, Continental, or Toyo.",
        costEstimate: "RM 20 to RM 40",
        difficultyLevel: "Moderate",
        urgency: "Routine"
    },
    {
        blockID: "b23",
        categoryID: "cat3",
        employeeID: "e1",
        blockTitle: "Tire Tread Depth",
        description: "Tire tread depth is the vertical measurement of the rubber grooves on a tire, designed to channel water away on wet roads to maintain grip.",
        whyItMatters: "Driving on wet Malaysian roads during a heavy tropical downpour requires healthy tread. If your tire tread is thin or bald, the tire cannot channel the water away fast enough. The tire will ride on top of a thin film of water, losing all contact with the road. This is called 'aquaplaning' and causes immediate loss of control, spinning, and high-speed crashes.",
        warningSigns: [
            "The car slips, slides, or feels floaty when driving over small puddles or wet roads",
            "Tire surface looks shiny, smooth, or 'bald' in certain areas",
            "Tread wear indicator bars (raised rubber blocks inside the grooves) are level with the outer tread surface",
            "It takes significantly longer to come to a stop when braking in the rain"
        ],
        maintenanceTip: "Use the simple '1-Ringgit Coin Test' to check your tread depth. Insert a RM 1 coin into the tire grooves. If you can clearly see the words 'Bank Negara Malaysia' around the edge, your tread is below 2mm and the tire is dangerously worn. Replace tires immediately when tread depth reaches 1.6mm (the legal limit).",
        didYouKnow: "At 90 km/h, a new tire can channel away up to 15 liters of water per second from the road contact patch. A bald tire channels zero, causing the car to essentially float on water.",
        costEstimate: "RM 140 to RM 280 per tire (depending on size and brand)",
        difficultyLevel: "Easy",
        urgency: "Critical"
    },
    {
        blockID: "b24",
        categoryID: "cat3",
        employeeID: "e1",
        blockTitle: "Tire Age & DOT Code",
        description: "Tire age refers to the time elapsed since the tire was manufactured. Tires contain chemical compounds that degrade naturally over time, regardless of tread wear.",
        whyItMatters: "Rubber dries out, hardens, and cracks as it ages (dry rot), especially under hot Malaysian sun. An old tire loses its flexibility and grip, and is highly prone to sudden sidewall blowouts at high speeds, even if the tread looks completely full and unused.",
        warningSigns: [
            "Tiny spiderweb-like cracks on the tire sidewalls or inside the tread grooves",
            "Tire rubber feels extremely hard and plastic-like instead of grippy and firm",
            "Tire loses pressure frequently without any visible punctures",
            "Tire sidewall has unusual bulges, bubbles, or blisters"
        ],
        maintenanceTip: "Locate the 4-digit 'DOT Code' stamped on your tire sidewall (e.g. '3423'). The first two digits represent the week of manufacture, and the last two represent the year. '3423' means the tire was made in the 34th week of 2023. Never buy 'new' tires that have been sitting on a shop shelf for more than 3 years. Replace all tires once they reach 5 to 6 years of age, regardless of tread wear.",
        didYouKnow: "Even unused spare tires stored in dark trunks degrade over time. An 8-year-old spare tire can disintegrate rapidly if mounted and driven on the highway.",
        costEstimate: "RM 140 to RM 280 per tire",
        difficultyLevel: "Easy",
        urgency: "Important"
    },
    {
        blockID: "b25",
        categoryID: "cat3",
        employeeID: "e1",
        blockTitle: "Spare Tire Care",
        description: "The spare tire is an extra tire carried in the vehicle trunk, ready to be mounted in the event of an unexpected puncture or flat tire.",
        whyItMatters: "Getting a flat tire on a dark, rainy highway is stressful. Discovering that your spare tire is completely flat and unusable is a nightmare. Keeping the spare tire maintained ensures you can get back on the road safely and avoid expensive towing bills.",
        warningSigns: [
            "Spare tire looks deflated, saggy, or feels soft when pressed in the trunk",
            "Visible cracking or dry rot on the spare tire rubber",
            "Tire is missing its valve stem cap or shows rusty steel wheel corrosion",
            "The tire is past 8 years of age (dangerous to drive on)"
        ],
        maintenanceTip: "Ask your mechanic to check the spare tire pressure at every single service. Because spare tires sit unused, pump them to a higher pressure (typically 40-42 PSI for temporary space-savers) as they leak air slowly over time. Familiarize yourself with the location of the jack, lug wrench, and lock nut key in your Perodua trunk.",
        didYouKnow: "Many modern cars use a 'Space Saver' spare tire, which is smaller and lighter than standard wheels. These are strictly temporary: you must not drive faster than 80 km/h or further than 80 km on them.",
        costEstimate: "Free to maintain; RM 120 - RM 200 to replace",
        difficultyLevel: "Easy",
        urgency: "Routine"
    },

    // === SUSPENSION SYSTEM (cat4) ===
    {
        blockID: "b7",
        categoryID: "cat4",
        employeeID: "e1",
        blockTitle: "Shock Absorbers (Struts)",
        description: "Shock absorbers dampen the movement of the suspension springs, keeping the car tires firmly planted on the road and preventing excessive bouncing.",
        whyItMatters: "Worn shocks make your ride uncomfortable, but more importantly, they are a safety hazard. They allow the car to pitch forward during braking (increasing stopping distance by up to 10%) and cause body roll in corners, making it easy to lose control during emergency swerves.",
        warningSigns: [
            "The car bounces excessively (more than 1.5 times) after hitting a bump or speed humph",
            "The nose of the car 'dives' forward heavily under braking, or squats backward during hard acceleration",
            "Visible wet, oily fluid leaking down the metal body of the shock absorber strut",
            "Tires show 'cupped' wear patterns (wavy smooth patches due to tire bouncing off the road)",
            "Loud clunking or knocking noises when driving over rough, unpaved surfaces"
        ],
        maintenanceTip: "Conduct a simple 'Bounce Test'. Push down hard on the front bumper and release. The car should bounce up, down, and immediately stop. If it continues to float or bounce, the shocks are worn out. Inspect shocks for oil leaks at every service. Replace them in pairs (both front or both rear) proactively around 80,000 to 100,000 km.",
        didYouKnow: "A worn shock absorber cannot keep the tire in contact with the road. If the tire bounces in the air even for a split second, you lose all braking and steering capability during that moment.",
        costEstimate: "RM 250 to RM 550 per pair (Front struts with installation)",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },
    {
        blockID: "b12",
        categoryID: "cat4",
        employeeID: "e1",
        blockTitle: "Control Arms & Ball Joints",
        description: "Control arms connect the wheel hub assemblies to the car chassis, allowing the wheels to move up and down over bumps while keeping them aligned.",
        whyItMatters: "Control arms contain rubber bushings and a pivot point called a ball joint. If the ball joint wears out and snaps while driving, the entire wheel assembly will physically detach from the car, collapsing the steering and causing a catastrophic, uncontrollable crash.",
        warningSigns: [
            "Loud, metallic popping, clunking, or snapping noises when turning the steering wheel or driving over bumps",
            "The steering wheel feels loose, floppy, or has a lot of 'play' (steering lags behind physical input)",
            "Steering wheel pulls to one side, especially when accelerating or braking",
            "High-speed steering wheel vibrations",
            "Uneven front tire wear on the inner or outer edges"
        ],
        maintenanceTip: "During routine service, ask the technician to physically shake the front wheels while the car is raised on the lift. Any horizontal or vertical play indicates worn control arm bushings or failing ball joints that must be replaced immediately. Never ignore clunking sounds from the front wheels!",
        didYouKnow: "The ball joint works exactly like a human hip joint, using a steel ball housed in a lubricated socket to allow 360-degree rotation during steering and suspension movement.",
        costEstimate: "RM 120 to RM 280 per side",
        difficultyLevel: "Professional Only",
        urgency: "Critical"
    },
    {
        blockID: "b26",
        categoryID: "cat4",
        employeeID: "e1",
        blockTitle: "Suspension Bushings & Mounts",
        description: "Bushings are small rubber or polyurethane sleeves installed at suspension joints to absorb road vibrations, reduce noise, and allow flexible movement.",
        whyItMatters: "Rubber degrades naturally due to engine heat, moisture, and road grime. Cracked or torn bushings allow metal suspension parts to rub directly against each other. This ruins ride comfort, causes annoying squeaks, and ruins the car's wheel alignment.",
        warningSigns: [
            "Loud squeaking, creaking, or groaning noises when driving over speed bumps or cornering",
            "Vibrations felt through the floorboards or steering wheel",
            "Visible cracks, tears, or dry rot in the rubber bushings of the control arms or sway bar",
            "A loose, floating feeling when handling the car at highway speeds"
        ],
        maintenanceTip: "During oil changes, ask the mechanic to spray a silicone lubricant on the rubber bushings. This keeps the rubber soft, prevents cracking, and silences squeaks. Avoid using petroleum-based sprays (like WD-40) as they actively dissolve rubber over time.",
        didYouKnow: "Suspension bushings act as the 'cartilage' of your car's suspension joints, keeping the ride silent and isolated from rough road surfaces.",
        costEstimate: "RM 40 to RM 120 (bushings are cheap, but labor can be high)",
        difficultyLevel: "Professional Only",
        urgency: "Routine"
    },
    {
        blockID: "b27",
        categoryID: "cat4",
        employeeID: "e1",
        blockTitle: "Stabilizer Links (Sway Bar Links)",
        description: "Stabilizer links connect the car's sway bar (stabilizer bar) to the wheel suspension struts, preventing the car from tilting excessively during cornering.",
        whyItMatters: "Sway bar links keep the car level and stable when taking sharp turns. If the links are broken, the car body will lean heavily during cornering, increasing the risk of losing control or flipping the car (especially in top-heavy SUVs like the Perodua Aruz).",
        warningSigns: [
            "A distinct, rapid rattling, knocking, or clattering sound from the wheels when driving over small bumps or gravel roads",
            "The car feels floaty, unstable, and rolls excessively to the side when cornering",
            "Visible damage to the small rubber boots at the end of the stabilizer link rods, leaking grease",
            "Loose handling when driving at high speeds"
        ],
        maintenanceTip: "Stabilizer links are a very common source of minor rattling noises on older Myvis and Alzas. If you hear a light metallic rattle over minor road ripples, the links are likely worn. They are relatively cheap and easy to replace, instantly restoring tight handling.",
        didYouKnow: "The sway bar works by transferring the upward force on one wheel (during a turn) to the opposite wheel, pulling the car body down flat and countering centrifugal force.",
        costEstimate: "RM 40 to RM 90 per pair",
        difficultyLevel: "Moderate",
        urgency: "Important"
    },

    // === BATTERY SYSTEM (cat5) ===
    {
        blockID: "b8",
        categoryID: "cat5",
        employeeID: "e1",
        blockTitle: "Battery Life & Health",
        description: "The car battery stores electrical energy to power the starter motor, ignition system, and onboard electronics when the engine is off.",
        whyItMatters: "Without a healthy battery, your car cannot start. Batteries wear out chemically and typically last only 1.5 to 2 years in hot tropical climates like Malaysia. A dead battery will strand you unexpectedly in shopping malls, offices, or at home, requiring immediate jump-starting or replacement.",
        warningSigns: [
            "Engine cranks very slowly or struggles to start when turning the key ('chug-chug-chug' sound)",
            "A rapid clicking noise when you turn the key, but the engine does not crank at all",
            "Dashboard warning light shaped like a red battery stays lit while driving",
            "Headlights look dim at idle but brighten up when you rev the engine",
            "The battery casing looks swollen, bloated, or has a rotten-egg sulfur smell"
        ],
        maintenanceTip: "If you use a conventional 'wet' battery, check the water level every 2 months and top it up with distilled water. If you use a Maintenance-Free (MF) battery, check the built-in charge indicator eye (green = healthy, black = needs charge, white = replace). Replace your battery immediately if it is older than 2 years and shows slow cranking.",
        didYouKnow: "The extreme heat in Malaysia is actually a battery's worst enemy. Heat accelerates internal chemical reactions and evaporates the liquid electrolyte inside, shortening battery life compared to colder countries.",
        costEstimate: "RM 160 to RM 320 (depending on size, e.g., NS40 for Myvi/Axia, EFB for Ativa with idle-stop)",
        difficultyLevel: "Easy",
        urgency: "Critical"
    },
    {
        blockID: "b13",
        categoryID: "cat5",
        employeeID: "e1",
        blockTitle: "Alternator Function",
        description: "The alternator is an electrical generator driven by the engine belt. It supplies electrical power to the car while driving and recharges the battery.",
        whyItMatters: "While the battery starts the car, the alternator keeps it running. If the alternator fails, the car will run purely on battery reserve. Within 15-30 minutes, the battery will drain completely, causing the engine to sputter and stall in the middle of driving, which is highly dangerous.",
        warningSigns: [
            "Red battery light illuminates on the dashboard while driving (often indicating the alternator is not charging)",
            "Electrical components act weirdly, such as power windows moving extremely slowly, radio turning off, or dashboard lights flickering",
            "The engine stalls while driving and won't restart, even though you just drove for an hour",
            "Loud growling, whining, or squealing noise from the engine belt area (bad alternator bearing)",
            "Frequent headlight bulb burnouts"
        ],
        maintenanceTip: "If your battery dies, gets jump-started, but the engine stalls immediately once you disconnect the jumper cables, your alternator is dead. Have a mechanic check the alternator charging voltage with a multimeterâ€”it should read between 13.5V and 14.5V when the engine is running.",
        didYouKnow: "The alternator converts the mechanical kinetic energy of the spinning engine into alternating electrical current (AC), which is then converted into direct current (DC) by internal diodes.",
        costEstimate: "RM 250 to RM 600 (Rebuilt or New alternator replacement)",
        difficultyLevel: "Professional Only",
        urgency: "Critical"
    },
    {
        blockID: "b28",
        categoryID: "cat5",
        employeeID: "e1",
        blockTitle: "Jump Starting Safely",
        description: "Jump-starting is a method of starting a vehicle with a dead battery by temporarily connecting it to an external power source, such as a healthy car's battery.",
        whyItMatters: "Knowing how to jump-start a car is an essential survival skill. However, modern cars are packed with delicate computer control units (ECUs). Connecting jumper cables in the wrong order or touching the clamps together can spark, short-circuit the electrical system, fry the engine ECU, and cost thousands of ringgit to repair.",
        warningSigns: [
            "Fuses blowing instantly when jump cables are attached (improper connection)",
            "Engine fails to crank even when jump cables are connected (bad cable connection or extremely dead battery)"
        ],
        maintenanceTip: "Follow the strict safe order: (1) Connect RED clamp to dead battery (+), (2) Connect RED clamp to helper battery (+), (3) Connect BLACK clamp to helper battery (-), (4) Connect BLACK clamp to an unpainted metal engine bolt on the dead car (ground). Do NOT connect it to the dead battery (-) as it can cause a spark and explode battery gases! Start helper car, run for 2 minutes, then start the dead car. Disconnect in exact reverse order.",
        didYouKnow: "Car batteries contain hydrogen gas, which is highly flammable. A spark near a dead battery terminal can ignite this gas, causing the plastic battery casing to explode and spray acid.",
        costEstimate: "Free (if you own jumper cables, which cost RM 30 - RM 60)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },
    {
        blockID: "b29",
        categoryID: "cat5",
        employeeID: "e1",
        blockTitle: "Battery Terminal Corrosion",
        description: "Battery terminal corrosion is a white, blue, or green powdery substance that builds up around the metal battery posts, caused by hydrogen gas venting.",
        whyItMatters: "This powdery buildup acts as an electrical insulator. It restricts the flow of high current from the battery to the starter motor. Even if your battery is 100% healthy, thick corrosion will prevent the car from starting and stop the alternator from recharging the battery fully.",
        warningSigns: [
            "Visible crusty white, green, or blue powdery buildup on the positive (+) or negative (-) battery terminals",
            "The car struggles to start or makes a single click, but starting improves after wiggling the battery cables",
            "Slow charging or battery running flat frequently"
        ],
        maintenanceTip: "You can clean corrosion yourself easily at home! Mix 1 tablespoon of baking soda with 1 cup of hot water. Pour the mixture directly over the corroded terminals (it will fizz loudly and dissolve the acid buildup). Use an old toothbrush to scrub it clean, rinse with clean water, dry with a rag, and apply a thin layer of petroleum jelly (Vaseline) or grease to the terminals to prevent future corrosion.",
        didYouKnow: "The green powdery deposit is copper sulfate, formed when sulfuric acid vapor inside the battery reacts with the copper alloy connectors in the battery cables.",
        costEstimate: "RM 2 (Baking soda & warm water DIY)",
        difficultyLevel: "Easy",
        urgency: "Routine"
    },
    {
        blockID: "b30",
        categoryID: "cat5",
        employeeID: "e1",
        blockTitle: "Battery Types (EFB vs Standard)",
        description: "Car batteries come in different designs, primarily Standard Lead-Acid, Maintenance-Free (MF), and specialized Enhanced Flooded Batteries (EFB).",
        whyItMatters: "Modern Perodua models equipped with Eco Idle-Stop technology (like Myvi Gen 3, Bezza, Ativa, and Alza AV) auto-stop the engine at traffic lights. Standard car batteries cannot handle the extreme stress of restarting the engine dozens of times per trip. Installing a standard battery in an idle-stop car will ruin the battery in less than 6 months and void your car's warranty.",
        warningSigns: [
            "Eco Idle-Stop feature stops working or shows a warning light on dashboard",
            "New standard battery dies extremely quickly (within 4-6 months) in an idle-stop car",
            "Slow engine starts after idle-stop activates"
        ],
        maintenanceTip: "If your Perodua has the 'Eco Idle' button on the dashboard, you MUST buy an **EFB battery** (usually size M42) when replacing. EFB batteries are specifically designed with thicker plates to handle rapid cycling. If your car does not have idle-stop (like older Myvi or Axia E), a standard Maintenance-Free NS40ZL battery is perfectly fine and cheaper.",
        didYouKnow: "EFB batteries can charge and discharge up to two times faster than standard batteries, allowing them to rapidly recover their charge during short drives between traffic lights.",
        costEstimate: "RM 160 (Standard NS40ZL) vs RM 240 - RM 320 (EFB M42 for Idle-Stop)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },

    // === AIR CONDITIONING (cat6) ===
    {
        blockID: "b9",
        categoryID: "cat6",
        employeeID: "e1",
        blockTitle: "Cabin Air Filter (Air Refiner)",
        description: "The cabin air filter cleans the air entering your car interior through the heating, ventilation, and air conditioning (AC) system, trapping dust, exhaust fumes, pollen, and debris.",
        whyItMatters: "In tropical Malaysia, we run our AC constantly. A clogged cabin filter restricts airflow, forcing the AC blower motor to work harder (potentially burning it out), reducing cooling performance, and circulating unpleasant smells, allergens, and harmful traffic soot inside the cabin.",
        warningSigns: [
            "Air blowing out of the AC vents feels weak, even when set to maximum fan speed",
            "Musty, dusty, or moldy odor coming from the dashboard vents when you turn on the AC",
            "AC takes a very long time to cool down the hot cabin in the afternoon",
            "A loud whistling or roaring noise when the AC fan speed is turned up high",
            "Visible buildup of dark gray dust, hair, and leaves on the filter element inside the glovebox"
        ],
        maintenanceTip: "Inspect your cabin air filter every 10,000 km. It is located directly behind your gloveboxâ€”simply squeeze the glovebox sides to drop it open and slide the filter out. Replace the cabin filter strictly every 20,000 km or once a year. Buy a charcoal-activated filter to absorb toxic traffic exhaust odors.",
        didYouKnow: "A dirty cabin air filter can hold millions of mold spores and bacteria, turning your car's ventilation system into a breeding ground for respiratory irritants.",
        costEstimate: "RM 30 to RM 45",
        difficultyLevel: "Easy",
        urgency: "Routine"
    },
    {
        blockID: "b14",
        categoryID: "cat6",
        employeeID: "e1",
        blockTitle: "AC Compressor",
        description: "The AC compressor is the pump that compresses the gas refrigerant and circulates it through the air conditioning system to cool the cabin.",
        whyItMatters: "The compressor is the mechanical heart of the AC system, driven by the engine belt. If the compressor fails or seizes, the refrigerant cannot circulate, and your AC will only blow hot room-temperature air, making driving in sunny Malaysia unbearable. A seized compressor can also snap the drive belt, stranding your car.",
        warningSigns: [
            "AC vents blow warm air, even though the AC switch is turned on and the fan is blowing",
            "Loud, metallic rattling, clicking, or screeching noise coming from the engine bay when the AC is activated",
            "Engine RPM drops or struggles significantly when the AC compressor tries to engage",
            "Visible oil leaks or black sludge on the front body of the AC compressor pump"
        ],
        maintenanceTip: "To extend your compressor's life, turn off the AC button (A/C) 1 minute before reaching your destination while keeping the fan blowing. This dries out condensation on the internal evaporator, preventing mold growth and protecting the compressor clutch. Have an AC technician check the AC compressor oil level during major services.",
        didYouKnow: "An AC compressor has an electromagnetic clutch that physically clicks and grabs to engage the pump when the cabin temperature rises, which is the light clicking sound you hear from the engine bay.",
        costEstimate: "RM 450 to RM 850 (New compressor replacement)",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },
    {
        blockID: "b31",
        categoryID: "cat6",
        employeeID: "e1",
        blockTitle: "Refrigerant (Gas Top-Up)",
        description: "Refrigerant (AC Gas, typically R134a) is the chemical fluid that absorbs heat from the cabin air and releases it outside, cooling the air flowing through your vents.",
        whyItMatters: "The AC is a sealed system and should theoretically never lose gas. However, constant driving vibrations on Malaysian roads cause rubber hoses and seals to develop microscopic leaks. Low gas levels mean the AC cannot cool effectively, running the compressor constantly, wasting petrol, and eventually burning out the system.",
        warningSigns: [
            "Air blowing out of the vents is cool but not cold, even on the lowest temperature setting",
            "A constant soft hissing or bubbling sound coming from behind the dashboard when the AC is running",
            "AC compressor cycles on and off rapidly every few seconds (low pressure safety switch cut-out)",
            "The small green sight glass under the hood shows bubbling foam instead of clear liquid"
        ],
        maintenanceTip: "Never just 'top up' AC gas if your AC is warm! A warm AC means there is a physical leak. Adding gas without fixing the leak is a waste of money. Have an AC shop conduct a pressure vacuum test to find the leak, replace the leaky O-rings or hoses, and then recharge the gas along with fresh PAG lubricant oil.",
        didYouKnow: "Running an AC system with low refrigerant can burn out the compressor, because the compressor relies on the circulating refrigerant gas to carry its lubricating oil!",
        costEstimate: "RM 50 to RM 90 (Recharge & vacuum test)",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },
    {
        blockID: "b32",
        categoryID: "cat6",
        employeeID: "e1",
        blockTitle: "Evaporator & Condenser",
        description: "The condenser (front of car) cools hot high-pressure AC gas, while the evaporator (behind dashboard) absorbs heat from the cabin, blowing cold air into the interior.",
        whyItMatters: "If the condenser is blocked by dirt or leaves, the AC gas cannot cool down, resulting in poor AC cooling inside the car. If the evaporator under the dashboard leaks or gets clogged with mold, your cabin will smell dusty, blow warm air, and puddle water on the passenger floorboard.",
        warningSigns: [
            "AC is cold when driving fast on the highway, but turns warm when idling in a traffic jam (blocked condenser)",
            "Unpleasant, stale, sour, or dirty socks odor inside the car when turning on the AC",
            "Puddles of clean water leaking onto the passenger-side carpet floorboard (clogged evaporator drain tube)",
            "Vents blow fog or steam momentarily"
        ],
        maintenanceTip: "If you notice water leaking onto the passenger floor carpet, your AC evaporator drain tube is clogged with dirt. A mechanic can easily blow compressed air up the drain hose under the car to clear it. Clean your front condenser with low-pressure water at home whenever you wash your car.",
        didYouKnow: "The evaporator is extremely cold (around 0-4Â°C). Moisture in the air condenses on its fins, which is why healthy cars always drip a small puddle of clean water under the engine bay when parked.",
        costEstimate: "RM 120 (Condenser clean); RM 400 - RM 700 (Evaporator replacement, requires dashboard removal)",
        difficultyLevel: "Professional Only",
        urgency: "Moderate"
    },
    {
        blockID: "b33",
        categoryID: "cat6",
        employeeID: "e1",
        blockTitle: "AC Belt",
        description: "The AC belt is either a dedicated V-belt or part of the serpentine belt that physically drives the AC compressor pulley from the engine crankshaft.",
        whyItMatters: "If the AC belt is loose, it will slip on the compressor pulley, making a horrible squealing sound and reducing AC cooling. If the belt snaps, the compressor will not spin at all, leaving you with no air conditioning in hot weather.",
        warningSigns: [
            "Loud, high-pitched screeching or squealing noise from the engine bay specifically when you press the AC button",
            "AC goes warm suddenly, accompanied by a slapping or snapping noise under the hood",
            "Visible cracks, dry rot, or polished 'glazed' edges on the AC drive belt rubber",
            "Belt tension feels loose (deflection of more than 1 cm when pressed with finger)"
        ],
        maintenanceTip: "Check the AC belt tension and condition at every oil change. A loose belt can be tightened using the tensioner bolt. Replace the belt immediately if there are cracks on the underside ribs, or proactively every 60,000 km.",
        didYouKnow: "In older Perodua models like the Kancil or Kelisa, the AC belt was a completely separate small belt, whereas newer models integrate it into a single long multi-rib drive belt.",
        costEstimate: "RM 30 to RM 70",
        difficultyLevel: "Moderate",
        urgency: "Important"
    },

    // === ELECTRICAL SYSTEM (cat8) ===
    {
        blockID: "b34",
        categoryID: "cat8",
        employeeID: "e1",
        blockTitle: "Headlights & Bulbs",
        description: "Headlights, high beams, and fog lights provide vital illumination for safe night driving and make your vehicle visible to others.",
        whyItMatters: "A blown headlight bulb cuts your night visibility in half and makes it extremely difficult to judge distances. It is also highly illegal, leading to Malaysian traffic police summonses (saman) and failing PUSPAKOM inspections. Furthermore, oncoming traffic can easily mistake your car for a motorcycle, risking a head-on crash.",
        warningSigns: [
            "One headlight is completely dark while the other functions normally",
            "Headlights look yellow, dim, or flicker rapidly when driving over bumps",
            "High beams work but low beams do not (or vice versa - dual filament burnout)",
            "Dashboard warning light for exterior bulb failure illuminates"
        ],
        maintenanceTip: "Always replace headlight bulbs in pairs! Bulbs have similar lifespans; if one burns out, the other is likely to fail soon. Never touch the glass part of a new halogen bulb with your bare fingers! The natural oils on your skin will create a hot spot on the glass, causing the bulb to explode when turned on.",
        didYouKnow: "Newer Perodua models (Myvi Gen 3, Ativa, Alza, Axia 2023+) use advanced LED headlight modules instead of traditional halogen bulbs. While they last much longer, if an LED fails, the entire headlight housing usually needs replacement rather than just a bulb.",
        costEstimate: "RM 15 to RM 45 (halogen bulbs); RM 400+ (complete LED headlight assemblies)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },
    {
        blockID: "b35",
        categoryID: "cat8",
        employeeID: "e1",
        blockTitle: "Fuses & Relays",
        description: "Fuses are small safety devices designed to protect your car's delicate wiring and electrical modules from damage caused by electrical short circuits or overloads.",
        whyItMatters: "If a short circuit occurs (e.g. water enters a socket), a massive electrical current will surge through the wires. If there is no fuse, the wires will melt, catch fire, and burn down the entire car. The fuse is designed to act as a sacrifice: it physically melts and breaks the circuit safely, stopping the hazard.",
        warningSigns: [
            "A specific electrical component (like the cigarette lighter, radio, horn, or power windows) suddenly stops working completely",
            "Multiple electrical items fail at the same time (blown main fuse)",
            "The car engine cranks but won't start (blown fuel pump or ignition fuse)",
            "A newly replaced electrical part won't turn on"
        ],
        maintenanceTip: "Fuses are housed in two main fuse boxes: one under the hood (high-power items) and one inside the cabin under the steering column (cabin electronics). If a fuse blows, locate it using the diagram on the cover and replace it with a spare of the EXACT same color and amperage rating (e.g. 10A Red, 15A Blue). Never bypass a blown fuse with a wire or install a higher amperage fuse, as this can cause an electrical fire!",
        didYouKnow: "Car fuses are color-coded globally by amperage: 5A is Tan, 7.5A is Brown, 10A is Red, 15A is Blue, 20A is Yellow, and 30A is Green.",
        costEstimate: "RM 2 to RM 10 (pack of replacement fuses)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },
    {
        blockID: "b36",
        categoryID: "cat8",
        employeeID: "e1",
        blockTitle: "Wiper Blades & Motor",
        description: "Wiper blades are rubber squeegees that clear rain and road spray from the windshield, driven by an electric wiper motor linkage.",
        whyItMatters: "In Malaysia's tropical climate, torrential downpours can reduce visibility to zero in seconds. Cracked, hard, or torn wiper blades will only smudge water across your windshield, blinding you at highway speeds. A working wiper system is your first line of defense in tropical rainstorms.",
        warningSigns: [
            "Wipers leave wide streaks, bands of water, or hazy smudges on the windshield",
            "Horrible squeaking, chattering, or skipping noise as the wipers move",
            "The rubber blade has physically torn, split, or detached from the metal frame",
            "Wipers move extremely slowly, get stuck halfway, or don't move at all (failing wiper motor)"
        ],
        maintenanceTip: "Clean your wiper rubber monthly by wiping it with a damp cloth and warm soapy water to remove accumulated grit and road grime. Avoid leaving your car parked under the blazing sun for long periods, as heat bakes the rubber hard. Replace your wiper blades strictly every 6 to 12 months, or as soon as they start streaking.",
        didYouKnow: "Lifting your wipers up when parking in the sun is a common Malaysian habit. While it stops the wiper rubber from baking on the hot glass, it actually stretches and weakens the wiper arm springs over time, reducing the wiper's contact pressure on the windshield.",
        costEstimate: "RM 25 to RM 75 per set (wiper blades)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },

    // === EXHAUST SYSTEM (cat9) ===
    {
        blockID: "b37",
        categoryID: "cat9",
        employeeID: "e1",
        blockTitle: "Exhaust Pipe & Muffler",
        description: "The exhaust system routes harmful exhaust gases safely out of the engine, reduces engine noise using a muffler, and vents the clean gases out the tailpipe.",
        whyItMatters: "Exhaust pipes run underneath the car and are highly prone to rust and physical damage from bottoming out on speed bumps. A broken exhaust pipe lets hot, toxic carbon monoxide leak directly under the car cabin. This gas can seep into the interior, causing drowsiness, headaches, and deadly poisoning for the passengers.",
        warningSigns: [
            "The car engine sounds extremely loud, deep, or makes a roaring, rumbling noise upon acceleration",
            "A loud metallic rattling, buzzing, or ticking sound under the car (broken exhaust hanger or heat shield)",
            "Visible rust holes, cracks, or soot deposits on the pipes or muffler under the car",
            "Exhaust tailpipe is hanging low, scraping on the ground, or shaking violently",
            "A strong exhaust smell inside the car cabin"
        ],
        maintenanceTip: "Periodically inspect the underside of your car during servicing for rusty joints or cracked rubber exhaust hangers. If your exhaust is loud, have it welded or replaced immediately. Avoid short 5-minute drives, as they don't heat up the exhaust enough to evaporate condensation, causing the muffler to rust from the inside out.",
        didYouKnow: "The muffler works by using internal chambers that reflect sound waves against each other, canceling out the engine's deafening noise through destructive interference.",
        costEstimate: "RM 50 (welding repair) to RM 250 (Muffler replacement)",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },
    {
        blockID: "b38",
        categoryID: "cat9",
        employeeID: "e1",
        blockTitle: "Catalytic Converter",
        description: "The catalytic converter is a high-temperature device in the exhaust line that chemically converts toxic engine gases (Carbon Monoxide, Hydrocarbons) into harmless gases (Water Vapor, Carbon Dioxide).",
        whyItMatters: "The catalytic converter is critical for environment protection. If it is damaged or clogged, the engine will suffer from high exhaust backpressure, causing severe sluggishness, high fuel consumption, and failure in environmental emission tests. It is also a highly expensive part containing precious metals.",
        warningSigns: [
            "Car acceleration feels extremely heavy and sluggish (feels like the car is holding back)",
            "A strong rotten-egg sulfur smell coming from the exhaust pipe",
            "The check engine light on the dashboard illuminates with codes for catalyst efficiency",
            "Engine fails to start or stalls after a few seconds due to complete exhaust blockage",
            "A loud rattling noise under the center of the car at idle (broken internal ceramic honeycomb)"
        ],
        maintenanceTip: "To protect your catalytic converter, fix engine misfires (bad spark plugs or coils) immediately. Unburnt fuel from misfires will flow into the exhaust, ignite inside the super-hot converter, melt the internal ceramic structure, and instantly destroy it. Only use high-quality fuel and engine oil.",
        didYouKnow: "Catalytic converters contain rare precious metals like Platinum, Palladium, and Rhodium, which act as catalysts. This is why they are prime targets for thieves in many countries.",
        costEstimate: "RM 600 to RM 1,500+ (complete replacement)",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },
    {
        blockID: "b39",
        categoryID: "cat9",
        employeeID: "e1",
        blockTitle: "Oxygen Sensor (O2 Sensor)",
        description: "The Oxygen Sensor monitors the amount of unburnt oxygen in the exhaust gases and sends this data to the engine computer (ECU) to adjust the air-fuel mixture.",
        whyItMatters: "The ECU relies on the O2 sensor to inject the perfect amount of fuel. If the O2 sensor is old or dirty, the ECU cannot calculate properly and will run the engine 'rich' (injecting too much fuel). This wastes petrol, reduces power, and rapidly burns out the expensive catalytic converter.",
        warningSigns: [
            "A sudden, unexplained drop in fuel economy (car burns through petrol quickly)",
            "Check Engine light is illuminated on the dashboard",
            "Rough, unsteady engine idling or engine sputtering",
            "Exhaust smells heavily of unburnt petrol"
        ],
        maintenanceTip: "O2 sensors are highly durable but degrade over time due to carbon deposits. Have the sensor scanned or replaced proactively around 100,000 km. Replacing a faulty O2 sensor can instantly improve your car's fuel economy by up to 15%!",
        didYouKnow: "Most modern cars have at least two oxygen sensors: one before the catalytic converter to monitor engine combustion, and one after to monitor the health of the converter.",
        costEstimate: "RM 120 to RM 350",
        difficultyLevel: "Professional Only",
        urgency: "Important"
    },

    // === LIGHTING & VISIBILITY (cat10) ===
    {
        blockID: "b40",
        categoryID: "cat10",
        employeeID: "e1",
        blockTitle: "Turn Signals & Brake Lights",
        description: "Brake lights and turn signals are vital communication lights that inform other drivers when you are stopping, slowing down, or turning.",
        whyItMatters: "Brake lights are your primary defense against rear-end collisions. If your brake lights are blown, drivers behind you won't know you're stopping until it is too late, especially during night driving. Signal lights are equally critical for signaling lane changes safely on busy Malaysian highways.",
        warningSigns: [
            "A turn signal blinker flashes twice as fast as usual on the dashboard (indicates a blown exterior turn signal bulb on that side!)",
            "A driver behind honks or flashes their lights at you when you brake",
            "Brake lights or turn signals are dark or dim when activated",
            "The third high-mount brake light in the rear window is dark"
        ],
        maintenanceTip: "Perform a simple 'Brake Light Walkaround' monthly. Back your car up near a flat wall at night. Press the brake pedal and look in your rearview mirror. You should see the bright red reflection of all three brake lights on the wall. If any light is missing, replace the bulb immediately.",
        didYouKnow: "When a turn signal bulb burns out, the decreased electrical resistance in the circuit causes the relay to click and flash the remaining bulb extremely rapidly. This is a deliberate built-in diagnostic feature!",
        costEstimate: "RM 5 to RM 15 (bulbs)",
        difficultyLevel: "Easy",
        urgency: "Critical"
    },
    {
        blockID: "b41",
        categoryID: "cat10",
        employeeID: "e1",
        blockTitle: "Dashboard Warning Lights",
        description: "Dashboard warning lights are illuminated icons on the instrument panel that warn the driver of active malfunctions in various vehicle systems.",
        whyItMatters: "Think of dashboard lights as your car's way of talking to you. A glowing light means a system needs attention. Ignoring a warning light (like the engine temperature or oil pressure light) and continuing to drive can lead to catastrophic, irreversible damage within minutes.",
        warningSigns: [
            "The yellow 'Check Engine' light stays illuminated while the engine is running",
            "A red 'Thermometer' light (coolant temperature) or red 'Oil Can' light (oil pressure) glows",
            "A yellow 'Exclamation Mark inside a horseshoe' (tire pressure) or yellow 'Steering Wheel with Exclamation Mark' (electric power steering) light turns on"
        ],
        maintenanceTip: "Understand the color-coding: (1) **GREEN/BLUE** = system is active (e.g. headlights, eco mode), (2) **YELLOW/ORANGE** = non-emergency issue that needs inspection soon (e.g. check engine, ABS, low fuel), (3) **RED** = severe emergency! Pull over safely, turn off the engine, and call a tow truck immediately (especially for oil pressure, coolant temp, or brake system warnings).",
        didYouKnow: "When you first turn on the car ignition (before starting the engine), all dashboard warning lights will illuminate for a few seconds. This is a system bulb-test: it proves that all the warning bulbs are functioning and have not burnt out.",
        costEstimate: "RM 30 to RM 80 (Diagnostic OBD2 scan charge)",
        difficultyLevel: "Easy",
        urgency: "Important"
    },
    {
        blockID: "b42",
        categoryID: "cat10",
        employeeID: "e1",
        blockTitle: "Windshield & Side Mirrors",
        description: "The front windshield, rear screen, and side mirrors provide the driver with a clear, unobstructed 360-degree view of the surrounding traffic.",
        whyItMatters: "A cracked or heavily scratched windshield scatters light at night, blinding the driver from oncoming headlights. A dirty mirror or broken side mirror creates massive blind spots, making lane changes highly dangerous. Visibility is key to proactive accident avoidance.",
        warningSigns: [
            "Visible star cracks, bullseyes, or long hairline cracks on the front windshield glass",
            "Deep wiper scratches or circular scuff marks on the driver's line of sight",
            "Windshield has a thick oily film (water beads up and smears when wiping)",
            "Side mirror glass is cracked, loose, or the electric adjustment motor does not function"
        ],
        maintenanceTip: "Never ignore small windshield stone chips! Road vibrations and extreme heat from the Malaysian sun will cause a tiny chip to suddenly expand into a massive crack across the entire glass, requiring an expensive full windshield replacement. Get chips filled with resin at a glass shop immediately. Use a windshield washer fluid concentrate in your wiper tank to cut through oily road grime.",
        didYouKnow: "The front windshield is made of 'laminated safety glass,' which sandwich a plastic PVB layer between two sheets of glass. This prevents the windshield from shattering into sharp pieces during a crash, keeping passengers safe.",
        costEstimate: "RM 50 (chip repair) to RM 800 - RM 1,800 (windshield replacement, often covered by insurance)",
        difficultyLevel: "Easy",
        urgency: "Important"
    }
];

    seedTable('serviceCategoryTable', serviceCategoryTable);
    seedTable('knowledgeBlockTable', knowledgeBlockTable);

    // â”€â”€â”€ SERVICE CENTERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Source: Perodua Official Website | Last updated: June 2025
    // Bump DATA_VERSION above whenever this list is updated.
        const peroduaServiceCenters = [
        { id: "sc14", name: "Perodua Service Centre Batu Pahat"               , area: "Batu Pahat"        , address: "No. 2, Jalan Rahmat, 83000 Batu Pahat, Johor"                        , state: "Johor"        , type: "Perodua Service Centre" , lat: 1.8548  , lng: 102.9325 , phone: "07-434 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc12", name: "Perodua Service Centre Johor Bahru"              , area: "Johor Bahru"       , address: "No. 18, Jalan Dato Sulaiman, Century Garden, 80250 Johor Bahru, Johor", state: "Johor"        , type: "Perodua Service Centre" , lat: 1.4927  , lng: 103.7414 , phone: "07-334 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc15", name: "Perodua Service Centre Muar"                     , area: "Muar"              , address: "No. 8, Jalan Meriam, 84000 Muar, Johor"                              , state: "Johor"        , type: "Perodua Service Centre" , lat: 2.0442  , lng: 102.5689 , phone: "06-953 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc13", name: "Perodua Service Centre Skudai"                   , area: "Skudai"            , address: "No. 5, Jalan Pertanian 1, Taman Universiti, 81300 Skudai, Johor"     , state: "Johor"        , type: "Perodua Service Centre" , lat: 1.5338  , lng: 103.6705 , phone: "07-558 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc25", name: "Perodua Service Centre Alor Setar"               , area: "Alor Setar"        , address: "No. 35, Jalan Gangsa, Kawasan Perindustrian Mergong, 05150 Alor Setar, Kedah", state: "Kedah"        , type: "Perodua Service Centre" , lat: 6.1254  , lng: 100.3673 , phone: "04-730 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc26", name: "Perodua Service Centre Sungai Petani"            , area: "Sungai Petani"     , address: "No. 2, Jalan Jeniang, Bandar Amanjaya, 08000 Sungai Petani, Kedah"   , state: "Kedah"        , type: "Perodua Service Centre" , lat: 5.6477  , lng: 100.4879 , phone: "04-422 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc27", name: "Perodua Service Centre Kota Bharu"               , area: "Kota Bharu"        , address: "No. 6, Jalan Doktor, 15000 Kota Bharu, Kelantan"                     , state: "Kelantan"     , type: "Perodua Service Centre" , lat: 6.1254  , lng: 102.2381 , phone: "09-741 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc11", name: "Perodua Service Centre Bangsar"                  , area: "Bangsar"           , address: "No. 2, Jalan Maarof, Bangsar, 59100 Kuala Lumpur"                    , state: "Kuala Lumpur" , type: "Perodua Service Centre" , lat: 3.1265  , lng: 101.6740 , phone: "03-2282 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sc8", name: "Perodua Service Centre Cheras"                   , area: "Cheras"            , address: "No. 1, Jalan Riang 1, Taman Segar, 56100 Cheras, Kuala Lumpur"       , state: "Kuala Lumpur" , type: "Perodua Service Centre" , lat: 3.0803  , lng: 101.7552 , phone: "03-9132 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sc9", name: "Perodua Service Centre Kepong"                   , area: "Kepong"            , address: "No. 15, Jalan 1/62A, Bandar Menjalara, 52200 Kepong, Kuala Lumpur"   , state: "Kuala Lumpur" , type: "Perodua Service Centre" , lat: 3.2137  , lng: 101.6343 , phone: "03-6277 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sc10", name: "Perodua Service Centre Wangsa Maju"              , area: "Wangsa Maju"       , address: "No. 30, Jalan 3/27A, Seksyen 1, Wangsa Maju, 53300 Kuala Lumpur"     , state: "Kuala Lumpur" , type: "Perodua Service Centre" , lat: 3.2002  , lng: 101.7376 , phone: "03-4142 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sc24", name: "Perodua Service Centre Melaka"                   , area: "Melaka"            , address: "No. 3, Jalan TU 47, Taman Tasik Utama, 75450 Melaka"                 , state: "Melaka"       , type: "Perodua Service Centre" , lat: 2.2048  , lng: 102.2602 , phone: "06-288 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "mel-001", name: "Bumiraya Motor Sdn. Bhd. (Melaka)"            , area: "Malim Jaya"        , address: "No. 108, Jalan IKS Malim Jaya 6, Taman IKS Malim Jaya, 75250 Melaka" , state: "Melaka"       , type: "Authorised Dealer"      , lat: 2.2394  , lng: 102.2384 , phone: "06-336 0963"  , hours: "Mon-Sat 8am-6pm" },
        { id: "mel-002", name: "DMM Sales Sdn. Bhd. (Melaka)"                 , area: "Cheng Ho"          , address: "No. 111, Jalan Laksamana Cheng Ho, Daerah Melaka Tengah, 75000 Melaka", state: "Melaka"       , type: "Authorised Dealer"      , lat: 2.1932  , lng: 102.2598 , phone: "06-284 6495"  , hours: "Mon-Sat 8am-6pm" },
        { id: "mel-003", name: "GT Premium Auto Sdn. Bhd. (Jasin)"            , area: "Jasin"             , address: "JC 1192, Lot 3388 & 3389, Kawasan Industri Kecil Sederhana, Taman Maju, Mukim Jasin, 77000 Jasin, Melaka", state: "Melaka"       , type: "Authorised Dealer"      , lat: 2.3048  , lng: 102.4258 , phone: "06-529 8119"  , hours: "Mon-Sat 8am-6pm" },
        { id: "mel-004", name: "Mesizaman Auto (M) Sdn. Bhd. (Masjid Tanah)"  , area: "Masjid Tanah"      , address: "Lot 120, Jalan Solok Duku, 78300 Masjid Tanah, Melaka"               , state: "Melaka"       , type: "Authorised Dealer"      , lat: 2.3461  , lng: 102.1085 , phone: "06-385 3470"  , hours: "Mon-Sat 8am-6pm" },
        { id: "mel-005", name: "Roda Juara Automobile Sdn. Bhd. (Melaka)"     , area: "Batu Berendam"     , address: "No. 47, PT 12303, Jalan IKS M5, Taman IKS Merdeka, 75350 Batu Berendam, Melaka", state: "Melaka"       , type: "Authorised Dealer"      , lat: 2.2570  , lng: 102.2470 , phone: "06-336 8228"  , hours: "Mon-Sat 8am-6pm" },
        { id: "sc23", name: "Perodua Service Centre Nilai"                    , area: "Nilai"             , address: "No. 1, Jalan BBN 1/1, Pusat Perniagaan BBN, 71800 Nilai, Negeri Sembilan", state: "Negeri Sembilan", type: "Perodua Service Centre" , lat: 2.8194  , lng: 101.7981 , phone: "06-850 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc22", name: "Perodua Service Centre Seremban"                 , area: "Seremban"          , address: "No. 8, Jalan Dato Siamang Gagap, 70200 Seremban, Negeri Sembilan"    , state: "Negeri Sembilan", type: "Perodua Service Centre" , lat: 2.7297  , lng: 101.9381 , phone: "06-762 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc29", name: "Perodua Service Centre Kuantan"                  , area: "Kuantan"           , address: "No. 15, Jalan Beserah, 25300 Kuantan, Pahang"                        , state: "Pahang"       , type: "Perodua Service Centre" , lat: 3.8200  , lng: 103.3260 , phone: "09-515 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc18", name: "Perodua Service Centre Bukit Mertajam"           , area: "Bukit Mertajam"    , address: "No. 56, Jalan Rozhan, 14000 Bukit Mertajam, Penang"                  , state: "Penang"       , type: "Perodua Service Centre" , lat: 5.3632  , lng: 100.4629 , phone: "04-538 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc17", name: "Perodua Service Centre Butterworth"              , area: "Butterworth"       , address: "No. 1, Jalan Bagan Luar, 12000 Butterworth, Penang"                  , state: "Penang"       , type: "Perodua Service Centre" , lat: 5.3993  , lng: 100.3639 , phone: "04-312 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc16", name: "Perodua Service Centre Georgetown"               , area: "Georgetown"        , address: "No. 3, Jalan Masjid Negeri, 11600 Georgetown, Penang"                , state: "Penang"       , type: "Perodua Service Centre" , lat: 5.4076  , lng: 100.3317 , phone: "04-229 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc19", name: "Perodua Service Centre Ipoh"                     , area: "Ipoh"              , address: "No. 2, Jalan Raja Dr Nazrin Shah, 30350 Ipoh, Perak"                 , state: "Perak"        , type: "Perodua Service Centre" , lat: 4.5975  , lng: 101.0901 , phone: "05-241 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc20", name: "Perodua Service Centre Taiping"                  , area: "Taiping"           , address: "No. 5, Jalan Maharajalela, 34000 Taiping, Perak"                     , state: "Perak"        , type: "Perodua Service Centre" , lat: 4.8498  , lng: 100.7354 , phone: "05-807 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc21", name: "Perodua Service Centre Teluk Intan"              , area: "Teluk Intan"       , address: "No. 15, Jalan Changkat Jong, 36000 Teluk Intan, Perak"               , state: "Perak"        , type: "Perodua Service Centre" , lat: 4.0238  , lng: 101.0203 , phone: "05-621 2288"  , hours: "Mon–Sat 8am–6pm" },
        { id: "sc30", name: "Perodua Service Centre Kota Kinabalu"            , area: "Kota Kinabalu"     , address: "Lot 1, Jalan Lintas, Kolombong, 88300 Kota Kinabalu, Sabah"          , state: "Sabah"        , type: "Perodua Service Centre" , lat: 5.9804  , lng: 116.0735 , phone: "088-422 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sc31", name: "Perodua Service Centre Kuching"                  , area: "Kuching"           , address: "Lot 1340, Jalan Batu Kawa, 93250 Kuching, Sarawak"                   , state: "Sarawak"      , type: "Perodua Service Centre" , lat: 1.5432  , lng: 110.3592 , phone: "082-611 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sel-036", name: "Perodua Service Centre"                          , area: "Bukit Raja"        , address: "Bukit Raja, Klang, Selangor"                                         , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.0700  , lng: 101.4750 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-037", name: "Perodua Service Centre"                          , area: "Glenmarie"         , address: "Glenmarie, Shah Alam, Selangor"                                      , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.0900  , lng: 101.5600 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-038", name: "Perodua Service Centre"                          , area: "Keramat"           , address: "Keramat, Ampang, Selangor"                                           , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.1750  , lng: 101.7350 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-039", name: "Perodua Service Centre"                          , area: "Klang 2 - Meru"    , address: "Meru, Klang, Selangor"                                               , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.1050  , lng: 101.4200 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-040", name: "Perodua Service Centre"                          , area: "Puchong"           , address: "Puchong, Selangor"                                                   , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.0255  , lng: 101.6195 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-041", name: "Perodua Service Centre"                          , area: "Sabak Bernam"      , address: "Sabak Bernam, Selangor"                                              , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.7800  , lng: 100.9800 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sc6", name: "Perodua Service Centre Ampang"                   , area: "Ampang"            , address: "No. 5, Jalan Mamanda 9, Ampang Point, 68000 Ampang, Selangor"        , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.1560  , lng: 101.7500 , phone: "03-4252 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sel-016", name: "Perodua Service Centre Kajang"                   , area: "Kajang"            , address: "Lot 12, Jalan Zamrud, Off Jalan Cheras, 43000 Kajang, Selangor"      , state: "Selangor"     , type: "Perodua Service Centre" , lat: 2.9934  , lng: 101.7892 , phone: "03-8736 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sc4", name: "Perodua Service Centre Klang"                    , area: "Klang"             , address: "No. 9, Jalan Mohet 40/52, Seksyen 40, 40150 Shah Alam, Selangor"     , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.0333  , lng: 101.4496 , phone: "03-3341 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sel-035", name: "Perodua Service Centre Petaling Jaya"            , area: "Petaling Jaya"     , address: "No. 1, Jalan 19/3, 46300 Petaling Jaya, Selangor"                    , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.1186  , lng: 101.6291 , phone: "03-7956 1188" , hours: "Mon–Sat 8am–6pm" },
        { id: "sel-020", name: "Perodua Service Centre Rawang"                   , area: "Rawang"            , address: "No. 2, Jalan Besar, 48000 Rawang, Selangor"                          , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.3193  , lng: 101.5739 , phone: "03-6091 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sel-008", name: "Perodua Service Centre Shah Alam"                , area: "Shah Alam"         , address: "No. 3, Jalan Plumbum V7/V, Seksyen 7, 40000 Shah Alam, Selangor"     , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.0742  , lng: 101.5183 , phone: "03-5512 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sel-042", name: "Perodua Service Centre Subang Jaya"              , area: "Subang Jaya"       , address: "Lot 2, Jalan SS15/4C, 47500 Subang Jaya, Selangor"                   , state: "Selangor"     , type: "Perodua Service Centre" , lat: 3.0785  , lng: 101.5874 , phone: "03-5637 2288" , hours: "Mon–Sat 8am–6pm" },
        { id: "sel-001", name: "AAW Solutions Sdn. Bhd."                         , area: "Ampang"            , address: "Ampang, Selangor"                                                    , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1500  , lng: 101.7600 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-004", name: "Accesscorp Automobile Sdn. Bhd."                 , area: "Bukit Mahkota"     , address: "Bukit Mahkota, Bangi, Selangor"                                      , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9726  , lng: 101.7956 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-005", name: "Alesmo Auto Technical Sdn. Bhd."                 , area: "Puchong"           , address: "Puchong, Selangor"                                                   , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0255  , lng: 101.6200 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-002", name: "ALM Autoserve Sdn. Bhd."                         , area: "Cyberjaya"         , address: "Cyberjaya, Selangor"                                                 , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9213  , lng: 101.6559 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-003", name: "ANM Automobile Sdn. Bhd."                        , area: "Ampang"            , address: "Ampang, Selangor"                                                    , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1480  , lng: 101.7580 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-006", name: "Autocraft Motor Carriages Sdn. Bhd."             , area: "Petaling Jaya"     , address: "Petaling Jaya, Selangor"                                             , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1073  , lng: 101.6067 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-007", name: "Cekap Platinum Sdn. Bhd."                        , area: "Subang Jaya"       , address: "Subang Jaya, Selangor"                                               , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0570  , lng: 101.5800 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-015", name: "Dasuki Motors Sdn. Bhd."                         , area: "Hulu Kelang"       , address: "Hulu Kelang, Ampang, Selangor"                                       , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1850  , lng: 101.7750 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-009", name: "DC Auto Services Sdn. Bhd."                      , area: "Batu Caves"        , address: "Batu Caves, Selangor"                                                , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2379  , lng: 101.6840 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-010", name: "DMM Sales Sdn. Bhd."                             , area: "Desa Coalfields"   , address: "Desa Coalfields, Sungai Buloh, Selangor"                             , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1800  , lng: 101.5500 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-011", name: "DMM Sales Sdn. Bhd."                             , area: "Petaling Jaya"     , address: "Petaling Jaya, Selangor"                                             , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1186  , lng: 101.6350 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-012", name: "DMM Sales Sdn. Bhd."                             , area: "Selayang"          , address: "Selayang, Selangor"                                                  , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2580  , lng: 101.6400 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-013", name: "DMM Sales Sdn. Bhd."                             , area: "Seri Kembangan"    , address: "Seri Kembangan, Selangor"                                            , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0200  , lng: 101.7100 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-014", name: "DMM Sales Sdn. Bhd."                             , area: "Shah Alam"         , address: "Shah Alam, Selangor"                                                 , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0850  , lng: 101.5320 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-017", name: "Frontline Motor Sdn. Bhd."                       , area: "Bandar Baru Bangi" , address: "Bandar Baru Bangi, Selangor"                                         , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9600  , lng: 101.7800 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-018", name: "G-Mart Holdings Sdn Bhd"                         , area: "Hulu Langat"       , address: "Hulu Langat, Selangor"                                               , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0000  , lng: 101.8300 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-019", name: "G-Mart Holdings Sdn Bhd"                         , area: "Kajang"            , address: "Kajang, Selangor"                                                    , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9980  , lng: 101.7920 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-021", name: "Hajoon Sdn Bhd"                                  , area: "Batu Caves"        , address: "Batu Caves, Selangor"                                                , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2400  , lng: 101.6820 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-022", name: "IGreen Automobile Sdn Bhd"                       , area: "Subang Jaya"       , address: "Subang Jaya, Selangor"                                               , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0560  , lng: 101.5830 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-023", name: "Jahim Auto Sdn Bhd"                              , area: "Selangor"          , address: "Selangor"                                                            , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0738  , lng: 101.5200 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-024", name: "Jiwa Panduan Sdn. Bhd."                          , area: "Sepang"            , address: "Sepang, Selangor"                                                    , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.7301  , lng: 101.7037 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-025", name: "KD Dynamic Auto Sdn. Bhd."                       , area: "Sungai Buloh"      , address: "Sungai Buloh, Selangor"                                              , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2050  , lng: 101.5770 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-026", name: "Kean Tat Car Services Sdn Bhd"                   , area: "Jalan Reko"        , address: "Jalan Reko, Kajang, Selangor"                                        , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9850  , lng: 101.7700 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-027", name: "Kemuning Express Sdn. Bhd."                      , area: "Shah Alam"         , address: "Kemuning, Shah Alam, Selangor"                                       , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0450  , lng: 101.5450 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-028", name: "Lon G Setia Auto Sdn. Bhd."                      , area: "Kayu Ara"          , address: "Kayu Ara, Petaling Jaya, Selangor"                                   , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1350  , lng: 101.6050 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-029", name: "Lon G Setia Auto Sdn. Bhd."                      , area: "Kinrara"           , address: "Kinrara, Puchong, Selangor"                                          , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0480  , lng: 101.6450 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-030", name: "Motors Confidence (M) Sdn. Bhd."                 , area: "Kuala Selangor"    , address: "No 2, Lot 635, Jalan Klang KM 1, 45000 Kuala Selangor, Selangor"     , state: "Selangor"     , type: "Authorised Dealer"      , stakeholder: true, lat: 3.3400  , lng: 101.2600 , phone: "03-3289 4424" , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-031", name: "Motors Confidence (M) Sdn. Bhd."                 , area: "Petaling Jaya"     , address: "Petaling Jaya, Selangor"                                             , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1100  , lng: 101.6150 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-032", name: "Nagoya Automobile Malaysia Holding Sdn. Bhd."    , area: "Bukit Sentosa"     , address: "Bukit Sentosa, Rawang, Selangor"                                     , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.3750  , lng: 101.5500 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-033", name: "P.B Motor Sdn. Bhd."                             , area: "Klang"             , address: "Klang, Selangor"                                                     , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0444  , lng: 101.4480 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-034", name: "PSSB Semenyih"                                   , area: "Semenyih"          , address: "Semenyih, Selangor"                                                  , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9350  , lng: 101.8450 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-043", name: "Reign Carcare Sdn. Bhd."                         , area: "Shah Alam"         , address: "Shah Alam, Selangor"                                                 , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0800  , lng: 101.5280 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-044", name: "Roda Kayangan Services Sdn. Bhd."                , area: "Puchong"           , address: "Puchong, Selangor"                                                   , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0300  , lng: 101.6250 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-045", name: "Rohamas Pro Autoserv Sdn. Bhd."                  , area: "Selangor"          , address: "Selangor"                                                            , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0738  , lng: 101.5600 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-046", name: "S.Y.Y. Holdings Sdn. Bhd."                       , area: "Setia Alam"        , address: "Setia Alam, Shah Alam, Selangor"                                     , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1100  , lng: 101.4900 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-047", name: "Sentell Jaya Sdn. Bhd."                          , area: "Sungai Buloh"      , address: "Sungai Buloh, Selangor"                                              , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2100  , lng: 101.5800 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-048", name: "Seri Kembangan Auto Sdn Bhd"                     , area: "Seri Kembangan"    , address: "Seri Kembangan, Selangor"                                            , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0180  , lng: 101.7080 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-049", name: "Silver Tools (M) Sdn. Bhd."                      , area: "Klang"             , address: "Klang, Selangor"                                                     , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0380  , lng: 101.4430 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-050", name: "Soong Meng Service Sdn. Bhd."                    , area: "Batu Caves"        , address: "Batu Caves, Selangor"                                                , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2360  , lng: 101.6860 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-051", name: "Superservis Quickstop Station"                   , area: "Batu Caves"        , address: "Batu Caves, Selangor"                                                , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2420  , lng: 101.6830 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-052", name: "Syarikat Perniagaan Soon Lee Sdn. Bhd."          , area: "Banting"           , address: "Banting, Selangor"                                                   , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.8100  , lng: 101.5050 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-053", name: "Takzim Dinamik Sdn. Bhd."                        , area: "Shah Alam"         , address: "Shah Alam, Selangor"                                                 , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0780  , lng: 101.5220 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-054", name: "Utama Motor Workshop (Sel) Sdn. Bhd."            , area: "Port Klang"        , address: "Port Klang, Selangor"                                                , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9983  , lng: 101.3987 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-055", name: "YBK Services Sdn Bhd"                            , area: "Shah Alam"         , address: "Shah Alam, Selangor"                                                 , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0760  , lng: 101.5350 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-056", name: "Yong Motor Services Sdn. Bhd."                   , area: "Kajang"            , address: "Kajang, Selangor"                                                    , state: "Selangor"     , type: "Authorised Dealer"      , lat: 2.9910  , lng: 101.7870 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-057", name: "Yusmanida Auto Sdn Bhd"                          , area: "Puncak Alam"       , address: "Puncak Alam, Selangor"                                               , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.2400  , lng: 101.4600 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-058", name: "Yusmanida Auto Sdn. Bhd."                        , area: "Seri Pristiana"    , address: "Seri Pristiana, Bestari Jaya, Selangor"                              , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.3500  , lng: 101.3800 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-059", name: "Zamahan Sdn Bhd"                                 , area: "Puncak Perdana"    , address: "Puncak Perdana, Shah Alam, Selangor"                                 , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.1600  , lng: 101.4950 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sel-060", name: "Zumitas Sdn Bhd"                                 , area: "Selangor"          , address: "Selangor"                                                            , state: "Selangor"     , type: "Authorised Dealer"      , lat: 3.0738  , lng: 101.5183 , phone: ""             , hours: "Mon-Sat 8am-6pm" },
        { id: "sc28", name: "Perodua Service Centre Kuala Terengganu"         , area: "Kuala Terengganu"  , address: "No. 1, Jalan Masjid Abidin, 20000 Kuala Terengganu, Terengganu"      , state: "Terengganu"   , type: "Perodua Service Centre" , lat: 5.3296  , lng: 103.1370 , phone: "09-622 2288"  , hours: "Mon–Sat 8am–6pm" }
    ];

    seedWithVersionCheck('serviceCenterTable', peroduaServiceCenters);

    // â”€â”€â”€ (Optional) clear corrupted knowledgeDB so it regenerates â”€â”€â”€â”€
    // localStorage.removeItem('knowledgeDB');

})();
