/**
 * script.js
 * Core Javascript for the Automated Car Service Advisor.
 * Provides global storage helpers, page-wide navbar auth states, and the AI Chatbot widget.
 */

// ─── GLOBAL API REDIRECTION FOR DUAL PORT DEVELOPMENTS ───────────────────────
// Only rewrite /api/ calls to localhost:3000 when the page is opened as a
// raw file (file://) without a server — e.g. a developer double-clicking index.html.
// On cloud or any real server, relative /api/ paths work correctly and are left alone.
(function() {
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        if (typeof input === 'string' && input.startsWith('/api/')) {
            if (window.location.protocol === 'file:') {
                // Running as a local file without a server — point to local dev server
                input = `http://localhost:3000${input}`;
            }
            // On any real server (localhost with correct port, or cloud), use relative path as-is
        }
        return originalFetch(input, init);
    };
})();

// ─── GLOBAL LOCALSTORAGE DATABASE HELPERS ────────────────────────────────────
window.getTable = function (name) {
    try {
        const data = localStorage.getItem(name);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(`Error reading table ${name}:`, e);
        return [];
    }
};

window.saveTable = function (name, data) {
    try {
        localStorage.setItem(name, JSON.stringify(data));
    } catch (e) {
        console.error(`Error writing table ${name}:`, e);
    }
};

// ─── AUTHENTICATION STATE & NAVBAR INITIALIZATION ────────────────────────────
function initNavbar() {
    const authContainer = document.getElementById('main-nav-auth');
    if (!authContainer) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        let dropdownHtml = '';
        if (currentUser.role === 'Admin') {
            dropdownHtml = `
                <div class="mgmt-dropdown">
                    <span class="mgmt-dropdown-btn"><i class="fas fa-cog"></i> Admin Panel <i class="fas fa-caret-down" style="font-size: 0.75rem; margin-left: 3px;"></i></span>
                    <div class="mgmt-dropdown-content">
                        <a href="users.html"><i class="fas fa-users"></i> Manage Users</a>
                        <a href="parts.html"><i class="fas fa-cogs"></i> Manage Parts</a>
                        <a href="profile.html"><i class="fas fa-user-circle"></i> My Profile</a>
                        <a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
                    </div>
                </div>`;
        } else if (currentUser.role === 'Employee') {
            dropdownHtml = `
                <div class="mgmt-dropdown">
                    <span class="mgmt-dropdown-btn"><i class="fas fa-tools"></i> Advisor Menu <i class="fas fa-caret-down" style="font-size: 0.75rem; margin-left: 3px;"></i></span>
                    <div class="mgmt-dropdown-content">
                        <a href="parts.html"><i class="fas fa-cogs"></i> Manage Parts</a>
                        <a href="profile.html"><i class="fas fa-user-circle"></i> My Profile</a>
                        <a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
                    </div>
                </div>`;
        } else {
            // Customer
            dropdownHtml = `
                <div class="mgmt-dropdown">
                    <span class="mgmt-dropdown-btn"><i class="fas fa-user-circle"></i> ${currentUser.fullName || currentUser.username} <i class="fas fa-caret-down" style="font-size: 0.75rem; margin-left: 3px;"></i></span>
                    <div class="mgmt-dropdown-content">
                        <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
                        <a href="quotes.html"><i class="fas fa-file-invoice-dollar"></i> My Estimates</a>
                        <a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
                    </div>
                </div>`;
        }
        authContainer.innerHTML = dropdownHtml;

        // Bind logout event listener
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                localStorage.removeItem('chatbotHistory');
                localStorage.removeItem('chatbotPanelOpen');
                window.showModal({
                    title: "Logged Out",
                    message: "You have logged out successfully. Redirecting you to home page...",
                    type: "success",
                    confirmText: "OK",
                    showCancel: false,
                    onConfirm: () => {
                        window.location.href = 'index.html';
                    }
                });
            });
        }
    } else {
        authContainer.innerHTML = `<a href="signin.html" class="nav-auth-btn"><i class="fas fa-sign-in-alt"></i> Sign In</a>`;
    }
}

