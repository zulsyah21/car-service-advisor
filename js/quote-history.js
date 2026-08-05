/**
 * quote-history.js
 * Renders the Quote History page — shows all saved quotations for the
 * current user (customer sees own; staff/admin sees all).
 */

(function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const historyList  = document.getElementById('history-list');
    const searchWrap   = document.getElementById('history-search-wrap');
    const searchInput  = document.getElementById('history-search-input');
    const subtitle     = document.getElementById('history-subtitle');

    // ─── AUTH GUARD ──────────────────────────────────────────────────────────
    if (!currentUser) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔒</div>
                <h3>Sign in to view your quotes</h3>
                <p>You need to be logged in to see your saved service quotations.</p>
                <a href="signin.html" class="btn-cta"><i class="fas fa-sign-in-alt"></i> Sign In Now</a>
            </div>`;
        return;
    }

    // ─── DETERMINE ROLE ──────────────────────────────────────────────────────
    const employees = window.getTable('employeeTable') || [];
    const customers = window.getTable('customerTable') || [];
    const empRecord = employees.find(e => e.userID === currentUser.userID);
    const cusRecord = customers.find(c => c.userID === currentUser.userID);

    const allQuotes     = window.getTable('quotationTable')     || [];
    const allQuoteParts = window.getTable('quotationPartTable') || [];
    const models        = window.getTable('carModelTable')      || [];
    const variants      = window.getTable('carVariantTable')    || [];

    let filteredQuotes = [];
    let showDelete     = false;
    let isStaff        = false;

    if (empRecord) {
        filteredQuotes = allQuotes;
        isStaff        = true;
        showDelete     = (empRecord.position === 'Admin');
        if (subtitle) subtitle.textContent = 'All customer quotations — Staff View';
    } else if (cusRecord) {
        filteredQuotes = allQuotes.filter(q => q.customerID === cusRecord.customerID);
        showDelete     = true;
        if (subtitle) subtitle.textContent = `${filteredQuotes.length} saved estimate${filteredQuotes.length !== 1 ? 's' : ''}`;
    } else {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🚫</div>
                <h3>Access restricted</h3>
                <p>Only registered customers can view saved quotations from this page.</p>
            </div>`;
        return;
    }

    // ─── RENDER ───────────────────────────────────────────────────────────────
    function renderCards(quotes) {
        historyList.innerHTML = '';

        if (quotes.length === 0) {
            const isEmpty = filteredQuotes.length === 0;
            historyList.innerHTML = isEmpty
                ? `<div class="empty-state">
                        <div class="empty-state-icon">🧾</div>
                        <h3>No quotations yet</h3>
                        <p>You haven't saved any service estimates yet. Generate your first quote in seconds!</p>
                        <a href="quotes.html" class="btn-cta"><i class="fas fa-file-invoice-dollar"></i> Get Your Quote Now</a>
                   </div>`
                : `<div style="text-align:center; padding:3rem; color:#aaa;">
                        <i class="fas fa-search" style="font-size:2rem; margin-bottom:1rem; display:block;"></i>
                        No quotes match your search.
                   </div>`;
            return;
        }

        quotes.forEach(q => {
            const variant   = variants.find(v => v.variantID === q.variantID);
            const model     = variant ? models.find(m => m.modelID === variant.modelID) : null;
            const modelName = model   ? `${model.brand} ${model.modelName}` : 'Vehicle';
            const varName   = variant ? variant.variantName : '—';

            const card = document.createElement('div');
            card.className = 'saved-quote-card';
            card.id = `card-${q.quoteID.replace('#', '')}`;
            card.innerHTML = `
                <div>
                    <div style="font-size:1.15rem; font-weight:700; color:#222; margin-bottom:5px;">
                        <span style="color:var(--primary-red, #e31837);">${q.quoteID}</span>
                        &nbsp;—&nbsp;${modelName.toUpperCase()}
                    </div>
                    <div style="font-size:0.87rem; color:#666; display:flex; gap:14px; flex-wrap:wrap; align-items:center;">
                        <span><i class="fas fa-cogs"></i> ${varName}</span>
                        <span><i class="fas fa-tachometer-alt"></i> ${parseInt(q.mileage).toLocaleString()} km</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${q.region || 'Peninsular'}</span>
                        <span><i class="fas fa-calendar-alt"></i> ${q.date}</span>
                        ${isStaff ? `<span style="background:#f0f4ff;color:#3b5bdb;padding:2px 8px;border-radius:6px;font-size:0.78rem;font-weight:600;">Customer: ${q.customerID}</span>` : ''}
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:1.25rem; flex-wrap:wrap;">
                    <div style="font-size:1.45rem; font-weight:800; color:var(--primary-red, #e31837); font-family:'Montserrat',sans-serif; white-space:nowrap;">
                        RM ${parseFloat(q.totalCost).toFixed(2)}
                    </div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <button class="btn-secondary view-q-btn" data-id="${q.quoteID}"
                            style="padding:7px 14px; font-size:0.78rem; font-weight:700; text-transform:uppercase;">
                            <i class="fas fa-eye"></i> View
                        </button>
                        ${showDelete
                            ? `<button class="delete-q-btn btn-danger" data-id="${q.quoteID}"
                                style="padding:7px 14px; font-size:0.78rem; font-weight:700; text-transform:uppercase; background:#e31837; border-color:#e31837;">
                                <i class="fas fa-trash-alt"></i> Delete
                               </button>`
                            : ''}
                    </div>
                </div>`;
            historyList.appendChild(card);
        });

        bindButtons();
    }

    // ─── VIEW MODAL ───────────────────────────────────────────────────────────
    function viewQuoteModal(qID) {
        const q       = filteredQuotes.find(x => x.quoteID === qID);
        const parts   = allQuoteParts.filter(p => p.quoteID === qID);
        const variant = variants.find(v => v.variantID === q.variantID);
        const model   = variant ? models.find(m => m.modelID === variant.modelID) : null;
        const modelName = model ? `${model.brand} ${model.modelName}` : 'Vehicle';

        if (!q) return;

        let rowsHTML = parts.map(p => `
            <tr>
                <td style="font-weight:600;">${p.partName}</td>
                <td style="font-family:monospace; color:#888; font-size:0.82rem;">${p.partCode || '—'}</td>
                <td style="text-align:right;">RM ${parseFloat(p.price).toFixed(2)}</td>
                <td style="text-align:center;">${p.quantity || 1}</td>
                <td style="text-align:center;">${p.itemType || '—'}</td>
                <td style="text-align:right; font-weight:700; color:var(--primary-red,#e31837);">RM ${parseFloat(p.subtotal).toFixed(2)}</td>
            </tr>`).join('');

        // Use showModal if available, otherwise alert
        if (window.showModal) {
            window.showModal({
                title: `${qID} — ${modelName}`,
                message: `
                    <div style="font-size:0.85rem; color:#666; margin-bottom:1rem; display:flex; gap:16px; flex-wrap:wrap;">
                        <span><i class="fas fa-cogs"></i> ${variant ? variant.variantName : '—'}</span>
                        <span><i class="fas fa-tachometer-alt"></i> ${parseInt(q.mileage).toLocaleString()} km</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${q.region || 'Peninsular'}</span>
                        <span><i class="fas fa-calendar-alt"></i> ${q.date}</span>
                    </div>
                    <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse; font-size:0.83rem;">
                        <thead>
                            <tr style="background:#111; color:#fff;">
                                <th style="padding:8px 10px; text-align:left;">Part / Service</th>
                                <th style="padding:8px 10px; text-align:left;">Code</th>
                                <th style="padding:8px 10px; text-align:right;">Price</th>
                                <th style="padding:8px 10px; text-align:center;">Qty</th>
                                <th style="padding:8px 10px; text-align:center;">Type</th>
                                <th style="padding:8px 10px; text-align:right;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHTML || '<tr><td colspan="6" style="text-align:center;padding:1rem;color:#aaa;">No parts data available</td></tr>'}</tbody>
                    </table>
                    </div>
                    <div style="text-align:right; margin-top:1rem; font-size:1.2rem; font-weight:800; color:var(--primary-red,#e31837);">
                        Grand Total: RM ${parseFloat(q.totalCost).toFixed(2)}
                    </div>`,
                type: 'info',
                confirmText: 'Print / Save PDF',
                cancelText: 'Close',
                onConfirm: () => printQuote(q, parts, modelName, variant ? variant.variantName : '')
            });
        }
    }

    // ─── PRINT A SAVED QUOTE ─────────────────────────────────────────────────
    function printQuote(q, parts, modelName, variantName) {
        const today = new Date(q.date).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });
        let rowsHTML = parts.map(p => {
            const isMandatory = ['OIL-FS-0W20','OIL-SS','FLT-OIL','GSK-ENG','SVC-LABOUR','SVC-LAB','SVC-SST'].some(c => (p.partCode||'').startsWith(c))
                || ['engine oil','oil filter','drain plug','labour','sst'].some(k => (p.partName||'').toLowerCase().includes(k));
            const badge = isMandatory
                ? 'display:inline-block;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:700;background:#ffe5e9;color:#c0003c;border:1px solid #f5b8c4;'
                : 'display:inline-block;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:700;background:#fff7e0;color:#a06000;border:1px solid #f5d87a;';
            return `<tr>
                <td>${p.partName}</td>
                <td>${p.partCode || '—'}</td>
                <td>RM ${parseFloat(p.price).toFixed(2)}</td>
                <td>${p.quantity || 1}</td>
                <td><span style="${badge}">${isMandatory ? 'Required' : 'Recommended'}</span></td>
                <td>RM ${parseFloat(p.subtotal).toFixed(2)}</td>
            </tr>`;
        }).join('');

        const printArea = document.getElementById('print-area');
        printArea.innerHTML = `
            <div class="print-header">
                <h2>Service Quotation</h2>
                <p>Web-Based Automated Car Service Advisor (WACSA)</p>
            </div>
            <div class="print-meta">
                <div>
                    <strong>Vehicle:</strong> ${modelName} — ${variantName}<br>
                    <strong>Mileage:</strong> ${parseInt(q.mileage).toLocaleString()} km<br>
                    <strong>Region:</strong> ${q.region || 'Peninsular'}
                </div>
                <div style="text-align:right;">
                    <strong>Quote ID:</strong> ${q.quoteID}<br>
                    <strong>Date:</strong> ${today}
                </div>
            </div>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>Part / Service</th><th>Code</th><th>Unit Price</th>
                        <th>Qty</th><th>Status</th><th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>
            <div class="print-total">Grand Total: RM ${parseFloat(q.totalCost).toFixed(2)}</div>
            <div class="print-footer">
                Thank you for using WACSA — Authorised Perodua Service Advisor System<br>
                Printed on ${today}
            </div>`;

        printArea.style.display = 'block';
        window.print();
        printArea.style.display = 'none';
    }

    // ─── DELETE ───────────────────────────────────────────────────────────────
    function deleteQuote(qID) {
        window.showModal({
            title: 'Delete Quotation',
            message: `Are you sure you want to permanently delete quotation <strong>${qID}</strong>? This cannot be undone.`,
            type: 'warning',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: () => {
                // Remove from DB via API
                fetch(`/api/quotes/${encodeURIComponent(qID)}`, { method: 'DELETE' })
                    .catch(err => console.warn('API delete failed:', err));

                // Remove from localStorage
                let quotes = window.getTable('quotationTable') || [];
                quotes = quotes.filter(q => q.quoteID !== qID);
                window.saveTable('quotationTable', quotes);

                let qParts = window.getTable('quotationPartTable') || [];
                qParts = qParts.filter(p => p.quoteID !== qID);
                window.saveTable('quotationPartTable', qParts);

                // Remove from in-memory list and re-render
                const idx = filteredQuotes.findIndex(q => q.quoteID === qID);
                if (idx > -1) filteredQuotes.splice(idx, 1);

                window.showToast(`Quotation ${qID} deleted.`, 'success');
                applySearch();
            }
        });
    }

    // ─── BIND BUTTON EVENTS ───────────────────────────────────────────────────
    function bindButtons() {
        document.querySelectorAll('.view-q-btn').forEach(btn => {
            btn.addEventListener('click', () => viewQuoteModal(btn.getAttribute('data-id')));
        });
        document.querySelectorAll('.delete-q-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteQuote(btn.getAttribute('data-id')));
        });
    }

    // ─── SEARCH ───────────────────────────────────────────────────────────────
    function applySearch() {
        const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
        if (!query) {
            renderCards(filteredQuotes);
            return;
        }
        const results = filteredQuotes.filter(q => {
            const variant   = variants.find(v => v.variantID === q.variantID);
            const model     = variant ? models.find(m => m.modelID === variant.modelID) : null;
            const modelName = model ? `${model.brand} ${model.modelName}` : '';
            return (
                q.quoteID.toLowerCase().includes(query) ||
                modelName.toLowerCase().includes(query)  ||
                (q.date || '').includes(query)           ||
                (q.region || '').toLowerCase().includes(query)
            );
        });
        renderCards(results);
    }

    if (searchInput) {
        searchInput.addEventListener('input', applySearch);
    }

    // ─── INIT ─────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        if (filteredQuotes.length > 0 && searchWrap) {
            searchWrap.style.display = 'flex';
        }
        renderCards(filteredQuotes);
    });

})();
