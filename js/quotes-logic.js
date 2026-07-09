/**
 * quotes-logic.js
 * Implements interactive quotation generation for the Automated Car Service Advisor.
 * Works with Perodua Ativa official schedules and provides fallbacks for other models.
 */

(function () {
    // ─── DOM ELEMENTS ────────────────────────────────────────────────────────
    const modelSel = document.getElementById('model-select');
    const variantSel = document.getElementById('variant-select');
    const regionSel = document.getElementById('region-select');
    const mileageInput = document.getElementById('mileage-input');
    const genBtn = document.getElementById('generate-quote-btn');
    const resultSection = document.getElementById('quote-result-section');
    const quoteTableBody = document.querySelector('#quote-table tbody');
    const grandTotalSpan = document.getElementById('grand-total');
    const saveQuoteBtn = document.getElementById('save-generated-quote-btn');

    let currentGeneratedItems = [];
    let currentCalculatedTotal = 0;
    let activeEditingQuoteID = null; // Track if editing/viewing a saved quote

    // ─── CHECK USER AUTH STATE FOR VISIBILITY ────────────────────────────────
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let isCustomer = true;

    if (currentUser) {
        const employees = window.getTable('employeeTable') || [];
        const isEmp = employees.find(e => e.userID === currentUser.userID);
        if (isEmp) {
            isCustomer = false; // Admins and Employees can view quotes but not generate new ones
        }
    }

    // Apply role-based page layout adjustments
    if (!isCustomer && currentUser) {
        // Hide the form and show a read-only message
        const formGroups = document.querySelectorAll('.form-group, #generate-quote-btn');
        formGroups.forEach(el => el.style.display = 'none');

        const noticeDiv = document.createElement('div');
        noticeDiv.innerHTML = `
            <div style="padding: 18px; background: rgba(227, 24, 55, 0.08); border: 1px solid rgba(227, 24, 55, 0.25); border-radius: 8px; margin-bottom: 2rem; color: #ff4d6d; display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-info-circle" style="font-size: 1.5rem;"></i>
                <div>
                    <strong>Advisor Console:</strong> You are logged in as a <b>${currentUser.role}</b>. The quotation generator is restricted to Customer accounts. However, you can search and manage the entire saved quotations database below.
                </div>
            </div>`;
        const container = document.querySelector('.page-container');
        if (container) {
            container.insertBefore(noticeDiv, container.firstChild);
        }
    }

    // ─── DROPDOWN CASCADING POPULATION ───────────────────────────────────────
    function populateDropdowns() {
        if (!modelSel || !variantSel) return;

        const models = window.getTable('carModelTable') || [];
        const variants = window.getTable('carVariantTable') || [];

        // Clear select fields
        modelSel.innerHTML = '<option value="">Select Model</option>';
        variantSel.innerHTML = '<option value="">Select Variant</option>';

        // Populate Models
        models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.modelID;
            opt.innerText = `${m.brand} ${m.modelName}`;
            modelSel.appendChild(opt);
        });

        // Event listener for model changes (cascading variants)
        modelSel.addEventListener('change', function () {
            const selectedModelID = modelSel.value;
            variantSel.innerHTML = '<option value="">Select Variant</option>';

            if (!selectedModelID) return;

            const filteredVariants = variants.filter(v => v.modelID === selectedModelID);
            filteredVariants.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.variantID;
                opt.innerText = v.variantName;
                variantSel.appendChild(opt);
            });
        });
    }

    // ─── MILEAGE INTELLIGENT ROUNDING ────────────────────────────────────────
    function getStandardMilestone(rawMileage) {
        let mileage = parseInt(rawMileage) || 0;
        if (mileage <= 0) return { rounded: 10000, interval: 10000 };

        // Support low milages like 1,000 and 5,000 KM specifically (e.g. for Alza)
        if (mileage <= 2000) {
            return { rounded: 1000, interval: 1000 };
        }
        if (mileage <= 7500 && mileage > 2000) {
            return { rounded: 5000, interval: 5000 };
        }

        // Round to the nearest 10,000
        let rounded = Math.round(mileage / 10000) * 10000;
        if (rounded <= 7500) rounded = 10000;

        // Wrap around repeats for high milages (repeats every 100k)
        let interval = rounded % 100000;
        if (interval === 0) interval = 100000;

        return { rounded, interval };
    }

    // ─── FALLBACK GENERIC SERVICE package GENERATOR ──────────────────────────
    function generateGenericPackage(modelID, variantID, interval, region) {
        const isPeninsular = (region === 'Peninsular');
        const variants = window.getTable('carVariantTable') || [];
        const variant = variants.find(v => v.variantID === variantID);
        const variantName = variant ? variant.variantName.toUpperCase() : '';

        const isCVT = variantName.includes('CVT') || variantName.includes('AUTO') || variantName.includes('AV');
        const isMT = variantName.includes('MT') || variantName.includes('MANUAL');

        const items = [];

        // 1. Core items (Engine Oil, Filter, Gasket)
        const engineOilPricePen = selectedOlderModel(modelID) ? 89.00 : 159.00;
        const engineOilPriceEM = selectedOlderModel(modelID) ? 95.00 : 165.00;
        const engineOilName = selectedOlderModel(modelID) 
            ? "Perodua Engine Oil Semi Syn 5W-30 3L" 
            : "Perodua Engine Oil Fully Syn 0W-20 3.5L";

        items.push({
            name: engineOilName,
            qty: 1,
            peninsular: engineOilPricePen,
            em: engineOilPriceEM,
            type: "Part",
            code: "OIL-FS-0W20"
        });

        items.push({
            name: "Element S/A Oil Filter",
            qty: 1,
            peninsular: 18.00,
            em: 20.00,
            type: "Part",
            code: "FLT-OIL-GEN"
        });

        items.push({
            name: "Drain Plug Gasket - Engine Oil",
            qty: 1,
            peninsular: 3.00,
            em: 3.20,
            type: "Part",
            code: "GSK-ENG-GEN"
        });

        // 2. Air Cabin Filter (Air Refiner) - Every 20k
        if (interval % 20000 === 0) {
            items.push({
                name: "Element, Air Refiner (Cabin)",
                qty: 1,
                peninsular: 32.00,
                em: 34.00,
                type: "Part",
                code: "FLT-CABIN"
            });
        }

        // 3. Air Cleaner Filter & Brake Fluid - Every 40k
        if (interval % 40000 === 0) {
            items.push({
                name: "Element S/A Air Cleaner Filter",
                qty: 1,
                peninsular: 48.00,
                em: 52.00,
                type: "Part",
                code: "FLT-AIR-GEN"
            });
            items.push({
                name: "Brake Fluid 1.0L",
                qty: 1,
                peninsular: 25.00,
                em: 26.50,
                type: "Part",
                code: "FLD-BRK-DOT3"
            });
        }

        // 4. Spark Plugs & Transmission Fluid - At 100k KM
        if (interval === 100000) {
            items.push({
                name: "Spark Plugs (Set of 3)",
                qty: 1,
                peninsular: 60.00,
                em: 65.00,
                type: "Part",
                code: "SPK-STD-GEN"
            });

            if (isCVT) {
                items.push({
                    name: "CVT Transmission Fluid 1.0L",
                    qty: 3,
                    peninsular: 135.00, // total for 3 bottles
                    em: 144.00,
                    type: "Part",
                    code: "FLD-CVT-GEN"
                });
                items.push({
                    name: "Drain Plug Gasket - CVT",
                    qty: 1,
                    peninsular: 3.50,
                    em: 4.00,
                    type: "Part",
                    code: "GSK-CVT-GEN"
                });
            }
        }

        // Add Manual transmission oil at 40k or 80k for manual variant
        if (isMT && (interval === 40000 || interval === 80000)) {
            items.push({
                name: "Manual Transmission Fluid (90W)",
                qty: 2,
                peninsular: 44.00,
                em: 48.00,
                type: "Part",
                code: "FLD-MT-GEN"
            });
        }

        // 5. Labour Charges (Milestone dependent)
        let labor = 50.00;
        if (interval === 10000 || interval === 50000 || interval === 90000) {
            labor = 0.00; // Standard free labor for Perodua first minor services
        } else if (interval === 20000 || interval === 60000) {
            labor = 75.00;
        } else if (interval === 30000 || interval === 70000) {
            labor = 50.00;
        } else if (interval === 40000 || interval === 80000) {
            labor = 110.00;
        } else if (interval === 100000) {
            labor = 85.00;
        }

        items.push({
            name: "Labour Charges",
            qty: 1,
            peninsular: labor,
            em: labor,
            type: "Labour",
            code: "SVC-LABOUR"
        });

        // 6. SST Tax (8% of Labour)
        const sst = labor * 0.08;
        items.push({
            name: "SST (8%)",
            qty: 1,
            peninsular: sst,
            em: sst,
            type: "Tax",
            code: "SVC-SST"
        });

        // Calculate Totals
        let totalPeninsular = 0;
        let totalEM = 0;
        items.forEach(x => {
            totalPeninsular += x.peninsular;
            totalEM += x.em;
        });

        return {
            modelID,
            mileage: interval,
            items,
            totalPeninsular,
            totalEM
        };
    }

    function selectedOlderModel(modelID) {
        // Kenari(m7), Kembara(m8), Kelisa(m9), Kancil(m10), Viva(m11)
        return ['m7', 'm8', 'm9', 'm10', 'm11'].includes(modelID);
    }

    // ─── QUOTATION GENERATOR CALCULATION ─────────────────────────────────────
    async function generateQuote() {
        const modelID = modelSel.value;
        const variantID = variantSel.value;
        const interval = parseInt(mileageInput.value);
        const region = regionSel.value;

        if (!modelID || !variantID || isNaN(interval) || !region) {
            alert('Please complete all selections to generate a quote.');
            return;
        }

        // Check if official seeded schedule exists (supports filtering by transmission type)
        const schedules = window.getTable('serviceScheduleTable') || [];
        const variants = window.getTable('carVariantTable') || [];
        const variant = variants.find(v => v.variantID === variantID);
        const variantName = variant ? variant.variantName.toUpperCase() : '';
        const isMT = variantName.includes('MT') || variantName.includes('MANUAL');
        const transmissionType = isMT ? 'Manual' : 'Automatic';

        let servicePkg = schedules.find(s => {
            if (s.modelID !== modelID || s.mileage !== interval) return false;
            if (s.transmission && s.transmission !== transmissionType) return false;
            if (s.variantSubstr && !variantName.includes(s.variantSubstr.toUpperCase())) return false;
            return true;
        });

        // If no official seeded data, generate robust generic fallback package
        if (!servicePkg) {
            servicePkg = generateGenericPackage(modelID, variantID, interval, region);
        }

        const isPeninsular = region === 'Peninsular';

        // Render rows in the DOM
        quoteTableBody.innerHTML = '';
        currentGeneratedItems = [];
        currentCalculatedTotal = 0;

        // Retrieve live parts data to apply dynamic pricing updates directly from MySQL via API
        let liveParts = [];
        try {
            const response = await fetch('/api/parts');
            if (response.ok) {
                liveParts = await response.json();
            }
        } catch (err) {
            console.warn("Failed to fetch live parts from MySQL, falling back to static/cached pricing", err);
            liveParts = window.getTable('servicePartTable') || [];
        }

        const partsMapping = {
            "OIL-SS": ["Semi Syn", "Semi-Synthetic"],
            "OIL-FS": ["Fully Syn", "Fully-Synthetic"],
            "FLT-OIL": ["Oil Filter"],
            "FLT-AIR": ["Air Cleaner", "Air Filter"],
            "FLT-CABIN": ["Cabin", "Air Refiner"],
            "SPK-NI": ["Spark Plugs"],
            "FLD-CVT": ["CVT"],
            "FLD-MT-GEN": ["Manual Transmission Fluid"],
            "FLD-BRK": ["Brake Fluid"],
            "SVC-LAB": ["Labour Charges", "Labour"]
        };

        servicePkg.items.forEach((item, index) => {
            let price = isPeninsular ? item.peninsular : item.em;
            let itemCode = item.code || (item.type === 'Part' ? `PE-PT-${100 + index}` : `PE-SV-${100 + index}`);
            let itemName = item.name;

            // Apply Live Part Pricing
            for (let dbPart of liveParts) {
                let keywords = partsMapping[dbPart.partCode] || [dbPart.partName];
                let matches = keywords.some(k => itemName.toLowerCase().includes(k.toLowerCase()));
                if (item.code === dbPart.partCode || matches) {
                    let emOffset = item.em - item.peninsular; // Preserve hardcoded EM offset
                    
                    // If the item has qty > 1 and the hardcoded DB price is a unit price, 
                    // we multiply it here. Wait, the hardcoded db-init might have total prices.
                    // Actually, dbPart.price is unit price. 
                    let unitPrice = dbPart.price;
                    let qty = item.qty || 1;
                    
                    // The old code did: `const subtotal = price; // already multiplied`
                    // So `item.peninsular` is the total price for that row.
                    // If we use live unitPrice, we must multiply by qty.
                    let totalLivePeninsular = unitPrice * qty;
                    
                    price = isPeninsular ? totalLivePeninsular : (totalLivePeninsular + emOffset);
                    itemCode = dbPart.partCode;
                    break;
                }
            }

            const subtotal = price; 
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: var(--text-light);">${itemName}</td>
                <td style="font-family: monospace; color: var(--text-muted);">${itemCode}</td>
                <td style="text-align: right;">RM ${price.toFixed(2)}</td>
                <td style="text-align: center;">${(item.type === 'Part' && item.qty > 0) ? item.qty : '-'}</td>
                <td style="text-align: right; font-weight: 700; color: var(--primary-accent);">RM ${subtotal.toFixed(2)}</td>
            `;
            quoteTableBody.appendChild(tr);

            currentGeneratedItems.push({
                name: item.name,
                code: itemCode,
                price: price,
                qty: item.qty,
                type: item.type,
                subtotal: subtotal
            });

            currentCalculatedTotal += subtotal;
        });

        // Set Grand Total
        grandTotalSpan.innerText = `RM ${currentCalculatedTotal.toFixed(2)}`;

        // Display results block with micro-animations
        resultSection.style.display = 'block';
        resultSection.style.opacity = '0';
        resultSection.style.transform = 'translateY(15px)';
        resultSection.style.transition = 'all 0.4s ease';
        
        requestAnimationFrame(() => {
            resultSection.style.opacity = '1';
            resultSection.style.transform = 'translateY(0)';
        });

        // Scroll to results cleanly
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ─── SAVE QUOTATION TO DATABASE ──────────────────────────────────────────
    function saveQuotation() {
        if (!currentUser) {
            alert("Authentication Required: Please sign in or register to save your quotations.");
            window.location.href = 'signin.html';
            return;
        }

        const modelID = modelSel.value;
        const variantID = variantSel.value;
        const region = regionSel.value;
        const rawMileage = mileageInput.value;

        if (!modelID || !variantID || currentGeneratedItems.length === 0) {
            alert("No quotation data: Please generate a cost estimate first.");
            return;
        }

        const customers = window.getTable('customerTable') || [];
        const customerRecord = customers.find(c => c.userID === currentUser.userID);

        if (!customerRecord) {
            alert("Error: You must be registered as a Customer to save quotes. Staff and Admin accounts are restricted to read-only.");
            return;
        }

        const allQuotes = window.getTable('quotationTable') || [];
        const allQuoteParts = window.getTable('quotationPartTable') || [];

        const today = new Date().toISOString().split('T')[0];

        if (activeEditingQuoteID) {
            // Updating existing quote
            if (!confirm("Are you sure you want to save these updated quotation details?")) {
                return;
            }
            const index = allQuotes.findIndex(q => q.quoteID === activeEditingQuoteID);
            if (index > -1) {
                allQuotes[index].variantID = variantID;
                allQuotes[index].mileage = parseInt(rawMileage);
                allQuotes[index].region = region;
                allQuotes[index].totalCost = currentCalculatedTotal;
                allQuotes[index].date = today;

                window.saveTable('quotationTable', allQuotes);

                // Clear old items and insert fresh
                const filteredParts = allQuoteParts.filter(qp => qp.quoteID !== activeEditingQuoteID);
                const dbItems = [];
                currentGeneratedItems.forEach((item, index) => {
                    const newItem = {
                        quotePartID: `qp_${activeEditingQuoteID.replace('#', '')}_${index}`,
                        quoteID: activeEditingQuoteID,
                        partName: item.name,
                        partCode: item.code,
                        price: item.price,
                        quantity: item.qty,
                        itemType: item.type,
                        subtotal: item.subtotal
                    };
                    filteredParts.push(newItem);
                    dbItems.push(newItem);
                });
                window.saveTable('quotationPartTable', filteredParts);

                // Save to MySQL DB
                fetch('/api/quotes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        quoteID: activeEditingQuoteID,
                        customerID: customerRecord.customerID,
                        variantID: variantID,
                        mileage: parseInt(rawMileage),
                        region: region,
                        totalCost: currentCalculatedTotal,
                        quoteDate: today,
                        items: dbItems
                    })
                }).catch(err => console.error("Failed to sync updated quote to DB", err));

                alert(`Quotation ${activeEditingQuoteID} updated successfully!`);
                activeEditingQuoteID = null; // Clear active editor state
            }
        } else {
            // Generating new quote
            const newQuoteID = "#Q" + String(Math.floor(Math.random() * 900000) + 100000);

            allQuotes.unshift({
                quoteID: newQuoteID,
                customerID: customerRecord.customerID,
                variantID: variantID,
                date: today,
                mileage: parseInt(rawMileage),
                region: region,
                totalCost: currentCalculatedTotal
            });

            window.saveTable('quotationTable', allQuotes);

            // Seed itemized parts mapping table
            const dbItems = [];
            currentGeneratedItems.forEach((item, index) => {
                const newItem = {
                    quotePartID: `qp_${newQuoteID.replace('#', '')}_${index}`,
                    quoteID: newQuoteID,
                    partName: item.name,
                    partCode: item.code,
                    price: item.price,
                    quantity: item.qty,
                    itemType: item.type,
                    subtotal: item.subtotal
                };
                allQuoteParts.push(newItem);
                dbItems.push(newItem);
            });
            window.saveTable('quotationPartTable', allQuoteParts);

            // Save to MySQL DB
            fetch('/api/quotes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quoteID: newQuoteID,
                    customerID: customerRecord.customerID,
                    variantID: variantID,
                    mileage: parseInt(rawMileage),
                    region: region,
                    totalCost: currentCalculatedTotal,
                    quoteDate: today,
                    items: dbItems
                })
            }).catch(err => console.error("Failed to sync new quote to DB", err));

            alert(`Quotation ${newQuoteID} created and saved successfully!`);
        }

        // Re-render recent quotes panel and clear/reset form
        renderRecentQuotesPanel();
        resultSection.style.display = 'none';
        mileageInput.value = '';
        modelSel.value = '';
        variantSel.innerHTML = '<option value="">Select Variant</option>';
    }

    // ─── RECENT QUOTATIONS DATABASE VIEW PANEL ───────────────────────────────
    function renderRecentQuotesPanel() {
        const pageContainer = document.querySelector('.page-container');
        if (!pageContainer) return;

        // Clear existing panel if present
        const oldPanel = document.getElementById('past-quotes-section');
        if (oldPanel) oldPanel.remove();

        const allQuotes = window.getTable('quotationTable') || [];
        if (allQuotes.length === 0) return; // No quotes to display

        let filteredQuotes = [];
        let showDelete = false;

        const employees = window.getTable('employeeTable') || [];
        const empRecord = currentUser ? employees.find(e => e.userID === currentUser.userID) : null;
        
        const customers = window.getTable('customerTable') || [];
        const cusRecord = currentUser ? customers.find(c => c.userID === currentUser.userID) : null;

        if (empRecord) {
            filteredQuotes = allQuotes; // Staff/Admin can view all quotations database
            if (empRecord.position === 'Admin') showDelete = true; // Only Admin can delete saved records
        } else if (cusRecord) {
            filteredQuotes = allQuotes.filter(q => q.customerID === cusRecord.customerID); // Customers only view their quotes
            showDelete = true; // Customers can delete their own quotes
        } else {
            return; // Guest users don't see any dashboard
        }

        if (filteredQuotes.length === 0) return;

        const models = window.getTable('carModelTable') || [];
        const variants = window.getTable('carVariantTable') || [];

        const panelDiv = document.createElement('div');
        panelDiv.id = 'past-quotes-section';
        panelDiv.style.cssText = 'margin-top: 3.5rem; border-top: 2px solid #eaeaea; padding-top: 2rem; color: #111;';

        const title = empRecord ? "All Quotations Database (Staff View)" : "My Saved Estimates & Maintenance Records";
        
        let html = `
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #111; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-history" style="color: var(--primary-green);"></i> ${title}
            </h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">`;

        filteredQuotes.forEach(q => {
            const variant = variants.find(v => v.variantID === q.variantID);
            const model = variant ? models.find(m => m.modelID === variant.modelID) : null;
            const modelName = model ? `${model.brand} ${model.modelName}` : "Vehicle";
            const variantName = variant ? variant.variantName : "";
            
            html += `
                <div class="saved-quote-card" id="card-${q.quoteID.replace('#', '')}" style="background: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03); flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <div style="font-size: 1.15rem; font-weight: 700; color: #222; margin-bottom: 4px;">
                            ${q.quoteID} — ${modelName.toUpperCase()}
                        </div>
                        <div style="font-size: 0.88rem; color: #666; display: flex; gap: 12px; flex-wrap: wrap;">
                            <span><i class="fas fa-cogs"></i> ${variantName}</span>
                            <span><i class="fas fa-tachometer-alt"></i> ${parseInt(q.mileage).toLocaleString()} KM</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${q.region || 'Peninsular'}</span>
                            <span><i class="fas fa-calendar-alt"></i> ${q.date}</span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1.5rem;">
                        <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary-red); font-family: 'Montserrat', sans-serif;">
                            RM ${parseFloat(q.totalCost).toFixed(2)}
                        </div>
                        <div style="display: flex; gap: 8px;">
                            ${isCustomer ? `<button class="view-q-btn btn-secondary" data-id="${q.quoteID}" style="padding: 6px 12px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase;"><i class="fas fa-edit"></i> Edit / View</button>` : ''}
                            ${showDelete ? `<button class="delete-q-btn btn-danger" data-id="${q.quoteID}" style="padding: 6px 12px; font-size: 0.78rem; font-weight: 700; background: #e31837; border-color: #e31837; text-transform: uppercase;"><i class="fas fa-trash-alt"></i> Delete</button>` : ''}
                        </div>
                    </div>
                </div>`;
        });

        html += `</div>`;
        panelDiv.innerHTML = html;
        pageContainer.appendChild(panelDiv);

        // Bind View Button Events
        document.querySelectorAll('.view-q-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const qID = this.getAttribute('data-id');
                const quote = allQuotes.find(q => q.quoteID === qID);
                if (!quote) return;

                const variant = variants.find(v => v.variantID === quote.variantID);

                if (variant) {
                    modelSel.value = variant.modelID;
                    
                    // Trigger manual change event to populate variants first
                    const event = new Event('change');
                    modelSel.dispatchEvent(event);

                    variantSel.value = quote.variantID;
                    regionSel.value = quote.region || "Peninsular";
                    mileageInput.value = quote.mileage;

                    activeEditingQuoteID = qID; // Mark editor active
                    
                    generateQuote(); // Auto-calculate and render table
                    
                    // Scroll back to form smoothly
                    document.querySelector('.page-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Bind Delete Button Events
        document.querySelectorAll('.delete-q-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const qID = this.getAttribute('data-id');
                if (!confirm(`Are you sure you want to delete quotation record ${qID}?`)) return;

                let quotes = window.getTable('quotationTable') || [];
                quotes = quotes.filter(q => q.quoteID !== qID);
                window.saveTable('quotationTable', quotes);

                let quoteParts = window.getTable('quotationPartTable') || [];
                quoteParts = quoteParts.filter(qp => qp.quoteID !== qID);
                window.saveTable('quotationPartTable', quoteParts);

                const card = document.getElementById(`card-${qID.replace('#', '')}`);
                if (card) card.remove();

                alert(`Record ${qID} deleted successfully!`);
            });
        });
    }

    // ─── INITIALIZE UPON LOAD ────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        populateDropdowns();

        if (genBtn) {
            genBtn.addEventListener('click', generateQuote);
        }

        if (saveQuoteBtn) {
            saveQuoteBtn.addEventListener('click', saveQuotation);
        }

        renderRecentQuotesPanel();
    });

})();