// ─── FLOATING AI CHATBOT WIDGET CONTROLLER ────────────────────────────────────
function initChatbot() {
    const toggleBtn = document.getElementById('chatbot-toggle-btn') || document.querySelector('.chatbot-toggle');
    const panel = document.getElementById('chatbot-panel') || document.querySelector('.chatbot-container');
    const closeBtn = document.getElementById('chatbot-close-btn') || document.querySelector('.close-chat');
    const chatBody = document.getElementById('chat-body');
    const sendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input-text');

    if (!toggleBtn || !panel || !chatBody || !sendBtn || !chatInput) return;

    // Make panel position relative so feedback overlay can use position absolute
    panel.style.position = 'fixed';

    // Hide chatbot entirely for Admin / Employee users so back-to-top is not blocked
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const hasAdminRights = currentUser && (
        currentUser.role === 'Admin' || 
        currentUser.role === 'Employee' || 
        currentUser.role === 'Administrator'
    );
    if (hasAdminRights) {
        toggleBtn.style.display = 'none';
        panel.style.display = 'none';
        return;
    }

    // ─── Inject "New Chat" button into chatbot header ───
    const chatHeader = panel.querySelector('.chatbot-header');
    if (chatHeader) {
        // Update header text dynamically to premium name
        const headerTitle = chatHeader.querySelector('span');
        if (headerTitle) {
            headerTitle.textContent = 'CarCare AI Advisor';
        }

        // Wrap existing right-side icons in an actions container
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'chatbot-header-actions';

        // New Chat icon
        const newChatIcon = document.createElement('i');
        newChatIcon.className = 'fas fa-plus';
        newChatIcon.title = 'New Chat';
        newChatIcon.id = 'chatbot-new-chat-btn';
        newChatIcon.style.marginRight = '8px';
        actionsDiv.appendChild(newChatIcon);

        // Move existing close button into actions container
        const existingClose = chatHeader.querySelector('.close-chat, #chatbot-close-btn');
        if (existingClose) {
            existingClose.remove();
            actionsDiv.appendChild(existingClose);
        }

        chatHeader.appendChild(actionsDiv);
    }

    // ─── Persist chatbot open/close state across page navigations ───
    const savedPanelState = localStorage.getItem('chatbotPanelOpen');
    if (savedPanelState === 'true') {
        panel.style.display = 'flex';
    }

    // Toggle Chat Panel visibility
    toggleBtn.addEventListener('click', function () {
        if (panel.style.display === 'flex') {
            panel.style.display = 'none';
            localStorage.setItem('chatbotPanelOpen', 'false');
        } else {
            panel.style.display = 'flex';
            localStorage.setItem('chatbotPanelOpen', 'true');
            chatInput.focus();
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });

    // Close Panel
    const closeBtnNew = panel.querySelector('.close-chat, #chatbot-close-btn');
    if (closeBtnNew) {
        closeBtnNew.addEventListener('click', function () {
            panel.style.display = 'none';
            localStorage.setItem('chatbotPanelOpen', 'false');
        });
    }

    // Load Chat History from LocalStorage
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem('chatbotHistory')) || [];
    } catch (e) {
        history = [];
    }

    // Determine the base API URL dynamically
    // - file:// protocol = opened without a server (developer mode) → point to local dev server
    // - Any real server (local or cloud) → use relative paths so it works everywhere
    const API_BASE = (window.location.protocol === 'file:') ? 'http://localhost:3000' : '';

    // Config and Gemini active states
    let isGeminiConfigured = false;

    async function fetchConfig() {
        try {
            const res = await fetch(`${API_BASE}/api/config`);
            const data = await res.json();
            if (data && data.hasGeminiKey) {
                isGeminiConfigured = true;
            }
        } catch (e) {
            console.warn('Could not fetch server config, falling back to local simulation.', e);
        }
    }
    fetchConfig();

    // Advanced markdown-to-HTML converter for headers, bold, italics, lists, alerts, and rules
    function parseMd(text) {
        // Convert headers (### title)
        let html = text.replace(/^###\s+(.+)$/gm, '<h3 style="font-weight: bold; font-size: 0.95rem; margin-top: 10px; margin-bottom: 6px; color: var(--accent, #e31837);">$1</h3>');

        // Convert bold (**text**)
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Convert italic (*text*)
        html = html.replace(/(?<![*])\*(?![*])(.+?)(?<![*])\*(?![*])/g, '<em>$1</em>');

        // Convert GitHub alerts (e.g. > [!WARNING]) to styled headers
        html = html.replace(/^>\s+\[!(WARNING|TIP|NOTE|IMPORTANT|CAUTION)\]\s*$/gim, (match, type) => {
            const colors = {
                'warning': '#ff9800',
                'tip': '#4caf50',
                'note': '#2196f3',
                'important': '#9c27b0',
                'caution': '#f44336'
            };
            const color = colors[type.toLowerCase()] || '#888';
            return `<div style="border-left: 3px solid ${color}; padding-left: 8px; margin-top: 8px; font-weight: 700; text-transform: uppercase; font-size: 0.72rem; color: ${color};">${type}</div>`;
        });

        // Convert general blockquotes (> text)
        html = html.replace(/^>\s+(.+)$/gm, '<blockquote style="border-left: 2px solid #555; padding-left: 8px; margin: 4px 0; color: #aaa; font-style: italic; font-size: 0.8rem;">$1</blockquote>');

        // Convert lists (e.g. • Item or 1. Item)
        html = html.replace(/^\s*•\s+(.+)$/gm, '<div style="margin-left: 10px; margin-bottom: 3px; display: list-item; list-style-type: disc; list-style-position: inside;">$1</div>');
        html = html.replace(/^\s*(\d+)\.\s+(.+)$/gm, '<div style="margin-left: 10px; margin-bottom: 3px;"><strong>$1.</strong> $2</div>');

        // Convert horizontal rules (---)
        html = html.replace(/^---\s*$/gm, '<hr style="border: 0; border-top: 1px solid #222; margin: 10px 0;">');

        // Convert double newlines to paragraphs, single to line breaks
        const paragraphs = html.split(/\n\n+/);
        html = paragraphs.map(p => {
            const trimmed = p.trim();
            if (!trimmed) return '';
            if (trimmed.startsWith('<h') || trimmed.startsWith('<div') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<hr')) {
                return trimmed.replace(/\n/g, '<br>');
            }
            return `<p style="margin-bottom: 6px;">${trimmed.replace(/\n/g, '<br>')}</p>`;
        }).join('');

        return html;
    }

    function renderHistory() {
        chatBody.innerHTML = '';
        if (history.length === 0) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'msg bot-msg';
            welcomeMsg.innerHTML = parseMd(`Hello! I'm your **CarCare AI Advisor**, a professional automotive expert. How can I help you today? Ask me anything about **car maintenance**, troubleshooting, technical specifications, or service milestones! 🚗`);
            chatBody.appendChild(welcomeMsg);
        } else {
            history.forEach(msg => {
                const div = document.createElement('div');
                div.className = `msg ${msg.role === 'user' ? 'user-msg' : 'bot-msg'}`;
                div.innerHTML = msg.role === 'bot' ? parseMd(msg.text) : msg.text;
                chatBody.appendChild(div);
            });
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    renderHistory();

    // ─── Feedback Flow (shown before resetting conversation) ───
    function showFeedbackOverlay() {
        // Only show feedback if there was an actual conversation
        if (history.length === 0) return;

        // Remove any existing overlay
        const existing = panel.querySelector('.chatbot-feedback-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'chatbot-feedback-overlay';
        overlay.innerHTML = `
            <h4>How was your experience?</h4>
            <p>Rate your chat with our AI Advisor</p>
            <div class="chatbot-star-rating" id="chatbot-star-rating">
                <i class="far fa-star" data-rating="1"></i>
                <i class="far fa-star" data-rating="2"></i>
                <i class="far fa-star" data-rating="3"></i>
                <i class="far fa-star" data-rating="4"></i>
                <i class="far fa-star" data-rating="5"></i>
            </div>
            <textarea class="chatbot-feedback-textarea" id="chatbot-feedback-text" placeholder="Any additional comments? (optional)"></textarea>
            <div class="chatbot-feedback-btns">
                <button class="fb-skip" id="chatbot-fb-skip">Skip</button>
                <button class="fb-submit" id="chatbot-fb-submit"><i class="fas fa-paper-plane"></i> Submit</button>
            </div>
        `;

        panel.appendChild(overlay);

        // Star rating interaction
        let selectedRating = 0;
        const stars = overlay.querySelectorAll('.chatbot-star-rating i');
        stars.forEach(star => {
            star.addEventListener('mouseenter', function () {
                const rating = parseInt(this.dataset.rating);
                stars.forEach(s => {
                    const r = parseInt(s.dataset.rating);
                    s.className = r <= rating ? 'fas fa-star hovered' : 'far fa-star';
                });
            });
            star.addEventListener('mouseleave', function () {
                stars.forEach(s => {
                    const r = parseInt(s.dataset.rating);
                    s.className = r <= selectedRating ? 'fas fa-star active' : 'far fa-star';
                });
            });
            star.addEventListener('click', function () {
                selectedRating = parseInt(this.dataset.rating);
                stars.forEach(s => {
                    const r = parseInt(s.dataset.rating);
                    s.className = r <= selectedRating ? 'fas fa-star active' : 'far fa-star';
                });
            });
        });

        // Submit feedback
        overlay.querySelector('#chatbot-fb-submit').addEventListener('click', function () {
            saveFeedback(selectedRating, overlay.querySelector('#chatbot-feedback-text').value.trim());
            showThankYou(overlay);
        });

        // Skip feedback — reset immediately
        overlay.querySelector('#chatbot-fb-skip').addEventListener('click', function () {
            resetConversation();
            overlay.remove();
        });
    }

    function saveFeedback(rating, comment) {
        let feedbackList = [];
        try {
            feedbackList = JSON.parse(localStorage.getItem('chatbotFeedback')) || [];
        } catch (e) {
            feedbackList = [];
        }

        const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
        feedbackList.push({
            rating: rating,
            comment: comment,
            date: new Date().toISOString(),
            user: currentUserData ? (currentUserData.fullName || currentUserData.username) : 'Guest',
            messageCount: history.length
        });
        localStorage.setItem('chatbotFeedback', JSON.stringify(feedbackList));
    }

    function showThankYou(overlay) {
        overlay.innerHTML = `
            <div class="chatbot-thankyou">
                <i class="fas fa-check-circle"></i>
                <h4>Thank you for your feedback!</h4>
                <p>Starting a new conversation...</p>
            </div>
        `;
        setTimeout(() => {
            resetConversation();
            overlay.remove();
        }, 1500);
    }

    function resetConversation() {
        history = [];
        localStorage.removeItem('chatbotHistory');
        renderHistory();
        chatInput.focus();
    }

    // ─── New Chat button click → show feedback first ───
    const newChatBtn = document.getElementById('chatbot-new-chat-btn');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', function () {
            if (history.length === 0) return; // Nothing to reset
            showFeedbackOverlay();
        });
    }

    // AI Query Matching Engine
    function queryPeroduaLocalDB(userQuery) {
        const query = userQuery.toLowerCase().trim();

        if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
            return `Hello! I'm your Perodua AI Service Advisor. Ask me about Ativa service schedules, genuine parts pricing, or maintenance intervals!`;
        }

        // Check if there is a mileage milestone in the query. If so, bypass generic parts lookup.
        const hasMilestone = /\b(1000|5000|10000|20000|30000|40000|50000|60000|70000|80000|90000|100000|1k|5k|10k|20k|30k|40k|5k|60k|70k|80k|90k|100k|mileage|milestone)\b/i.test(query);

        if (!hasMilestone) {
            // Generic Parts Pricing
            if (query.includes('oil filter') || query.includes('filter')) {
                return `A genuine Perodua Element Oil Filter costs **RM 19.80** for Peninsular Malaysia and **RM 21.00** for East Malaysia.`;
            }
            if (query.includes('engine oil') || query.includes('fully syn') || query.includes('fully synthetic')) {
                return `Perodua Engine Oil Fully Synthetic 0W-20 (3.5L) is recommended for newer models like Ativa, Myvi, and Bezza. It costs **RM 161.10** (Peninsular) or **RM 167.80** (East Malaysia).`;
            }
            if (query.includes('cvt') || query.includes('transmission')) {
                return `CVT Fluid (1.0L) costs **RM 140.70** (Peninsular) or **RM 149.10** (East Malaysia) for 3 bottles required during the major 100k KM service. The CVT Drain Plug Gasket is **RM 3.80** (Peninsular) or **RM 4.20** (EM).`;
            }
            if (query.includes('spark') || query.includes('plug')) {
                return `A set of 3 genuine Perodua Spark Plugs for Ativa costs **RM 471.90** (Peninsular) or **RM 500.10** (East Malaysia) as they are premium long-life plugs designed for turbo charging.`;
            }
            if (query.includes('quote') || query.includes('quotation') || query.includes('estimate')) {
                return `You can generate a precise, itemized cost estimate for any Perodua model on our <a href="quotes.html" style="color:var(--accent); font-weight:bold; text-decoration:underline;">Quotes Page</a>! Just choose your model, variant, and mileage, and it will calculate everything instantly.`;
            }
            const isBotQuery = query.includes('who are you') || query.includes('what are you') ||
                query.includes('about you') || query.includes('about yourself') || query.includes('about this') ||
                query.includes('what is this') || (query.includes('who are') && !query.match(/\b(ativa|myvi|axia|alza|bezza|aruz|traz|honda|toyota|proton|bmw|car|vehicle|oil|engine|spark|brake|tire|battery)\b/i));
            if (isBotQuery) {
                return `I am an Automated Car Service Advisor designed specifically for Perodua vehicles. I assist customers in tracking service milestones, predicting parts replacement, and calculating service quotations.`;
            }
        }

        // Ativa Service Schedules
        const hasAtiva = query.includes('ativa');
        if (hasAtiva) {
            if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                return `Ativa's **10,000 KM** service is a minor milestone. It costs **RM 183.90** in Peninsular Malaysia and **RM 192.00** in East Malaysia.
                <br><br><b>Items Included:</b>
                <br>• Engine Oil Fully Synthetic (0W-20)
                <br>• Element Oil Filter
                <br>• Drain Plug Gasket (Engine Oil)
                <br>• <i>Labour Charges are FREE!</i>`;
            }
            if (query.includes('20000') || query.includes('20k') || query.includes('20,000') ||
                query.includes('60000') || query.includes('60k') || query.includes('60,000')) {
                const dist = query.includes('20') ? '20,000 KM' : '60,000 KM';
                return `Ativa's **${dist}** service costs **RM 304.88** (Peninsular) or **RM 314.98** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Engine Oil Fully Synthetic (0W-20)
                <br>• Element Oil Filter
                <br>• Drain Plug Gasket
                <br>• Element Air Refiner (Cabin Filter)
                <br>• Labour Charges (RM 81.00 + 8% SST)`;
            }
            if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                query.includes('70000') || query.includes('70k') || query.includes('70,000') ||
                query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                return `Ativa's **30,000 / 50,000 / 70,000 / 90,000 KM** service costs **RM 240.06** (Peninsular) or **RM 248.16** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Engine Oil Fully Synthetic (0W-20)
                <br>• Element Oil Filter
                <br>• Drain Plug Gasket
                <br>• Labour Charges (RM 52.00 + 8% SST)`;
            }
            if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                return `Ativa's **${dist}** major service costs **RM 426.12** (Peninsular) or **RM 440.72** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Engine Oil Fully Synthetic (0W-20)
                <br>• Element Oil Filter
                <br>• Element S/A Air Cleaner Filter
                <br>• Brake Fluid (1.0L)
                <br>• Drain Plug Gaskets
                <br>• Element Air Refiner
                <br>• Labour Charges (RM 119.00 + 8% SST)`;
            }
            if (query.includes('100000') || query.includes('100k') || query.includes('100,000')) {
                return `Ativa's **100,000 KM** major milestone service costs **RM 933.16** (Peninsular) or **RM 980.26** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Engine Oil Fully Synthetic (0W-20)
                <br>• Element Oil Filter
                <br>• Spark Plugs (Qty 3, special for Turbo Engine - RM 471.90 / 500.10)
                <br>• CVT Transmission Fluid (Qty 3 bottles - RM 140.70 / 149.10)
                <br>• Drain Plug Gasket - Engine
                <br>• Drain Plug Gasket - CVT
                <br>• Element Air Refiner
                <br>• Labour Charges (RM 92.00 + 8% SST)`;
            }
        }

        // Alza Service Schedules
        const hasAlza = query.includes('alza');
        if (hasAlza) {
            if (query.includes('100000') || query.includes('100k') || query.includes('100,000')) {
                return `Alza's **100,000 KM** service is a standard milestone. It costs **RM 277.44** in Peninsular Malaysia and **RM 289.69** in East Malaysia (identical for both Automatic and Manual transmission, as transmission fluid is not changed at this standard milestone).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Semi Syn 5W-30 SM 4L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• Spark Plugs (Qty: 4 - RM 60.40 / RM 66.40)
                <br>• Labour Charges (RM 83.00 + 8% SST)`;
            }
            if (query.includes('1000') || query.includes('1k') || query.includes('1,000') ||
                query.includes('5000') || query.includes('5k') || query.includes('5,000')) {
                const dist = (query.includes('1000') || query.includes('1k')) ? '1,000 KM' : '5,000 KM';
                return `Alza's **${dist}** service is an introductory milestone. It costs **RM 96.30** in Peninsular Malaysia and **RM 104.05** in East Malaysia.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Semi Syn 5W-30 SL 4L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• <i>Labour Charges are FREE!</i>`;
            }
            if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                return `Alza's **10,000 KM** service is a minor milestone. It costs **RM 127.40** in Peninsular Malaysia and **RM 133.65** in East Malaysia.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Semi Syn 5W-30 SM 4L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• <i>Labour Charges are FREE!</i>`;
            }
            if (query.includes('60000') || query.includes('60k') || query.includes('60,000')) {
                return `Alza's **60,000 KM** service costs **RM 312.44** (Peninsular) or **RM 325.69** (East Malaysia) for both Automatic and Manual variants.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Semi Syn 5W-30 SM 4L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• Spark Plugs (Qty: 4 - RM 60.40 / RM 66.40)
                <br>• Cabin Filter (RM 35.00 / RM 36.00)
                <br>• Labour Charges (RM 83.00 + 8% SST)`;
            }
            if (query.includes('20000') || query.includes('20k') || query.includes('20,000')) {
                return `Alza's **20,000 KM** service costs **RM 277.44** (Peninsular) or **RM 289.69** (East Malaysia) for both Automatic and Manual variants.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Semi Syn 5W-30 SM 4L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• Spark Plugs (Qty: 4 - RM 60.40 / RM 66.40)
                <br>• Labour Charges (RM 83.00 + 8% SST)`;
            }
            if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                const dist = query.includes('30') ? '30,000 KM' : '90,000 KM';
                return `Alza's **${dist}** service costs **RM 221.80** (Peninsular) or **RM 229.05** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Semi Syn 5W-30 SM 4L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• Cabin Filter (RM 35.00 / RM 36.00)
                <br>• Labour Charges (RM 55.00 + 8% SST)`;
            }
            if (query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                query.includes('70000') || query.includes('70k') || query.includes('70,000')) {
                const dist = query.includes('50') ? '50,000 KM' : '70,000 KM';
                return `Alza's **${dist}** service costs **RM 185.72** (Peninsular) or **RM 191.97** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Semi Syn 5W-30 SM 4L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• Labour Charges (RM 54.00 + 8% SST)`;
            }
            if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                return `Alza's **${dist}** major service differs by transmission type:
                <br><br><b>• Automatic (AT):</b> **RM 530.04** (Peninsular) / **RM 553.59** (EM).
                <br><i>Includes Engine Oil, Filter, Gasket, Spark Plugs (4x), Air Cleaner Filter, Brake Fluid, ATF Oil (3x), AT Gasket, and Labour (RM 143.00 + 8% SST).</i>
                <br><br><b>• Manual (MT):</b> **RM 447.64** (Peninsular) / **RM 465.29** (EM).
                <br><i>Includes Engine Oil, Filter, Gasket, Spark Plugs (4x), Air Cleaner Filter, Brake Fluid, Gear Oil (3x), MT Gaskets (2x), and Labour (RM 143.00 + 8% SST).</i>`;
            }
        }

        // Axia Service Schedules
        const hasAxia = query.includes('axia');
        if (hasAxia) {
            if (query.includes('100000') || query.includes('100k') || query.includes('100,000')) {
                return `Axia's **100,000 KM** service is a standard milestone. It costs **RM 285.26** in Peninsular Malaysia and **RM 297.01** in East Malaysia (identical for both Automatic and Manual transmission, as transmission fluid is not changed at this standard milestone).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket - Engine Oil
                <br>• Spark Plugs (Qty: 3 - RM 45.30 / RM 48.00)
                <br>• Labour Charges (RM 77.00 + 8% SST)`;
            }
            if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                return `Axia's **10,000 KM** service is a minor milestone. It costs **RM 156.80** in Peninsular Malaysia and **RM 165.85** in East Malaysia.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket
                <br>• <i>Labour Charges are FREE!</i>`;
            }
            if (query.includes('60000') || query.includes('60k') || query.includes('60,000')) {
                return `Axia's **60,000 KM** service costs **RM 320.26** (Peninsular) or **RM 333.01** (East Malaysia) for both Automatic and Manual variants.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                <br>• Engine Oil Filter
                <br>• Spark Plugs (Qty: 3 - RM 45.30 / RM 48.00)
                <br>• Air Filter (Cabin Filter) (RM 35.00 / RM 36.00)
                <br>• Drain Plug Gasket
                <br>• Labour Charges (RM 77.00 + 8% SST)`;
            }
            if (query.includes('20000') || query.includes('20k') || query.includes('20,000')) {
                return `Axia's **20,000 KM** service costs **RM 285.26** (Peninsular) or **RM 297.01** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket
                <br>• Spark Plugs (Qty: 3 - RM 45.30 / RM 48.00)
                <br>• Labour Charges (RM 77.00 + 8% SST)`;
            }
            if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                const dist = query.includes('30') ? '30,000 KM' : '90,000 KM';
                return `Axia's **${dist}** service costs **RM 251.20** (Peninsular) or **RM 261.25** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket
                <br>• Air Filter (Cabin Filter)
                <br>• Labour Charges (RM 55.00 + 8% SST)`;
            }
            if (query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                query.includes('70000') || query.includes('70k') || query.includes('70,000')) {
                const dist = query.includes('50') ? '50,000 KM' : '70,000 KM';
                return `Axia's **${dist}** service costs **RM 215.12** (Peninsular) or **RM 224.17** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                <br>• Engine Oil Filter
                <br>• Drain Plug Gasket
                <br>• Labour Charges (RM 54.00 + 8% SST)`;
            }
            if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                return `Axia's **${dist}** major service differs by transmission type:
                <br><br><b>• Automatic (AT/CVT):</b> **RM 579.34** (Peninsular) / **RM 604.49** (EM).
                <br><i>Includes Engine Oil, Filter, Gaskets, Air Cleaner, Spark Plugs, Brake Fluid, ATF Oil (3x bottles), and Labour (RM 143.00 + SST).</i>
                <br><br><b>• Manual (MT):</b> **RM 477.84** (Peninsular) / **RM 496.19** (EM).
                <br><i>Includes Engine Oil, Filter, Gaskets, Air Cleaner, Spark Plugs, Brake Fluid, Gear Oil (2x bottles), MT Gaskets, and Labour (RM 143.00 + SST).</i>`;
            }
        }

        // Myvi Service Schedules
        const hasMyvi = query.includes('myvi');
        if (hasMyvi) {
            const is15 = query.includes('1.5') || query.includes('1500') || query.includes('1500cc');

            if (is15) {
                const isCvtQuery = query.includes('cvt');
                const is4atQuery = query.includes('manual') || query.includes('mt') || query.includes('automatic') || query.includes('4at') || query.includes('at ') || query.includes(' at') || query.includes('pre-facelift') || query.includes('old') || query.includes('4-speed');

                // Helper to return CVT 1.5 info
                const getCvtInfo = (milestone) => {
                    if (milestone === '10k') {
                        return `<b>• Myvi (CVT) 1.5:</b> **RM 184.70** (Peninsular) / **RM 193.00** (EM)
                        <br><i>Includes Engine Oil, Filter (Premium), Gasket, Free Labour.</i>`;
                    }
                    if (milestone === '20k' || milestone === '60k') {
                        return `<b>• Myvi (CVT) 1.5:</b> **RM 307.98** (Peninsular) / **RM 318.38** (EM)
                        <br><i>Includes Engine Oil, Filter (Premium), Gasket, Cabin Filter, Labour (RM 81.00 + SST).</i>`;
                    }
                    if (milestone === '30k') {
                        return `<b>• Myvi (CVT) 1.5:</b> **RM 240.86** (Peninsular) / **RM 249.16** (EM)
                        <br><i>Includes Engine Oil, Filter (Premium), Gasket, Labour (RM 52.00 + SST).</i>`;
                    }
                    if (milestone === '40k') {
                        return `<b>• Myvi (CVT) 1.5:</b> **RM 438.32** (Peninsular) / **RM 456.32** (EM)
                        <br><i>Includes Engine Oil, Filter (Premium), Gasket, Cabin Filter, Air Cleaner Filter, Brake Fluid, Labour (RM 119.00 + SST).</i>`;
                    }
                    if (milestone === '100k') {
                        return `<b>• Myvi (CVT) 1.5:</b> **RM 727.96** (Peninsular) / **RM 763.16** (EM)
                        <br><i>Includes Engine Oil, Filter (Premium), Gasket, Spark Plugs (Iridium, 4x), CVT Fluid (3x), CVT Gasket, Cabin Filter, Labour (RM 92.00 + SST).</i>`;
                    }
                };

                // Helper to return 4AT 1.5 info
                const get4atInfo = (milestone) => {
                    if (milestone === '10k') {
                        return `<b>• Myvi 1.5 4AT (Pre-facelift):</b> **RM 177.40** (Peninsular) / **RM 185.25** (EM)
                        <br><i>Includes Engine Oil, Filter (Standard), Gasket, Free Labour.</i>`;
                    }
                    if (milestone === '20k') {
                        return `<b>• Myvi 1.5 4AT (Pre-facelift):</b> **RM 224.92** (Peninsular) / **RM 232.77** (EM)
                        <br><i>Includes Engine Oil, Filter (Standard), Gasket, Labour (RM 44.00 + SST).</i>`;
                    }
                    if (milestone === '30k') {
                        return `<b>• Myvi 1.5 4AT (Pre-facelift):</b> **RM 279.08** (Peninsular) / **RM 289.03** (EM)
                        <br><i>Includes Engine Oil, Filter (Standard), Gasket, Cabin Filter, Labour (RM 61.00 + SST).</i>`;
                    }
                    if (milestone === '40k') {
                        return `<b>• Myvi 1.5 4AT (Pre-facelift):</b> **RM 587.00** (Peninsular) / **RM 611.25** (EM)
                        <br><i>Includes Engine Oil, Filter (Standard), Gaskets (Engine & AT), Air Cleaner Filter, ATF D3 SP Oil (3x), Brake Fluid 1.0L, Labour (RM 165.00 + SST).</i>`;
                    }
                    if (milestone === '60k') {
                        return `<b>• Myvi 1.5 4AT (Pre-facelift):</b> **RM 279.08** (Peninsular) / **RM 289.03** (EM)
                        <br><i>Includes Engine Oil, Filter (Standard), Gasket, Cabin Filter, Labour (RM 61.00 + SST).</i>`;
                    }
                    if (milestone === '100k') {
                        return `<b>• Myvi 1.5 4AT (Pre-facelift):</b> **RM 524.16** (Peninsular) / **RM 548.01** (EM)
                        <br><i>Includes Engine Oil, Filter (Standard), Gasket, Spark Plugs (Iridium, 4x), Labour (RM 77.00 + SST).</i>`;
                    }
                };

                if (query.includes('100000') || query.includes('100k') || query.includes('100,000')) {
                    if (isCvtQuery && !is4atQuery) {
                        return `Myvi (CVT) 1.5's **100,000 KM** major service costs **RM 727.96** (Peninsular) or **RM 763.16** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Premium - RM 19.80 / RM 21.00)
                        <br>• Spark Plugs (Iridium, Qty: 4 - RM 263.60 / RM 279.60)
                        <br>• CVT Fluid 1.0L (Qty: 3 - RM 140.70 / RM 149.10)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Drain Plug Gasket - CVT
                        <br>• Filter Sub Assy, Air Refiner (Cabin)
                        <br>• Labour Charges (RM 92.00 + 8% SST)`;
                    }
                    if (is4atQuery && !isCvtQuery) {
                        return `Myvi 1.5 4AT (Pre-facelift)'s **100,000 KM** major milestone service costs **RM 524.16** (Peninsular) or **RM 548.01** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Standard - RM 12.50 / RM 13.25)
                        <br>• Spark Plug Set of 4 (Iridium) (RM 263.60 / RM 279.60)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 77.00 + 8% SST)`;
                    }
                    return `Myvi 1.5L's **100,000 KM** service options:
                    <br><br>${getCvtInfo('100k')}
                    <br><br>${get4atInfo('100k')}`;
                }

                if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                    if (isCvtQuery && !is4atQuery) {
                        return `Myvi (CVT) 1.5's **10,000 KM** service is a minor milestone. It costs **RM 184.70** in Peninsular Malaysia and **RM 193.00** in East Malaysia.
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Premium - RM 19.80 / RM 21.00)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• <i>Labour Charges are FREE!</i>`;
                    }
                    if (is4atQuery && !isCvtQuery) {
                        return `Myvi 1.5 4AT (Pre-facelift)'s **10,000 KM** service is a minor milestone. It costs **RM 177.40** in Peninsular Malaysia and **RM 185.25** in East Malaysia.
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Standard - RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• <i>Labour Charges are FREE!</i>`;
                    }
                    return `Myvi 1.5L's **10,000 KM** service options:
                    <br><br>${getCvtInfo('10k')}
                    <br><br>${get4atInfo('10k')}`;
                }

                if (query.includes('20000') || query.includes('20k') || query.includes('20,000')) {
                    if (isCvtQuery && !is4atQuery) {
                        return `Myvi (CVT) 1.5's **20,000 KM** service costs **RM 307.98** (Peninsular) or **RM 318.38** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Premium - RM 19.80 / RM 21.00)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter)
                        <br>• Labour Charges (RM 81.00 + 8% SST)`;
                    }
                    if (is4atQuery && !isCvtQuery) {
                        return `Myvi 1.5 4AT (Pre-facelift)'s **20,000 KM** service costs **RM 224.92** (Peninsular) or **RM 232.77** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Standard - RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 44.00 + 8% SST)`;
                    }
                    return `Myvi 1.5L's **20,000 KM** service options:
                    <br><br>${getCvtInfo('20k')}
                    <br><br>${get4atInfo('20k')}`;
                }

                if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                    query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                    const dist = query.includes('30') ? '30,000 KM' : '90,000 KM';
                    if (isCvtQuery && !is4atQuery) {
                        return `Myvi (CVT) 1.5's **${dist}** service costs **RM 240.86** (Peninsular) or **RM 249.16** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Premium - RM 19.80 / RM 21.00)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 52.00 + 8% SST)`;
                    }
                    if (is4atQuery && !isCvtQuery) {
                        return `Myvi 1.5 4AT (Pre-facelift)'s **${dist}** service costs **RM 279.08** (Peninsular) or **RM 289.03** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Standard - RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter) (RM 35.80 / RM 37.90)
                        <br>• Labour Charges (RM 61.00 + 8% SST)`;
                    }
                    return `Myvi 1.5L's **${dist}** service options:
                    <br><br>${getCvtInfo('30k')}
                    <br><br>${get4atInfo('30k')}`;
                }

                if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                    query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                    const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                    if (isCvtQuery && !is4atQuery) {
                        return `Myvi (CVT) 1.5's **${dist}** major service costs **RM 438.32** (Peninsular) or **RM 456.32** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Premium - RM 19.80 / RM 21.00)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin)
                        <br>• Element S/A Air Cleaner Filter
                        <br>• Brake Fluid 1.0L
                        <br>• Labour Charges (RM 119.00 + 8% SST)`;
                    }
                    if (is4atQuery && !isCvtQuery) {
                        return `Myvi 1.5 4AT (Pre-facelift)'s **${dist}** major service:
                        <br><br>${get4atInfo('40k')}`;
                    }
                    return `Myvi 1.5L's **${dist}** major service options:
                    <br><br>${getCvtInfo('40k')}
                    <br><br>${get4atInfo('40k')}`;
                }

                if (query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                    query.includes('70000') || query.includes('70k') || query.includes('70,000')) {
                    const dist = query.includes('50') ? '50,000 KM' : '70,000 KM';
                    if (isCvtQuery && !is4atQuery) {
                        return `Myvi (CVT) 1.5's **${dist}** service costs **RM 240.86** (Peninsular) or **RM 249.16** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Premium - RM 19.80 / RM 21.00)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 52.00 + 8% SST)`;
                    }
                    if (is4atQuery && !isCvtQuery) {
                        return `Myvi 1.5 4AT (Pre-facelift)'s **${dist}** service costs **RM 224.92** (Peninsular) or **RM 232.77** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Standard - RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 44.00 + 8% SST)`;
                    }
                    return `Myvi 1.5L's **${dist}** service options:
                    <br><br><b>• Myvi (CVT) 1.5:</b> **RM 240.86** (Peninsular) / **RM 249.16** (EM)
                    <br><i>Includes Engine Oil, Filter (Premium), Gasket, Labour (RM 52.00 + SST).</i>
                    <br><br><b>• Myvi 1.5 4AT (Pre-facelift):</b> **RM 224.92** (Peninsular) / **RM 232.77** (EM)
                    <br><i>Includes Engine Oil, Filter (Standard), Gasket, Labour (RM 44.00 + SST).</i>`;
                }

                if (query.includes('60000') || query.includes('60k') || query.includes('60,000')) {
                    if (isCvtQuery && !is4atQuery) {
                        return `Myvi (CVT) 1.5's **60,000 KM** service costs **RM 307.98** (Peninsular) or **RM 318.38** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Premium - RM 19.80 / RM 21.00)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter)
                        <br>• Labour Charges (RM 81.00 + 8% SST)`;
                    }
                    if (is4atQuery && !isCvtQuery) {
                        return `Myvi 1.5 4AT (Pre-facelift)'s **60,000 KM** service costs **RM 279.08** (Peninsular) or **RM 289.03** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (Standard - RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter) (RM 35.80 / RM 37.90)
                        <br>• Labour Charges (RM 61.00 + 8% SST)`;
                    }
                    return `Myvi 1.5L's **60,000 KM** service options:
                    <br><br>${getCvtInfo('60k')}
                    <br><br>${get4atInfo('60k')}`;
                }

                return `I have the official service schedules for **Myvi 1.5L (1500cc)**! Please ask me about a specific mileage milestone (e.g. <b>'Myvi 1.5 10k service'</b>, <b>'Myvi 1.5 40k major'</b>, or <b>'Myvi 1.5 100k'</b>). You can specify **CVT** or **pre-facelift (4AT)** to refine the response.`;
            } else {
                // Myvi 1.3L
                const isCvtQuery = query.includes('cvt');
                const is4atMtQuery = query.includes('manual') || query.includes('mt') || query.includes('automatic') || query.includes('4at') || query.includes('at ') || query.includes(' at') || query.includes('pre-facelift') || query.includes('g') || query.includes('old') || query.includes('4-speed');

                // Helper to return CVT 1.3 info
                const getCvtInfo = (milestone) => {
                    if (milestone === '10k') {
                        return `<b>• Myvi (CVT) 1.3:</b> **RM 177.40** (Peninsular) / **RM 185.25** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Free Labour.</i>`;
                    }
                    if (milestone === '20k' || milestone === '60k') {
                        return `<b>• Myvi (CVT) 1.3:</b> **RM 300.68** (Peninsular) / **RM 310.63** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Cabin Filter, Labour (RM 81.00 + SST).</i>`;
                    }
                    if (milestone === '30k') {
                        return `<b>• Myvi (CVT) 1.3:</b> **RM 233.56** (Peninsular) / **RM 241.41** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Labour (RM 52.00 + SST).</i>`;
                    }
                    if (milestone === '40k') {
                        return `<b>• Myvi (CVT) 1.3:</b> **RM 431.02** (Peninsular) / **RM 448.57** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Cabin Filter, Air Cleaner Filter, Brake Fluid, Labour (RM 119.00 + SST).</i>`;
                    }
                    if (milestone === '100k') {
                        return `<b>• Myvi (CVT) 1.3:</b> **RM 720.66** (Peninsular) / **RM 755.41** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Spark Plugs (Iridium, 4x), CVT Fluid (3x), CVT Gasket, Cabin Filter, Labour (RM 92.00 + SST).</i>`;
                    }
                };

                // Helper to return 4AT/MT 1.3 info
                const get4atMtInfo = (milestone) => {
                    if (milestone === '10k') {
                        return `<b>• Myvi 1.3 4AT/MT (Pre-facelift):</b> **RM 177.40** (Peninsular) / **RM 185.25** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Free Labour.</i>`;
                    }
                    if (milestone === '20k') {
                        return `<b>• Myvi 1.3 4AT/MT (Pre-facelift):</b> **RM 224.92** (Peninsular) / **RM 232.77** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Labour (RM 44.00 + SST).</i>`;
                    }
                    if (milestone === '30k') {
                        return `<b>• Myvi 1.3 4AT/MT (Pre-facelift):</b> **RM 279.08** (Peninsular) / **RM 289.03** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Cabin Filter, Labour (RM 61.00 + SST).</i>`;
                    }
                    if (milestone === '40k') {
                        return `<b>• Myvi 1.3 4AT (Pre-facelift):</b> **RM 587.00** (Peninsular) / **RM 611.25** (EM)
                        <br><i>Includes Engine Oil, Filter, Gaskets (Engine & AT), Air Cleaner Filter, ATF D3 SP Oil (3x), Brake Fluid 1.0L, Labour (RM 165.00 + SST).</i>
                        <br><b>• Myvi 1.3 MT (Pre-facelift):</b> **RM 485.50** (Peninsular) / **RM 502.95** (EM)
                        <br><i>Includes Engine Oil, Filter, Gaskets (Engine & MT 2x), Air Cleaner Filter, Gear Oil GL 4 80W (2x), Brake Fluid 1.0L, Labour (RM 165.00 + SST).</i>`;
                    }
                    if (milestone === '60k') {
                        return `<b>• Myvi 1.3 4AT/MT (Pre-facelift):</b> **RM 375.12** (Peninsular) / **RM 391.07** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Cabin Filter, Spark Plugs (Nickel, 4x), Labour (RM 94.00 + SST).</i>`;
                    }
                    if (milestone === '100k') {
                        return `<b>• Myvi 1.3 4AT/MT (Pre-facelift):</b> **RM 524.16** (Peninsular) / **RM 547.81** (EM)
                        <br><i>Includes Engine Oil, Filter, Gasket, Spark Plugs (Iridium, 4x), Labour (RM 77.00 + SST).</i>`;
                    }
                };

                if (query.includes('100000') || query.includes('100k') || query.includes('100,000')) {
                    if (isCvtQuery && !is4atMtQuery) {
                        return `Myvi (CVT) 1.3's **100,000 KM** major service costs **RM 720.66** (Peninsular) or **RM 755.41** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Spark Plugs (Iridium, Qty: 4 - RM 263.60 / RM 279.60)
                        <br>• CVT Fluid 1.0L (Qty: 3 - RM 140.70 / RM 149.10)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Drain Plug Gasket - CVT
                        <br>• Filter Sub Assy, Air Refiner (Cabin)
                        <br>• Labour Charges (RM 92.00 + 8% SST)`;
                    }
                    if (is4atMtQuery && !isCvtQuery) {
                        return `Myvi 1.3 4AT/MT (Pre-facelift)'s **100,000 KM** major milestone service costs **RM 524.16** (Peninsular) or **RM 547.81** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Spark Plug Set of 4 (Iridium) (RM 263.60 / RM 279.60)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 77.00 + 8% SST)`;
                    }
                    return `Myvi 1.3L's **100,000 KM** service options:
                    <br><br>${getCvtInfo('100k')}
                    <br><br>${get4atMtInfo('100k')}`;
                }

                if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                    return `Myvi 1.3L's **10,000 KM** service is a minor milestone. It costs **RM 177.40** in Peninsular Malaysia and **RM 185.25** in East Malaysia (identical for both CVT facelift and 4AT/MT pre-facelift).
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                    <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                    <br>• Drain Plug Gasket - Engine Oil
                    <br>• <i>Labour Charges are FREE!</i>`;
                }

                if (query.includes('20000') || query.includes('20k') || query.includes('20,000')) {
                    if (isCvtQuery && !is4atMtQuery) {
                        return `Myvi (CVT) 1.3's **20,000 KM** service costs **RM 300.68** (Peninsular) or **RM 310.63** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter)
                        <br>• Labour Charges (RM 81.00 + 8% SST)`;
                    }
                    if (is4atMtQuery && !isCvtQuery) {
                        return `Myvi 1.3 4AT/MT (Pre-facelift)'s **20,000 KM** service costs **RM 224.92** (Peninsular) or **RM 232.77** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 44.00 + 8% SST)`;
                    }
                    return `Myvi 1.3L's **20,000 KM** service options:
                    <br><br>${getCvtInfo('20k')}
                    <br><br>${get4atMtInfo('20k')}`;
                }

                if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                    query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                    const dist = query.includes('30') ? '30,000 KM' : '90,000 KM';
                    if (isCvtQuery && !is4atMtQuery) {
                        return `Myvi (CVT) 1.3's **${dist}** service costs **RM 233.56** (Peninsular) or **RM 241.41** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 52.00 + 8% SST)`;
                    }
                    if (is4atMtQuery && !isCvtQuery) {
                        return `Myvi 1.3 4AT/MT (Pre-facelift)'s **${dist}** service costs **RM 279.08** (Peninsular) or **RM 289.03** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter) (RM 35.80 / RM 37.90)
                        <br>• Labour Charges (RM 61.00 + 8% SST)`;
                    }
                    return `Myvi 1.3L's **${dist}** service options:
                    <br><br>${getCvtInfo('30k')}
                    <br><br>${get4atMtInfo('30k')}`;
                }

                if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                    query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                    const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                    if (isCvtQuery && !is4atMtQuery) {
                        return `Myvi (CVT) 1.3's **${dist}** major service costs **RM 431.02** (Peninsular) or **RM 448.57** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin)
                        <br>• Element S/A Air Cleaner Filter
                        <br>• Brake Fluid 1.0L
                        <br>• Labour Charges (RM 119.00 + 8% SST)`;
                    }
                    if (is4atMtQuery && !isCvtQuery) {
                        return `Myvi 1.3 4AT/MT (Pre-facelift)'s **${dist}** major service:
                        <br><br>${get4atMtInfo('40k')}`;
                    }
                    return `Myvi 1.3L's **${dist}** major service options:
                    <br><br>${getCvtInfo('40k')}
                    <br><br>${get4atMtInfo('40k')}`;
                }

                if (query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                    query.includes('70000') || query.includes('70k') || query.includes('70,000')) {
                    const dist = query.includes('50') ? '50,000 KM' : '70,000 KM';
                    if (isCvtQuery && !is4atMtQuery) {
                        return `Myvi (CVT) 1.3's **${dist}** service costs **RM 233.56** (Peninsular) or **RM 241.41** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 52.00 + 8% SST)`;
                    }
                    if (is4atMtQuery && !isCvtQuery) {
                        return `Myvi 1.3 4AT/MT (Pre-facelift)'s **${dist}** service costs **RM 224.92** (Peninsular) or **RM 232.77** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Labour Charges (RM 44.00 + 8% SST)`;
                    }
                    return `Myvi 1.3L's **${dist}** service options:
                    <br><br><b>• Myvi (CVT) 1.3:</b> **RM 233.56** (Peninsular) / **RM 241.41** (EM)
                    <br><i>Includes Engine Oil, Filter, Gasket, Labour (RM 52.00 + SST).</i>
                    <br><br><b>• Myvi 1.3 4AT/MT (Pre-facelift):</b> **RM 224.92** (Peninsular) / **RM 232.77** (EM)
                    <br><i>Includes Engine Oil, Filter, Gasket, Labour (RM 44.00 + SST).</i>`;
                }

                if (query.includes('60000') || query.includes('60k') || query.includes('60,000')) {
                    if (isCvtQuery && !is4atMtQuery) {
                        return `Myvi (CVT) 1.3's **60,000 KM** service costs **RM 300.68** (Peninsular) or **RM 310.63** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter)
                        <br>• Labour Charges (RM 81.00 + 8% SST)`;
                    }
                    if (is4atMtQuery && !isCvtQuery) {
                        return `Myvi 1.3 4AT/MT (Pre-facelift)'s **60,000 KM** service costs **RM 375.12** (Peninsular) or **RM 391.07** (East Malaysia).
                        <br><br><b>Items Included:</b>
                        <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L
                        <br>• Element S/A Oil Filter (RM 12.50 / RM 13.25)
                        <br>• Drain Plug Gasket - Engine Oil
                        <br>• Filter Sub Assy, Air Refiner (Cabin Filter) (RM 35.80 / RM 37.90)
                        <br>• Spark Plug Set of 4 (Nickel) (RM 60.40 / RM 66.40)
                        <br>• Labour Charges (RM 94.00 + 8% SST)`;
                    }
                    return `Myvi 1.3L's **60,000 KM** service options:
                    <br><br>${getCvtInfo('60k')}
                    <br><br>${get4atMtInfo('60k')}`;
                }

                return `I have the official service schedules for **Myvi 1.3L (1300cc)**! Please ask me about a specific mileage milestone (e.g. <b>'Myvi 1.3 10k service'</b>, <b>'Myvi 1.3 40k major'</b>, or <b>'Myvi 1.3 100k'</b>). You can specify **CVT** or **pre-facelift (4AT/MT)** to refine the response.`;
            }
        }

        // Bezza Service Schedules
        const hasBezza = query.includes('bezza');
        if (hasBezza) {
            const is13 = query.includes('1.3') || query.includes('1300') || query.includes('1300cc');
            if (is13) {
                if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                    return `Bezza 1.3's **10,000 KM** service is a minor milestone. It costs **RM 177.40** in Peninsular Malaysia and **RM 185.25** in East Malaysia.
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                    <br>• Engine Oil Filter (RM 12.50 / RM 13.25)
                    <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                    <br>• <i>Labour Charges are FREE!</i>`;
                }
                if (query.includes('20000') || query.includes('20k') || query.includes('20,000') ||
                    query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                    query.includes('70000') || query.includes('70k') || query.includes('70,000')) {
                    const dist = query.includes('20') ? '20,000 KM' : (query.includes('50') ? '50,000 KM' : '70,000 KM');
                    return `Bezza 1.3's **${dist}** service costs **RM 224.92** (Peninsular) or **RM 232.77** (East Malaysia).
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                    <br>• Engine Oil Filter (RM 12.50 / RM 13.25)
                    <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                    <br>• Labour Charges (RM 44.00 + 8% SST)`;
                }
                if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                    query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                    const dist = query.includes('30') ? '30,000 KM' : '90,000 KM';
                    return `Bezza 1.3's **${dist}** service costs **RM 278.28** (Peninsular) or **RM 287.13** (East Malaysia).
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                    <br>• Engine Oil Filter (RM 12.50 / RM 13.25)
                    <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                    <br>• Air Filter (Cabin Filter) (RM 35.00 / RM 36.00)
                    <br>• Labour Charges (RM 61.00 + 8% SST)`;
                }
                if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                    query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                    const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                    return `Bezza 1.3's **${dist}** major service costs differ by transmission type:
                    <br><br><b>• Automatic (AT):</b> **RM 660.10** (Peninsular) / **RM 686.25** (EM).
                    <br><i>Includes Engine Oil (3.5L), Filter, Gasket, Air Cleaner Filter (RM 136.00 / RM 144.20), ATF Transmission Oil (3x - RM 138.30 / RM 146.70), AT Gasket (1x - RM 3.80 / RM 4.20), Brake Fluid 1.0L (RM 26.40 / RM 27.70), and Labour (RM 165.00 + SST).</i>
                    <br><br><b>• Manual (MT):</b> **RM 558.60** (Peninsular) / **RM 577.95** (EM).
                    <br><i>Includes Engine Oil (3.5L), Filter, Gasket, Air Cleaner Filter (RM 136.00 / RM 144.20), Brake Fluid 1.0L (RM 26.40 / RM 27.70), Gear Oil GL 4 80W (2x - RM 38.20 / RM 40.00), MT Gaskets (2x - RM 2.40 / RM 2.60), and Labour (RM 165.00 + SST).</i>`;
                }
                if (query.includes('60000') || query.includes('60k') || query.includes('60,000')) {
                    return `Bezza 1.3's **60,000 KM** service costs **RM 278.28** (Peninsular) or **RM 287.13** (East Malaysia) for both Automatic and Manual transmission.
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                    <br>• Engine Oil Filter (RM 12.50 / RM 13.25)
                    <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                    <br>• Air Filter (Cabin Filter) (RM 35.00 / RM 36.00)
                    <br>• Labour Charges (RM 61.00 + 8% SST)`;
                }
                if (query.includes('100000') || query.includes('100k') || query.includes('100,000')) {
                    return `Bezza 1.3's **100,000 KM** service is a major milestone. It costs **RM 524.16** in Peninsular Malaysia and **RM 547.81** in East Malaysia.
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                    <br>• Engine Oil Filter (RM 12.50 / RM 13.25)
                    <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                    <br>• Spark Plug Set of 4 (Iridium) (RM 263.60 / RM 279.40)
                    <br>• Labour Charges (RM 77.00 + 8% SST)`;
                }
                return `I have the official service schedules for **Bezza 1.3L (1300cc)**! Please ask me about a specific mileage milestone (e.g. <b>'Bezza 1.3 10k service'</b>, <b>'Bezza 1.3 40k major'</b>, or <b>'Bezza 1.3 100k'</b>).`;
            } else {
                // Bezza 1.0
                if (query.includes('60000') || query.includes('60k') || query.includes('60,000')) {
                    return `Bezza 1.0's **60,000 KM** service costs **RM 338.62** (Peninsular) or **RM 351.37** (East Malaysia) for both Automatic and Manual transmission.
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                    <br>• Engine Oil Filter
                    <br>• Drain Plug Gasket - Engine Oil
                    <br>• Spark Plugs (Qty: 3 - RM 45.30 / RM 48.00)
                    <br>• Air Filter (Cabin Filter) (RM 35.00 / RM 36.00)
                    <br>• Labour Charges (RM 94.00 + 8% SST)`;
                }
                if (query.includes('100000') || query.includes('100k') || query.includes('100,000') ||
                    query.includes('20000') || query.includes('20k') || query.includes('20,000')) {
                    const dist = query.includes('100') ? '100,000 KM' : '20,000 KM';
                    return `Bezza 1.0's **${dist}** service costs **RM 285.26** (Peninsular) or **RM 297.01** (East Malaysia) for both Automatic and Manual transmission.
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                    <br>• Engine Oil Filter
                    <br>• Drain Plug Gasket - Engine Oil
                    <br>• Spark Plugs (Qty: 3 - RM 45.30 / RM 48.00)
                    <br>• Labour Charges (RM 77.00 + 8% SST)`;
                }
                if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                    return `Bezza 1.0's **10,000 KM** service is a minor milestone. It costs **RM 156.80** in Peninsular Malaysia and **RM 165.85** in East Malaysia.
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                    <br>• Engine Oil Filter
                    <br>• Drain Plug Gasket - Engine Oil
                    <br>• <i>Labour Charges are FREE!</i>`;
                }
                if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                    query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                    const dist = query.includes('30') ? '30,000 KM' : '90,000 KM';
                    return `Bezza 1.0's **${dist}** service costs **RM 269.56** (Peninsular) or **RM 279.61** (East Malaysia).
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                    <br>• Engine Oil Filter
                    <br>• Drain Plug Gasket - Engine Oil
                    <br>• Air Filter (Cabin Filter) (RM 35.00 / RM 36.00)
                    <br>• Labour Charges (RM 72.00 + 8% SST)`;
                }
                if (query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                    query.includes('70000') || query.includes('70k') || query.includes('70,000')) {
                    const dist = query.includes('50') ? '50,000 KM' : '70,000 KM';
                    return `Bezza 1.0's **${dist}** service costs **RM 216.20** (Peninsular) or **RM 225.25** (East Malaysia).
                    <br><br><b>Items Included:</b>
                    <br>• Perodua Engine Oil Fully Syn 0W-20 FS 3L
                    <br>• Engine Oil Filter
                    <br>• Drain Plug Gasket - Engine Oil
                    <br>• Labour Charges (RM 55.00 + 8% SST)`;
                }
                if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                    query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                    const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                    return `Bezza 1.0's **${dist}** major service costs differ by transmission type:
                    <br><br><b>• Automatic (AT):</b> **RM 641.14** (Peninsular) / **RM 669.19** (EM).
                    <br><i>Includes Engine Oil, Filter, Gasket, Air Cleaner Filter, ATF Transmission Oil (3x), AT Gasket (2x), Brake Fluid, Spark Plugs (3x), and Labour (RM 193.00 + SST).</i>
                    <br><br><b>• Manual (MT):</b> **RM 539.64** (Peninsular) / **RM 560.89** (EM).
                    <br><i>Includes Engine Oil, Filter, Gasket, Air Cleaner Filter, Brake Fluid, Spark Plugs (3x), Gear Oil (2x), MT Gaskets (2x), and Labour (RM 193.00 + SST).</i>`;
                }
                return `I have the official service schedules for **Bezza 1.0L (1000cc)**! Please ask me about a specific mileage milestone (e.g. <b>'Bezza 1.0 10k service'</b>, <b>'Bezza 1.0 40k major'</b>, or <b>'Bezza 1.0 60k'</b>).`;
            }
        }

        // Aruz Service Schedules
        const hasAruz = query.includes('aruz');
        if (hasAruz) {
            if (query.includes('10000') || query.includes('10k') || query.includes('10,000')) {
                return `Aruz 1.5's **10,000 KM** service is a minor milestone. It costs **RM 184.70** in Peninsular Malaysia and **RM 193.00** in East Malaysia.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                <br>• Engine Oil Filter (RM 19.80 / RM 21.00)
                <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                <br>• <i>Labour Charges are FREE!</i>`;
            }
            if (query.includes('20000') || query.includes('20k') || query.includes('20,000') ||
                query.includes('50000') || query.includes('50k') || query.includes('50,000') ||
                query.includes('70000') || query.includes('70k') || query.includes('70,000')) {
                const dist = query.includes('20') ? '20,000 KM' : (query.includes('50') ? '50,000 KM' : '70,000 KM');
                return `Aruz 1.5's **${dist}** service costs **RM 232.22** (Peninsular) or **RM 240.52** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                <br>• Engine Oil Filter (RM 19.80 / RM 21.00)
                <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                <br>• Labour Charges (RM 44.00 + 8% SST)`;
            }
            if (query.includes('30000') || query.includes('30k') || query.includes('30,000') ||
                query.includes('60000') || query.includes('60k') || query.includes('60,000') ||
                query.includes('90000') || query.includes('90k') || query.includes('90,000')) {
                const dist = query.includes('30') ? '30,000 KM' : (query.includes('60') ? '60,000 KM' : '90,000 KM');
                return `Aruz 1.5's **${dist}** service costs **RM 286.38** (Peninsular) or **RM 296.78** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                <br>• Engine Oil Filter (RM 19.80 / RM 21.00)
                <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                <br>• Air Refiner (Cabin Filter) (RM 35.80 / RM 37.90)
                <br>• Labour Charges (RM 61.00 + 8% SST)`;
            }
            if (query.includes('40000') || query.includes('40k') || query.includes('40,000') ||
                query.includes('80000') || query.includes('80k') || query.includes('80,000')) {
                const dist = query.includes('40') ? '40,000 KM' : '80,000 KM';
                return `Aruz 1.5's **${dist}** major service costs **RM 633.10** (Peninsular) or **RM 660.10** (East Malaysia).
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                <br>• Engine Oil Filter (RM 19.80 / RM 21.00)
                <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                <br>• Air Cleaner Filter (RM 62.90 / RM 69.20)
                <br>• Gear Oil GL 5 90 (Qty 3 - RM 61.50 / RM 64.20)
                <br>• Gasket - Rear Differential (Qty 2 - RM 23.40 / RM 25.80)
                <br>• Auto Transmission Oil ATF D3 SP (Qty 2 - RM 92.20 / RM 97.80)
                <br>• Drain Plug Gasket - AT (Qty 1 - RM 3.80 / RM 4.20)
                <br>• Brake Fluid 1.0L (RM 26.40 / RM 27.70)
                <br>• Labour Charges (RM 165.00 + 8% SST)`;
            }
            if (query.includes('100000') || query.includes('100k') || query.includes('100,000')) {
                return `Aruz 1.5's **10,0000 KM** service is a major milestone. It costs **RM 531.46** in Peninsular Malaysia and **RM 555.76** in East Malaysia.
                <br><br><b>Items Included:</b>
                <br>• Perodua Engine Oil Fully Syn 0W-20 3.5L (RM 161.10 / RM 167.80)
                <br>• Engine Oil Filter (RM 19.80 / RM 21.00)
                <br>• Drain Plug Gasket - Engine Oil (RM 3.80 / RM 4.20)
                <br>• Spark Plug Set of 4 (Iridium) (RM 263.60 / RM 279.60)
                <br>• Labour Charges (RM 77.00 + 8% SST)`;
            }
            return `I have the official service schedules for **Perodua Aruz 1.5L**! Please ask me about a specific mileage milestone (e.g. <b>'Aruz 10k service'</b>, <b>'Aruz 40k major'</b>, or <b>'Aruz 100k'</b>).`;
        }

        // Catch-all standard fallback
        return `That's a good question! I can help you best with Perodua service schedules, specific maintenance milestones (like 10k, 20k, 40k, 100k KM), and genuine part costs. Try asking me about <b>'Ativa 10k service'</b> or <b>'fully synthetic engine oil price'</b>!`;
    }

    // Detect out-of-scope topics for local mock engine
    function detectOutOfScope(query) {
        const lowercaseQuery = query.toLowerCase();
        const categories = [
            {
                name: 'politics',
                keywords: ['politic', 'election', 'president', 'government', 'parliament', 'senate', 'democrat', 'republican', 'prime minister', 'cabinet']
            },
            {
                name: 'cooking and food recipes',
                keywords: ['recipe', 'cooking', 'how to cook', 'recipe for', 'bake', 'salad', 'pasta', 'soup', 'kitchen', 'chicken curry', 'bake a cake', 'culinary']
            },
            {
                name: 'general weather forecasting',
                keywords: ['weather in', 'weather today', 'rain tomorrow', 'temperature today', 'forecast', 'forecasts']
            },
            {
                name: 'creative writing',
                keywords: ['write a poem', 'write a story', 'tell a joke', 'write an essay', 'creative writing', 'tell me a joke', 'tell joke', 'riddle']
            },
            {
                name: 'general non-automotive knowledge',
                keywords: ['capital of', 'history of france', 'who is the king', 'math', 'calculate', 'physics', 'sports', 'football', 'soccer', 'basketball', 'cricket', 'baseball', 'movie', 'song', 'music', 'actor', 'celebrity']
            }
        ];

        const carKeywords = ['car', 'vehicle', 'automotive', 'engine', 'maintenance', 'tire', 'oil', 'brake', 'perodua', 'proton', 'toyota', 'honda', 'nissan', 'bmw', 'mercedes', 'mazda', 'hyundai', 'kia', 'spark', 'filter', 'cvt', 'fluid', 'transmission', 'mileage', 'battery', 'coolant', 'repair', 'diagnostic', 'code', 'milestone', 'service', 'advisor'];
        const hasCarKeyword = carKeywords.some(kw => lowercaseQuery.includes(kw));

        if (!hasCarKeyword) {
            for (const cat of categories) {
                if (cat.keywords.some(kw => lowercaseQuery.includes(kw))) {
                    return cat.name;
                }
            }
            const commonGreetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'thank you', 'thanks', 'bye', 'goodbye', 'how are you', 'what is your name', 'about', 'who are you'];
            const isGreeting = commonGreetings.some(g => lowercaseQuery.includes(g));
            if (!isGreeting) {
                return 'non-automotive topics';
            }
        }
        return null;
    }

    // Local simulation fallback engine
    function generateLocalMockReply(userQuery) {
        const query = userQuery.toLowerCase().trim();

        // 1. Out of Scope Check
        const outOfScopeTopic = detectOutOfScope(userQuery);
        if (outOfScopeTopic) {
            const outOfScopeReplies = [
                `I apologize, but my expertise is strictly limited to automotive knowledge and vehicle maintenance. I am unable to assist with ${outOfScopeTopic}, but I would be happy to answer any questions you have about your car.`,
                `As an AI Car Service Advisor, I specialize exclusively in automotive care, diagnostics, and maintenance schedules. I cannot help with ${outOfScopeTopic}, but please feel free to ask any car-related questions!`,
                `I'm designed to assist with vehicle diagnostics, parts, and service recommendations. Unfortunately, ${outOfScopeTopic} is outside my scope of expertise, but I'm ready to help with any queries about your vehicle.`,
                `My training is focused strictly on automotive maintenance and mechanical advice. I am unable to provide information on ${outOfScopeTopic}. If you have any questions regarding your car, I would be happy to help!`
            ];
            return outOfScopeReplies[Math.floor(Math.random() * outOfScopeReplies.length)];
        }

        // 2. Greetings and Info
        if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
            return `Hello! I'm your **CarCare AI Advisor**, a professional automotive expert. How can I help you today? How can I assist you with your vehicle maintenance, specifications, or diagnostics?`;
        }
        const isAskingAboutBot = query.includes('who are you') || query.includes('what are you') ||
            query.includes('about you') || query.includes('about yourself') || query.includes('about this system') ||
            query.includes('what is this') || query.includes('your name') || query.includes('you?') ||
            (query.includes('who are') && !query.match(/\b(ativa|myvi|axia|alza|bezza|aruz|traz|honda|toyota|proton|bmw|car|vehicle|oil|engine|spark|brake|tire|battery)\b/i));
        if (isAskingAboutBot) {
            return `I am the **CarCare AI Advisor**, a professional automotive expert. My expertise includes vehicle mechanics, scheduled maintenance, diagnostic codes, and repair troubleshooting across all major car brands.`;
        }

        // 3. Repair/DIY Advice Detection -> append safety warning
        const isRepairAdvice = (query.includes('how to') || query.includes('replace') || query.includes('change') || query.includes('fix') || query.includes('repair') || query.includes('install') || query.includes('troubleshoot')) &&
            (query.includes('tire') || query.includes('brake') || query.includes('oil') || query.includes('spark') || query.includes('battery') || query.includes('wiper') || query.includes('coolant') || query.includes('belt') || query.includes('fluid') || query.includes('filter'));

        if (isRepairAdvice) {
            let advice = '';
            if (query.includes('tire')) {
                advice = `### **Step-by-Step Guide: How to Change a Flat Tire**

1. **Find a Safe Location:** Park on a level surface, engage the handbrake, and turn on your hazard lights.
2. **Loosen Lug Nuts:** Use the lug wrench to loosen the lug nuts on the flat tire by about one turn (do not remove them yet).
3. **Jack Up the Vehicle:** Place the jack under the vehicle's designated jack point. Lift the car until the flat tire is off the ground.
4. **Remove Flat Tire:** Unscrew the lug nuts completely, remove the flat tire, and mount the spare tire.
5. **Tighten Lug Nuts partially:** Screw the lug nuts back on by hand until snug.
6. **Lower and Tighten:** Lower the car back to the ground, remove the jack, and use the wrench to tighten the lug nuts firmly in a star pattern.`;
            } else if (query.includes('battery')) {
                advice = `### **Step-by-Step Guide: How to Replace a Car Battery**

1. **Safety First:** Turn off the engine and ensure the car is parked safely. Wear protective gloves and eyewear.
2. **Disconnect Negative Terminal:** Locate the negative (-) cable (usually black) and loosen its nut. Pull the cable off the terminal.
3. **Disconnect Positive Terminal:** Repeat the process for the positive (+) cable (usually red).
4. **Remove Hold-Down Bracket:** Unscrew and remove the battery hold-down clamp or bracket.
5. **Swap Batteries:** Lift the old battery out, place the new battery in, and secure it with the hold-down bracket.
6. **Reconnect Cables:** Reconnect the positive (+) cable first, then reconnect the negative (-) cable. Tighten all clamps securely.`;
            } else if (query.includes('oil')) {
                advice = `### **Step-by-Step Guide: How to Perform an Engine Oil Change**

1. **Prep the Vehicle:** Run the engine for a few minutes to warm the oil, park on flat ground, lift the vehicle, and secure it with jack stands.
2. **Drain Old Oil:** Place a drain pan under the engine oil pan. Remove the drain plug and let the old oil drain completely.
3. **Replace Oil Filter:** Remove the old oil filter. Apply a thin layer of fresh oil to the rubber seal of the new filter and screw it on by hand.
4. **Reinstall Drain Plug:** Put the drain plug back with a new washer and tighten to specification.
5. **Add New Oil:** Remove the oil cap under the hood, pour in the recommended grade and volume of engine oil, and replace the cap.
6. **Check Levels:** Run the engine for a minute, check for leaks underneath, turn off, and check the dipstick level.`;
            } else if (query.includes('brake')) {
                advice = `### **Step-by-Step Guide: How to Replace Front Brake Pads**

1. **Raise the Vehicle:** Loosen the wheel lug nuts, jack up the vehicle, place jack stands, and remove the wheel.
2. **Remove Caliper:** Remove the caliper mounting bolts and slide the caliper off. Support it with a wire hanger (do not let it hang by the rubber hose).
3. **Remove Old Pads:** Slide out the worn brake pads and remove the retaining clips.
4. **Compress Caliper Piston:** Use a C-clamp or caliper tool to compress the piston back into the caliper housing.
5. **Install New Pads:** Install new clips, apply anti-seize lubricant to the back of the new pads (never on the friction side!), and slide the new pads in.
6. **Reassemble Caliper:** Place the caliper back over the pads, tighten the caliper bolts, and reinstall the wheel. Pump the brakes a few times before driving.`;
            } else {
                advice = `### **General Vehicle Repair Guidelines**

1. **Diagnose Properly:** Understand the mechanical issue before purchasing parts.
2. **Organize Tools:** Gather all necessary sockets, wrenches, and safety equipment before starting.
3. **Step-by-step disassemble:** Label components or take pictures to help with reassembly.
4. **Clean contacts:** Clean surfaces, apply appropriate grease/lubricants where required.
5. **Tighten to Spec:** Use a torque wrench for engine and suspension components.`;
            }

            return `${advice}\n\n---\n\n> [!WARNING]\n> **Safety Warning:** Please ensure you are in a safe environment and using the correct tools. If you are unsure, I recommend visiting a certified service center.`;
        }

        // 4. Diagnostic Code (OBD-II Codes) Support
        const obdMatch = query.match(/\b[p012][0-9a-f]{3}\b/);
        if (obdMatch) {
            const code = obdMatch[0].toUpperCase();
            const codesDb = {
                'P0300': 'Random/Multiple Cylinder Misfire Detected. This indicates that spark plugs, ignition coils, or fuel injectors are failing to ignite fuel properly in multiple cylinders.',
                'P0171': 'System Too Lean (Bank 1). This means the air-fuel ratio is too high in favor of air, indicating a vacuum leak, MAF sensor issue, or fuel delivery problem.',
                'P0420': 'Catalyst System Efficiency Below Threshold (Bank 1). Indicates the catalytic converter is not operating at maximum efficiency, often due to oxygen sensor failure or converter damage.',
                'P0113': 'Intake Air Temperature Sensor 1 Circuit High. Typically means a broken wire or connection issue in the IAT sensor circuit.',
                'P0505': 'Idle Control System Malfunction. Points to issues with the Idle Air Control (IAC) valve or throttle body build-up.'
            };

            const explanation = codesDb[code] || 'Generic OBD-II Diagnostic Code. This error is triggered by the Engine Control Unit (ECU) due to sensor readings falling outside normal operating thresholds.';

            return `### **Diagnostic Analysis: OBD-II Code ${code}**

- **Explanation:** ${explanation}
- **Recommended Actions:**
  1. Inspect wiring harness and electrical connectors associated with the related sensor circuit.
  2. Use a live OBD-II scanner to read sensor voltages in real-time.
  3. Clear the code and perform a drive cycle test to see if the issue persists.

---

> [!TIP]
> Diagnostic codes point you toward the circuit or system, not necessarily the specific component. Test components before replacing them.`;
        }

        // 5. Brand Neutrality: Honda, Toyota, Proton, BMW, Nissan, etc.
        const brandMatch = query.match(/\b(honda|toyota|proton|bmw|nissan|mercedes|mazda|ford)\b/);
        if (brandMatch) {
            const brand = brandMatch[1];
            if (brand === 'honda') {
                return `### **Honda Scheduled Maintenance & Specs**

Honda vehicles follow the **Maintenance Minder System** (often indicating Codes A, B, 1, 2, 3, etc. on the dashboard):
- **Engine Oil & Filter:** Every 10,000 KM or 6 months (using Honda Genuine 0W-20 or 5W-30).
- **Cabin & Engine Air Filters:** Every 30,000 KM.
- **Transmission Fluid (CVT/AT):** Every 40,000 KM to protect the Honda CVT pulleys.
- **Spark Plugs (Iridium):** Every 100,000 KM.

We advise checking the **Honda owner's manual** for exact fluid volumes and grade specifications.`;
            }
            if (brand === 'toyota') {
                return `### **Toyota Maintenance Standards**

Toyota vehicles maintain optimal reliability by following standard service schedules:
- **Minor Service (10k, 30k, 50k, 70k, 90k KM):** Engine oil (0W-20 for modern VVT-i engines), oil filter replacement, and multi-point inspection.
- **Medium Service (20k, 60k KM):** Adds cabin filter replacement and brake cleaning.
- **Major Service (40k, 80k KM):** Replacement of air filter, brake fluid, coolant, and automatic transmission fluid (ATF WS).
- **Long-Life Items:** Spark plugs (Iridium) are replaced at 100,000 KM.`;
            }
            if (brand === 'proton') {
                return `### **Proton Maintenance Schedule**

Proton vehicles (including Saga, Persona, X50, X70, S70) follow standard intervals:
- **First Service (1,000 KM):** Inspection and engine oil swap.
- **Regular Intervals:** Every 10,000 KM or 6 months.
- **Coolant & Brake Fluid:** Every 40,000 KM.
- **Transmission Oil (CVT/DCT):** Every 60,000 KM.
- **Timing Belt (for older CamPro engines):** Every 80,000 KM or 4 years.`;
            }
            if (brand === 'bmw') {
                return `### **BMW Condition Based Service (CBS)**

BMW vehicles utilize **Condition Based Service (CBS)**, which monitors wear on key components:
- **Engine Oil:** Typically indicated every 10,000 to 12,000 KM or 1 year.
- **Brake Pads (Front/Rear):** Monitored by electronic wear sensors; replacement interval varies based on driving style.
- **Brake Fluid:** Prompted every 2 years regardless of mileage.
- **Microfilter (Cabin):** Every second oil change.
- **Spark Plugs:** Every 60,000 KM (for turbo engines) to maintain optimal ignition performance.`;
            }
        }

        // 6. Existing Perodua service match fallbacks
        return queryPeroduaLocalDB(userQuery);
    }

    // Call server-side Gemini API
    async function callGeminiApi(userText, chatHistory) {
        if (!isGeminiConfigured) return null;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const response = await fetch(`${API_BASE}/api/chatbot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userText,
                    history: chatHistory.slice(-10) // Limit to last 10 turns
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error');
            }

            const data = await response.json();
            return data.reply;
        } catch (e) {
            console.error("Gemini API Error:", e.message);

            // Show a generic error — never expose raw e.message in the chat
            const errorMsgDiv = document.createElement('div');
            errorMsgDiv.className = 'msg bot-msg system-error-msg';
            errorMsgDiv.style.color = '#f44336';
            errorMsgDiv.style.backgroundColor = '#ffebee';
            errorMsgDiv.style.borderLeft = '4px solid #f44336';
            errorMsgDiv.style.padding = '8px';
            errorMsgDiv.style.margin = '8px 0';
            errorMsgDiv.style.borderRadius = '4px';
            errorMsgDiv.innerHTML = `<strong>AI Advisor Offline.</strong><br><small>Using offline response mode...</small>`;
            chatBody.appendChild(errorMsgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;

            return null; // Triggers local fallback — error div is NOT added to history
        }
    }



    // Send message handling
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Append User Message
        history.push({ role: 'user', text: text });
        chatInput.value = '';
        renderHistory();

        // Bot Response
        (async () => {
            let reply = '';
            
            // Show typing indicator
            const typing = document.createElement('div');
            typing.id = 'chat-typing-indicator';
            typing.className = 'msg bot-msg';
            typing.innerHTML = `<span style="font-style:italic; opacity:0.8;"><i class="fas fa-cog fa-spin"></i> Consulting technical manual...</span>`;
            chatBody.appendChild(typing);
            chatBody.scrollTop = chatBody.scrollHeight;

            const startTime = Date.now();
            
            if (isGeminiConfigured) {
                reply = await callGeminiApi(text, history.slice(0, -1));
            }

            if (!reply) {
                reply = generateLocalMockReply(text);
            }

            const elapsed = Date.now() - startTime;
            if (elapsed < 750) {
                await new Promise(resolve => setTimeout(resolve, 750 - elapsed));
            }

            const indicator = document.getElementById('chat-typing-indicator');
            if (indicator) indicator.remove();

            history.push({ role: 'bot', text: reply });
            localStorage.setItem('chatbotHistory', JSON.stringify(history));
            renderHistory();
        })();
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });
}

// ─── INITIALIZE UPON LOADING ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initChatbot();

    const khListContainer = document.getElementById('kh-list-container');
    if (khListContainer) {
        initKnowledgeHubPage();
    }
});

// ─── KNOWLEDGE HUB DYNAMIC FUNCTIONS & SYMPTOM DIAGNOSTICS ──────────────────

const diagnosticTree = {
    "squeak": {
        "title": "Squealing / Screeching Noise",
        "question": "When do you hear this high-pitched squealing or screeching noise?",
        "options": [
            {
                "text": "When I press the brake pedal",
                "result": "Your brake pads are worn down to the wear indicator. The friction material is critically thin.",
                "linkBlockID": "b4",
                "nextQuestion": null
            },
            {
                "text": "When I start the engine or turn on the AC",
                "result": "Your drive belt (serpentine belt) or AC belt is loose, worn out, slipping, or has lost tension.",
                "linkBlockID": "b19",
                "nextQuestion": null
            },
            {
                "text": "When taking sharp turns at normal speed",
                "result": "Your tire pressure is likely low, causing the rubber sidewalls to rub heavily, or your steering components are misaligned.",
                "linkBlockID": "b10",
                "nextQuestion": null
            }
        ]
    },
    "nostart": {
        "title": "Car Won't Start",
        "question": "What happens when you turn the key or press the Engine Start button?",
        "options": [
            {
                "text": "The engine cranks very slowly ('chug-chug-chug') or I hear a rapid clicking sound",
                "result": "Your battery is discharged, dead, or the terminals are heavily corroded. It cannot supply enough current to the starter.",
                "linkBlockID": "b8",
                "nextQuestion": null
            },
            {
                "text": "The dashboard lights turn on, but there is complete silence (no crank at all)",
                "result": "The starter motor is dead, the ignition switch is failing, or a critical fuse (like the starter or fuel pump fuse) is blown.",
                "linkBlockID": "b35",
                "nextQuestion": null
            },
            {
                "text": "The engine cranks normally but refuses to fire up and run",
                "result": "The engine is not getting spark or fuel. This could be due to worn-out spark plugs, a failed fuel pump, or a stretched timing belt/chain.",
                "linkBlockID": "b3",
                "nextQuestion": null
            }
        ]
    },
    "pull": {
        "title": "Car Pulls to One Side",
        "question": "How does the car behave when driving on a straight, flat road?",
        "options": [
            {
                "text": "It constantly drifts left or right when I let go of the steering wheel",
                "result": "Your wheel alignment is out of specification, or one of your tires is underinflated compared to the other side.",
                "linkBlockID": "b6",
                "nextQuestion": null
            },
            {
                "text": "It shakes violently at high speeds, and drifts slightly",
                "result": "Your wheels are unbalanced, or your tires have uneven tread wear. Have them rotated and balanced.",
                "linkBlockID": "b11",
                "nextQuestion": null
            },
            {
                "text": "It pulls heavily to one side only when I apply the brakes",
                "result": "You have a sticking brake caliper, uneven brake pad wear, or a warped rotor on one side of the car.",
                "linkBlockID": "b20",
                "nextQuestion": null
            }
        ]
    },
    "acwarm": {
        "title": "AC is Warm / Not Cold",
        "question": "How would you describe the warm air coming from the AC vents?",
        "options": [
            {
                "text": "It blows room-temperature air all the time, and I hear a rattling or clicking noise under the hood",
                "result": "Your AC compressor has failed, or its electromagnetic clutch is dead and cannot engage.",
                "linkBlockID": "b14",
                "nextQuestion": null
            },
            {
                "text": "It blows slightly cool air, and I hear a constant soft hissing or bubbling sound behind the dashboard",
                "result": "Your AC system has a refrigerant leak, resulting in low gas pressure.",
                "linkBlockID": "b31",
                "nextQuestion": null
            },
            {
                "text": "The air smells dusty or musty, and the airflow feels extremely weak even at high fan speeds",
                "result": "Your cabin air filter (air refiner) is heavily clogged with dust and debris, blocking the cold air.",
                "linkBlockID": "b9",
                "nextQuestion": null
            }
        ]
    },
    "vibrate": {
        "title": "Vibrations When Braking",
        "question": "Where do you feel the vibrations when you apply the brakes?",
        "options": [
            {
                "text": "Through the steering wheel and brake pedal, especially when braking from high speed",
                "result": "Your front metal brake rotors (discs) are warped, causing the brake pads to bounce on uneven surfaces.",
                "linkBlockID": "b20",
                "nextQuestion": null
            },
            {
                "text": "Through the brake pedal accompanied by a loud grinding sound",
                "result": "Your brake pads are completely worn out, and metal is grinding against metal. This is highly dangerous!",
                "linkBlockID": "b4",
                "nextQuestion": null
            },
            {
                "text": "Through the steering wheel, even when I am NOT braking",
                "result": "Your wheels are unbalanced, or your steering components (like tie rods or control arms) are loose and worn.",
                "linkBlockID": "b12",
                "nextQuestion": null
            }
        ]
    },
    "overheat": {
        "title": "Engine Overheating",
        "question": "When does the temperature warning light come on or needle spike?",
        "options": [
            {
                "text": "It spikes rapidly when I am stuck in traffic, but drops when I drive fast on the highway",
                "result": "Your electric radiator cooling fan motor has failed, or the radiator fins are severely clogged with dirt.",
                "linkBlockID": "b16",
                "nextQuestion": null
            },
            {
                "text": "It spikes suddenly and I smell a sweet, syrupy odor, or see steam under the hood",
                "result": "You have a severe coolant leak in your radiator, hoses, or a blown water pump. Do not drive further!",
                "linkBlockID": "b2",
                "nextQuestion": null
            },
            {
                "text": "It rises slowly while driving, and my engine oil levels are also very low",
                "result": "Low or degraded engine oil is causing excessive internal friction and heat, failing to help cool the engine block.",
                "linkBlockID": "b1",
                "nextQuestion": null
            }
        ]
    },
    "fuel": {
        "title": "Poor Fuel Economy",
        "question": "Have you noticed any other engine symptoms alongside the high fuel consumption?",
        "options": [
            {
                "text": "The engine acceleration feels heavy and sluggish, and the Check Engine light is on",
                "result": "Your oxygen sensor is dirty/faulty, or your air filter is clogged, forcing the car to inject excessive petrol.",
                "linkBlockID": "b39",
                "nextQuestion": null
            },
            {
                "text": "The steering wheel drifts, and I feel a dragging sensation while driving",
                "result": "Your tire pressure is very low, creating high rolling resistance, or your wheel alignment is dragging the tires.",
                "linkBlockID": "b10",
                "nextQuestion": null
            },
            {
                "text": "The car engine idles roughly and is hard to start in the morning",
                "result": "Your spark plugs are worn out or dirty, leading to incomplete combustion and wasted petrol.",
                "linkBlockID": "b3",
                "nextQuestion": null
            }
        ]
    },
    "warning": {
        "title": "Dashboard Warning Light is On",
        "question": "What color and shape is the warning light on your dashboard?",
        "options": [
            {
                "text": "A red outline of an engine oil can or a red thermometer in liquid",
                "result": "CRITICAL SYSTEM FAULT! Low oil pressure or engine overheating. Stop the car immediately and call a tow truck.",
                "linkBlockID": "b41",
                "nextQuestion": null
            },
            {
                "text": "A yellow outline of a car engine or a yellow circle containing ABS",
                "result": "An engine emission or safety sensor fault has occurred. You can still drive, but seek diagnostic scanning soon.",
                "linkBlockID": "b21",
                "nextQuestion": null
            },
            {
                "text": "A red outline of a battery",
                "result": "The charging system has failed. The alternator is not charging the battery, and the engine may stall soon.",
                "linkBlockID": "b13",
                "nextQuestion": null
            }
        ]
    }
};

// Global state for Active Filters, Reading Progress, and Editing block
let activeKhCategory = 'all';
let khSearchQuery = '';
let activeEditingBlockID = null;

// Initialize all advanced components on the Knowledge Hub Page
async function initKnowledgeHubPage() {
    // 1. Initial Render
    await renderKnowledgeHub();

    // 2. Load and Render Reading Progress Gamification
    updateKnowledgeProgress();

    // 3. Initialize Diagnostic Symptom Area
    resetDiagnostic();

    // 4. Handle URL parameters for deep linking (e.g. ?category=engine)
    handleUrlCategoryParams();

    // 5. Wire up Search Input with real-time filtering
    const searchInput = document.getElementById('kh-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            khSearchQuery = e.target.value.toLowerCase().trim();
            renderKnowledgeHub();
        });
    }

    // 6. Wire up Filter Chips
    const chips = document.querySelectorAll('#filter-chips-container .filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active styling
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Set active category filter
            activeKhCategory = chip.dataset.cat;
            renderKnowledgeHub();
        });
    });

    // 7. Wire up Admin Modal Actions
    const cancelModalBtn = document.getElementById('cancel-kb-btn');
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeKbEditModal);
    }

    const saveModalBtn = document.getElementById('save-kb-btn');
    if (saveModalBtn) {
        saveModalBtn.addEventListener('click', saveKbBlockChanges);
    }
}

// Render Knowledge Hub list dynamically with advanced Filtering, Tabs, and Admin Controls
async function renderKnowledgeHub() {
    const listContainer = document.getElementById('kh-list-container');
    if (!listContainer) return;

    let categories = [];
    let blocks = [];
    try {
        const [catRes, kbRes] = await Promise.all([
            fetch('/api/categories'),
            fetch('/api/knowledge')
        ]);
        if (catRes.ok) categories = await catRes.json();
        if (kbRes.ok) blocks = await kbRes.json();
        window.currentLiveKbBlocks = blocks;
    } catch (err) {
        console.error("Failed to fetch knowledge data from MySQL:", err);
        categories = getTable('serviceCategoryTable');
        blocks = getTable('knowledgeBlockTable');
        window.currentLiveKbBlocks = blocks;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdminOrEmployee = currentUser && (
        currentUser.role === 'Admin' || 
        currentUser.role === 'Employee' || 
        currentUser.role === 'Administrator' ||
        currentUser.position === 'Admin' ||
        currentUser.position === 'Employee'
    );

    let html = '';

    // Filter categories based on chip selection
    let filteredCategories = categories.filter(c => c.categoryID !== 'cat7'); // Exclude general
    if (activeKhCategory !== 'all') {
        filteredCategories = filteredCategories.filter(c => c.categoryID === activeKhCategory);
    }

    // If search is active, we also filter categories that contain matching blocks
    if (khSearchQuery) {
        filteredCategories = filteredCategories.filter(cat => {
            const catBlocks = blocks.filter(b => b.categoryID === cat.categoryID);
            return catBlocks.some(b =>
                b.blockTitle.toLowerCase().includes(khSearchQuery) ||
                b.description.toLowerCase().includes(khSearchQuery) ||
                (b.whyItMatters && b.whyItMatters.toLowerCase().includes(khSearchQuery)) ||
                (b.maintenanceTip && b.maintenanceTip.toLowerCase().includes(khSearchQuery))
            );
        });
    }

    if (filteredCategories.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 12px; margin-top: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1.5rem;"></i>
                <h3 style="color: var(--text-light); margin-bottom: 10px;">No Results Found</h3>
                <p style="color: var(--text-muted);">We couldn't find any maintenance topics matching "${khSearchQuery}". Try using simpler terms.</p>
            </div>
        `;
        return;
    }

    filteredCategories.forEach((cat, index) => {
        const numStr = String(index + 1).padStart(2, '0');
        let catBlocks = blocks.filter(b => b.categoryID === cat.categoryID);

        // Filter blocks inside category if search query is active
        if (khSearchQuery) {
            catBlocks = catBlocks.filter(b =>
                b.blockTitle.toLowerCase().includes(khSearchQuery) ||
                b.description.toLowerCase().includes(khSearchQuery) ||
                (b.whyItMatters && b.whyItMatters.toLowerCase().includes(khSearchQuery)) ||
                (b.maintenanceTip && b.maintenanceTip.toLowerCase().includes(khSearchQuery))
            );
        }

        let descHtml = '';
        let detailedBlocksHtml = '';

        if (catBlocks.length > 0) {
            descHtml = catBlocks[0].description;
            if (catBlocks.length > 1) {
                descHtml += ' Explore more about ' + catBlocks.slice(1).map(b => b.blockTitle.toLowerCase()).join(', ') + '.';
            }

            // Generate detailed information blocks with new TABBED layout
            catBlocks.forEach(b => {
                const urgencyClass = b.urgency === 'Critical' ? 'urgency-critical' : (b.urgency === 'Important' ? 'urgency-important' : 'urgency-routine');
                const urgencyIcon = b.urgency === 'Critical' ? 'fa-exclamation-triangle' : (b.urgency === 'Important' ? 'fa-info-circle' : 'fa-check');
                const difficultyText = b.difficultyLevel || 'Moderate';
                const warningSignsListItems = Array.isArray(b.warningSigns)
                    ? b.warningSigns.map(w => `<li>${w}</li>`).join('')
                    : `<li>${b.description}</li>`;

                // Admin pencil button HTML
                const adminBtnHtml = isAdminOrEmployee
                    ? `<div class="kb-admin-controls">
                        <button class="btn-edit-kb" onclick="openKbEditModal('${b.blockID}', event)" title="Edit this block"><i class="fas fa-pencil-alt"></i></button>
                       </div>`
                    : '';

                detailedBlocksHtml += `
                    <div class="kh-detail-block" id="kh-block-${b.blockID}" style="position: relative; background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 2rem;">
                        ${adminBtnHtml}
                        <h3 style="color: var(--text-light); font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; max-width: calc(100% - 40px);">
                            <i class="fas fa-wrench" style="color: var(--primary-accent); font-size: 1.1rem;"></i>
                            <span>${b.blockTitle}</span>
                        </h3>
                        
                        <!-- Badges Row -->
                        <div class="kh-badge-row">
                            <span class="kh-badge ${urgencyClass}"><i class="fas ${urgencyIcon}"></i>${b.urgency || 'Important'}</span>
                            <span class="kh-badge difficulty-badge"><i class="fas fa-cog"></i>${difficultyText}</span>
                        </div>

                        <!-- Advanced Tabs Header -->
                        <div class="kh-tabs-header">
                            <button class="kh-tab-btn active" onclick="switchKhTab(event, '${b.blockID}', 'overview')"><i class="fas fa-book-open"></i> Overview</button>
                            <button class="kh-tab-btn" onclick="switchKhTab(event, '${b.blockID}', 'warning')"><i class="fas fa-exclamation-circle"></i> Warning Signs</button>
                            <button class="kh-tab-btn" onclick="switchKhTab(event, '${b.blockID}', 'diy')"><i class="fas fa-tools"></i> DIY & Maintenance</button>
                            <button class="kh-tab-btn" onclick="switchKhTab(event, '${b.blockID}', 'costs')"><i class="fas fa-tags"></i> Costs</button>
                        </div>

                        <!-- Tab 1: Overview -->
                        <div class="kh-tab-content active" id="tab-${b.blockID}-overview">
                            <p style="color: var(--text-light); line-height: 1.6; font-size: 1.05rem; margin-bottom: 12px;">${b.description}</p>
                            ${b.whyItMatters ? `
                                <div style="margin-top: 15px; border-left: 3px solid rgba(227, 24, 55, 0.4); padding-left: 15px;">
                                    <h5 style="color: var(--text-muted); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 5px;">Why It Matters to You</h5>
                                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin: 0;">${b.whyItMatters}</p>
                                </div>
                            ` : ''}
                            ${b.didYouKnow ? `
                                <div class="did-you-know-card">
                                    <h4><i class="fas fa-lightbulb"></i> Did You Know?</h4>
                                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin: 0; font-style: italic;">"${b.didYouKnow}"</p>
                                </div>
                            ` : ''}
                        </div>

                        <!-- Tab 2: Warning Signs -->
                        <div class="kh-tab-content" id="tab-${b.blockID}-warning">
                            <p style="color: var(--text-light); font-weight: 600; margin-bottom: 12px; font-size: 0.95rem;">Watch out for these common warning signs of wear or failure:</p>
                            <ul class="warning-signs-list">
                                ${warningSignsListItems}
                            </ul>
                        </div>

                        <!-- Tab 3: DIY & Tips -->
                        <div class="kh-tab-content" id="tab-${b.blockID}-diy">
                            <h4 style="color: var(--text-light); font-size: 1.1rem; margin-bottom: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-accent);"></i> Maintenance Guidelines</h4>
                            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 15px;">${b.maintenanceTip || 'Inspect this component at every standard Perodua scheduled service interval.'}</p>
                            
                            <div class="diy-tip-card">
                                <h4><i class="fas fa-hands-wash"></i> Advisor's Tip</h4>
                                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin: 0;">Maintaining healthy fluids and clean filters is the easiest DIY way to prevent massive engine repair costs down the road.</p>
                            </div>
                        </div>

                        <!-- Tab 4: Costs -->
                        <div class="kh-tab-content" id="tab-${b.blockID}-costs">
                            <div class="cost-estimate-block">
                                <span style="font-size: 0.95rem; color: var(--text-muted); text-transform: uppercase;">Estimated Perodua Service Cost</span>
                                <span class="cost-val">${b.costEstimate || 'RM 50 - RM 150'}</span>
                            </div>
                            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px;">
                                <i class="fas fa-info-circle"></i> Pricing represents typical Malaysian workshop or official Perodua service center rates including standard labor charges.
                            </p>
                            
                            <button class="btn-ask-ai" onclick="askAiAboutBlock('${b.blockTitle}')"><i class="fas fa-robot"></i> Ask AI about this component</button>
                        </div>
                    </div>
                `;
            });
        } else {
            descHtml = `Learn everything you need to know about your vehicle's ${cat.title} system to ensure optimal performance and safety.`;
            detailedBlocksHtml = `<p style="color: var(--text-muted);">Detailed guides for the ${cat.title} system will be added soon.</p>`;
        }

        let displayTitle = cat.title;
        if (displayTitle === 'ac' || displayTitle === 'aircond') displayTitle = 'Air Conditioner';

        html += `
        <div class="kh-item-wrapper" id="kh-section-${cat.categoryID}" style="position: relative; transition: all 0.5s ease; border-radius: 12px; padding: 1rem;">
            <div class="kh-item">
                <div class="kh-content">
                    <div class="kh-number">${numStr}</div>
                    <h2 class="kh-title" style="text-transform: capitalize;">${displayTitle} System</h2>
                    <p class="kh-desc">${descHtml}</p>
                    <a href="#" class="btn-more" onclick="toggleKhDetails(event, '${cat.categoryID}');">More<br>Details</a>
                </div>
                <div class="kh-img-wrapper">
                    <img src="${cat.imagePath}" alt="${cat.title}">
                </div>
            </div>
            <div id="kh-details-${cat.categoryID}" class="kh-details-container">
                ${detailedBlocksHtml}
            </div>
        </div>
        `;
    });

    listContainer.innerHTML = html;
}

// Switch tabs inside a specific knowledge block and track progress
function switchKhTab(e, blockID, tabName) {
    if (e) e.preventDefault();

    // Find all tab buttons in this block and remove active state
    const blockContainer = document.getElementById(`kh-block-${blockID}`);
    if (!blockContainer) return;

    const tabBtns = blockContainer.querySelectorAll('.kh-tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // Highlight clicked tab button
    const clickedBtn = Array.from(tabBtns).find(btn => btn.innerText.toLowerCase().includes(tabName));
    if (clickedBtn) clickedBtn.classList.add('active');

    // Hide all tab content in this block
    const tabContents = blockContainer.querySelectorAll('.kh-tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Show selected tab content
    const selectedContent = document.getElementById(`tab-${blockID}-${tabName}`);
    if (selectedContent) selectedContent.classList.add('active');

    // --- Gamification: Mark this block as read when they look at tabs ---
    markBlockAsRead(blockID);
}

// Mark a specific knowledge block as read and update score
function markBlockAsRead(blockID) {
    let readBlocks = [];
    try {
        readBlocks = JSON.parse(localStorage.getItem('kh_read_blocks')) || [];
    } catch (e) {
        readBlocks = [];
    }

    if (!readBlocks.includes(blockID)) {
        readBlocks.push(blockID);
        localStorage.setItem('kh_read_blocks', JSON.stringify(readBlocks));
        updateKnowledgeProgress();
    }
}

// Update the visual Gamification Progress Bar and Title Badge
function updateKnowledgeProgress() {
    const percentLabel = document.getElementById('kh-progress-percent');
    const fillBar = document.getElementById('kh-progress-fill');
    const badgeLabel = document.getElementById('kh-badge-val');
    if (!percentLabel || !fillBar || !badgeLabel) return;

    const blocks = window.currentLiveKbBlocks || getTable('knowledgeBlockTable');
    if (blocks.length === 0) return;

    let readBlocks = [];
    try {
        readBlocks = JSON.parse(localStorage.getItem('kh_read_blocks')) || [];
    } catch (e) {
        readBlocks = [];
    }

    // Clean up any stale block IDs that are no longer in our database
    const validBlockIDs = blocks.map(b => b.blockID);
    readBlocks = readBlocks.filter(id => validBlockIDs.includes(id));

    const totalCount = blocks.length;
    const readCount = readBlocks.length;
    const percent = Math.min(100, Math.round((readCount / totalCount) * 100));

    // Update Visuals
    percentLabel.innerText = `${percent}%`;
    fillBar.style.width = `${percent}%`;

    // Determine Badge Title & Glow styles
    badgeLabel.className = 'badge-value'; // Reset
    if (percent === 100) {
        badgeLabel.innerText = "Service Advisor Pro";
        badgeLabel.classList.add('badge-glow-pro');
    } else if (percent >= 60) {
        badgeLabel.innerText = "Maintenance Enthusiast";
        badgeLabel.classList.add('badge-glow-enthusiast');
    } else if (percent >= 20) {
        badgeLabel.innerText = "Informed Owner";
        badgeLabel.classList.add('badge-glow-informed');
    } else {
        badgeLabel.innerText = "Car Novice";
        badgeLabel.classList.add('badge-glow-novice');
    }
}

// --- INTERACTIVE DIAGNOSTIC GUIDE LOGIC ---

// Reset diagnostic guide card to start state
function resetDiagnostic() {
    const area = document.getElementById('diagnostic-content-area');
    if (!area) return;

    area.innerHTML = `
        <div class="diagnostic-step" id="diag-step-start">
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Select a common symptom below to diagnose potential issues and get direct troubleshooting advice:</p>
            <div class="diagnostic-options">
                <button class="diagnostic-btn" onclick="startDiagnostic('squeak')"><span>🔊 Squealing / Screeching Noise</span> <i class="fas fa-chevron-right"></i></button>
                <button class="diagnostic-btn" onclick="startDiagnostic('nostart')"><span>🔑 Car Won't Start</span> <i class="fas fa-chevron-right"></i></button>
                <button class="diagnostic-btn" onclick="startDiagnostic('pull')"><span>🚗 Car Pulls to One Side</span> <i class="fas fa-chevron-right"></i></button>
                <button class="diagnostic-btn" onclick="startDiagnostic('acwarm')"><span>❄️ AC is Warm / Not Cold</span> <i class="fas fa-chevron-right"></i></button>
                <button class="diagnostic-btn" onclick="startDiagnostic('vibrate')"><span>📳 Vibrations When Braking</span> <i class="fas fa-chevron-right"></i></button>
                <button class="diagnostic-btn" onclick="startDiagnostic('overheat')"><span>🔥 Engine Overheating</span> <i class="fas fa-chevron-right"></i></button>
                <button class="diagnostic-btn" onclick="startDiagnostic('fuel')"><span>⛽ Poor Fuel Economy</span> <i class="fas fa-chevron-right"></i></button>
                <button class="diagnostic-btn" onclick="startDiagnostic('warning')"><span>⚠️ Dashboard Warning Light</span> <i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
}

// Start a symptom diagnostic tree step
function startDiagnostic(symptomKey) {
    const area = document.getElementById('diagnostic-content-area');
    const tree = diagnosticTree[symptomKey];
    if (!area || !tree) return;

    let optionsHtml = '';
    tree.options.forEach((opt, idx) => {
        optionsHtml += `
            <button class="diagnostic-btn" onclick="selectDiagnosticOption('${symptomKey}', ${idx})">
                <span>${opt.text}</span>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
    });

    area.innerHTML = `
        <div class="diagnostic-step">
            <h4 style="color: var(--text-light); font-size: 1.15rem; margin: 0 0 10px 0; font-weight: 700;">${tree.title}</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${tree.question}</p>
            <div class="diagnostic-options">
                ${optionsHtml}
            </div>
            <button class="btn-secondary" onclick="resetDiagnostic()" style="margin-top: 1.5rem; width: 100%; padding: 10px; border-radius: 6px;"><i class="fas fa-arrow-left" style="margin-right:8px;"></i> Back to Symptoms</button>
        </div>
    `;
}

// Render the final result of diagnostic option choice
function selectDiagnosticOption(symptomKey, optionIdx) {
    const area = document.getElementById('diagnostic-content-area');
    const option = diagnosticTree[symptomKey].options[optionIdx];
    if (!area || !option) return;

    area.innerHTML = `
        <div class="diagnostic-step">
            <h4 style="color: var(--text-light); font-size: 1.15rem; margin: 0 0 15px 0; font-weight: 700;"><i class="fas fa-check-circle" style="color: var(--primary-accent);"></i> Diagnosis Complete</h4>
            
            <div class="diagnostic-result">
                <h4><i class="fas fa-tools"></i> Probable Cause</h4>
                <p>${option.result}</p>
                
                <div class="diagnostic-actions">
                    <button class="btn-primary" onclick="focusAndOpenBlock('${option.linkBlockID}')" style="flex: 1.5; padding: 10px; font-size:0.85rem; display: flex; align-items:center; justify-content:center; gap:5px;"><i class="fas fa-external-link-alt"></i> View Hub Topic</button>
                    <button class="btn-secondary" onclick="startDiagnostic('${symptomKey}')" style="flex: 1; padding: 10px; font-size:0.85rem;"><i class="fas fa-undo"></i> Try Again</button>
                </div>
            </div>
            
            <button class="btn-secondary" onclick="resetDiagnostic()" style="margin-top: 1.5rem; width: 100%; padding: 10px; border-radius: 6px;"><i class="fas fa-home"></i> Back to Main Symptoms</button>
        </div>
    `;
}

// Deep linking scroll and open category/block focus
function focusAndOpenBlock(blockID) {
    const blocks = getTable('knowledgeBlockTable');
    const block = blocks.find(b => b.blockID === blockID);
    if (!block) return;

    // Reset filters to show the category
    if (activeKhCategory !== 'all' && activeKhCategory !== block.categoryID) {
        activeKhCategory = 'all';
        // Reset active chips styling
        const chips = document.querySelectorAll('#filter-chips-container .filter-chip');
        chips.forEach(c => c.classList.remove('active'));
        const allChip = document.querySelector('#filter-chips-container [data-cat="all"]');
        if (allChip) allChip.classList.add('active');

        renderKnowledgeHub();
    }

    // Scroll to the main category section
    scrollToKhSection(block.categoryID);

    // Scroll down to the specific block
    setTimeout(() => {
        const blockDiv = document.getElementById(`kh-block-${blockID}`);
        if (blockDiv) {
            blockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Apply visual highlight
            blockDiv.style.borderColor = 'var(--primary-accent)';
            blockDiv.style.boxShadow = '0 0 15px rgba(227, 24, 55, 0.4)';
            setTimeout(() => {
                blockDiv.style.borderColor = 'var(--border-color)';
                blockDiv.style.boxShadow = 'none';
            }, 3000);

            // Automatically switch to Overview tab to make sure it loads
            switchKhTab(null, blockID, 'overview');
        }
    }, 600);
}

// Handle URL Category parameter filtering
function handleUrlCategoryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let categoryParam = urlParams.get('category');
    if (!categoryParam) return;

    // Map legacy names to database category keys
    const categoryMap = {
        'engine': 'cat1',
        'brake': 'cat2',
        'wheels': 'cat3',
        'suspension': 'cat4',
        'battery': 'cat5',
        'aircond': 'cat6',
        'ac': 'cat6',
        'electrical': 'cat8',
        'exhaust': 'cat9',
        'lighting': 'cat10'
    };

    const targetCatID = categoryMap[categoryParam.toLowerCase()];
    if (targetCatID) {
        // Trigger filter chip active state
        const chips = document.querySelectorAll('#filter-chips-container .filter-chip');
        chips.forEach(c => c.classList.remove('active'));
        const targetChip = document.querySelector(`#filter-chips-container [data-cat="${targetCatID}"]`);
        if (targetChip) targetChip.classList.add('active');

        activeKhCategory = targetCatID;
        renderKnowledgeHub();

        // Scroll to category
        setTimeout(() => {
            scrollToKhSection(targetCatID);
        }, 300);
    }
}

// Ask AI About Component button action pre-filling Chatbot
function askAiAboutBlock(title) {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatInput = document.getElementById('chat-input-text');

    if (chatbotToggle && chatbotContainer && chatInput) {
        // Open chatbot
        chatbotContainer.style.display = 'flex';
        localStorage.setItem('chatbotPanelOpen', 'true');

        // Fill input
        chatInput.value = `What should I know about Perodua ${title} maintenance?`;
        chatInput.focus();
    }
}

// --- ADMIN EDIT KNOWLEDGE MODAL CONTROLS ---

// Open Edit Modal and fill in all the values
function openKbEditModal(blockID, event) {
    if (event) event.preventDefault();

    const blocks = window.currentLiveKbBlocks || getTable('knowledgeBlockTable');
    const block = blocks.find(b => b.blockID === blockID);
    if (!block) return;

    activeEditingBlockID = blockID;

    // Populate modal inputs
    document.getElementById('edit-kb-title').value = block.blockTitle || '';
    document.getElementById('edit-kb-desc').value = block.description || '';
    document.getElementById('edit-kb-why').value = block.whyItMatters || '';
    document.getElementById('edit-kb-tip').value = block.maintenanceTip || '';
    document.getElementById('edit-kb-know').value = block.didYouKnow || '';
    document.getElementById('edit-kb-cost').value = block.costEstimate || '';
    document.getElementById('edit-kb-diff').value = block.difficultyLevel || 'Moderate';

    // Set Urgency select
    const urgencySelect = document.getElementById('edit-kb-urgency');
    if (urgencySelect) {
        urgencySelect.value = block.urgency || 'Important';
    }

    // Warnings array is converted to newline joined strings
    const warningsTextarea = document.getElementById('edit-kb-warning');
    if (warningsTextarea) {
        if (Array.isArray(block.warningSigns)) {
            warningsTextarea.value = block.warningSigns.join('\n');
        } else {
            warningsTextarea.value = block.warningSigns || '';
        }
    }

    // Open Modal
    const modal = document.getElementById('edit-knowledge-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close Edit Modal
function closeKbEditModal() {
    const modal = document.getElementById('edit-knowledge-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    activeEditingBlockID = null;
}

// Save Changes back to database
async function saveKbBlockChanges() {
    if (!activeEditingBlockID) return;
    
    if (!confirm('Are you sure you want to save these updated service details?')) {
        return;
    }

    const title = document.getElementById('edit-kb-title').value.trim();
    const desc = document.getElementById('edit-kb-desc').value.trim();
    const why = document.getElementById('edit-kb-why').value.trim();
    const tip = document.getElementById('edit-kb-tip').value.trim();
    const know = document.getElementById('edit-kb-know').value.trim();
    const cost = document.getElementById('edit-kb-cost').value.trim();
    const diff = document.getElementById('edit-kb-diff').value;
    const urgency = document.getElementById('edit-kb-urgency').value;

    const warningsText = document.getElementById('edit-kb-warning').value.trim();
    const warnings = warningsText ? warningsText.split('\n').map(w => w.trim()).filter(w => w.length > 0) : [];

    if (!title || !desc) {
        alert("Block Title and Short Description cannot be empty.");
        return;
    }

    try {
        const response = await fetch(`/api/knowledge/${activeEditingBlockID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blockTitle: title,
                description: desc,
                whyItMatters: why,
                maintenanceTip: tip,
                didYouKnow: know,
                costEstimate: cost,
                difficultyLevel: diff,
                urgency: urgency,
                warningSigns: warnings
            })
        });

        if (!response.ok) throw new Error('Failed to update knowledge block');

        // Refresh display
        await renderKnowledgeHub();

        // Close modal
        closeKbEditModal();

        alert("Service details successfully updated!");
    } catch (err) {
        console.error(err);
        alert("Error: Failed to save changes to the database.");
    }
}

function scrollToKhSection(categoryID) {
    const section = document.getElementById('kh-section-' + categoryID);
    if (section) {
        // Remove highlight from any previous section
        document.querySelectorAll('.kh-item-wrapper').forEach(el => {
            el.style.background = 'transparent';
            el.style.boxShadow = 'none';
        });

        // Scroll to section
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight the section
        section.style.background = 'rgba(227, 24, 55, 0.1)';
        section.style.boxShadow = '0 0 20px rgba(227, 24, 55, 0.2)';

        // Open details automatically
        const detailsDiv = document.getElementById('kh-details-' + categoryID);
        if (detailsDiv && detailsDiv.style.display !== 'block') {
            detailsDiv.style.display = 'block';
        }
    }
}

function toggleKhDetails(e, categoryID) {
    e.preventDefault();
    const detailsDiv = document.getElementById('kh-details-' + categoryID);
    if (detailsDiv) {
        if (detailsDiv.style.display === 'block') {
            detailsDiv.style.display = 'none';
        } else {
            detailsDiv.style.display = 'block';
            // Scroll it slightly into view if needed
            detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function updatePageLanguage() {
    // Legacy language function placeholder
}

// ─── PREMIUM MODAL & TOAST JAVASCRIPT SYSTEM ──────────────────────────────────
(function() {
    let toastContainer = null;
    window.showToast = function(message, type = 'success', duration = 3500) {
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'custom-toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;

        let iconClass = 'fa-check-circle';
        if (type === 'error') iconClass = 'fa-exclamation-circle';
        if (type === 'warning') iconClass = 'fa-exclamation-triangle';
        if (type === 'info') iconClass = 'fa-info-circle';

        toast.innerHTML = `
            <i class="fas ${iconClass} custom-toast-icon"></i>
            <div class="custom-toast-body">${message}</div>
        `;

        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, duration);
    };

    let modalOverlay = null;
    window.showModal = function(options = {}) {
        const {
            title = 'Notification',
            message = '',
            type = 'info', // success, error, warning, info
            confirmText = 'OK',
            cancelText = 'Cancel',
            showCancel = true,
            onConfirm = null,
            onCancel = null
        } = options;

        const isConfirmType = type === 'warning' || type === 'confirm';
        const finalShowCancel = options.showCancel !== undefined ? options.showCancel : isConfirmType;

        if (!modalOverlay) {
            modalOverlay = document.createElement('div');
            modalOverlay.className = 'custom-modal-overlay';
            document.body.appendChild(modalOverlay);
        }

        let iconClass = 'fa-info-circle';
        if (type === 'success') iconClass = 'fa-check-circle';
        if (type === 'error') iconClass = 'fa-times-circle';
        if (type === 'warning') iconClass = 'fa-exclamation-triangle';

        modalOverlay.innerHTML = `
            <div class="custom-modal-card ${type}">
                <div class="custom-modal-icon-wrapper">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="custom-modal-title">${title}</div>
                <div class="custom-modal-message">${message}</div>
                <div class="custom-modal-actions">
                    ${finalShowCancel ? `<button class="custom-modal-btn custom-modal-btn-cancel">${cancelText}</button>` : ''}
                    <button class="custom-modal-btn custom-modal-btn-confirm ${type}">${confirmText}</button>
                </div>
            </div>
        `;

        const confirmBtn = modalOverlay.querySelector('.custom-modal-btn-confirm');
        const cancelBtn = modalOverlay.querySelector('.custom-modal-btn-cancel');

        const closeModal = () => {
            modalOverlay.classList.remove('show');
            document.removeEventListener('keydown', handleKeyDown);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && finalShowCancel) {
                closeModal();
                if (onCancel) onCancel();
            } else if (e.key === 'Enter') {
                closeModal();
                if (onConfirm) onConfirm();
            }
        };

        confirmBtn.addEventListener('click', () => {
            closeModal();
            if (onConfirm) onConfirm();
        });

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                closeModal();
                if (onCancel) onCancel();
            });
        }

        modalOverlay.onclick = (e) => {
            if (e.target === modalOverlay && finalShowCancel) {
                closeModal();
                if (onCancel) onCancel();
            }
        };

        requestAnimationFrame(() => {
            modalOverlay.classList.add('show');
        });

        document.addEventListener('keydown', handleKeyDown);
    };
})();

