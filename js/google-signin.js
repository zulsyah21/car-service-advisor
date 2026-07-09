/**
 * google-signin.js
 * Handles "Sign In / Sign Up with Google" via the mock popup (google-mock-signin.html).
 * Works on both signin.html and signup.html.
 *
 * Flow:
 *  1. User clicks the Google button.
 *  2. A centered popup opens (google-mock-signin.html).
 *  3. The popup posts a GOOGLE_SIGNIN_SUCCESS message with { email, fullName }.
 *  4. This script receives the message, finds or creates the user in localStorage,
 *     sets currentUser, and redirects to index.html.
 */

(function () {

    /* ─────────────────────────────────────────────
       localStorage helpers (mirrors script.js style)
    ───────────────────────────────────────────── */
    function getTable(name) {
        try {
            return JSON.parse(localStorage.getItem(name)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveTable(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    /* ─────────────────────────────────────────────
       Popup helpers
    ───────────────────────────────────────────── */
    function openGooglePopup() {
        const w = 500, h = 600;
        const left = Math.round(window.screenX + (window.outerWidth - w) / 2);
        const top = Math.round(window.screenY + (window.outerHeight - h) / 2);
        return window.open(
            'google-mock-signin.html',
            'GoogleSignIn',
            `width=${w},height=${h},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=no,resizable=no`
        );
    }

    /* ─────────────────────────────────────────────
       Toast notification
    ───────────────────────────────────────────── */
    function showToast(message, type) {
        // Remove existing toast if any
        const old = document.getElementById('google-signin-toast');
        if (old) old.remove();

        const toast = document.createElement('div');
        toast.id = 'google-signin-toast';
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '14px 24px',
            borderRadius: '8px',
            color: '#fff',
            fontFamily: 'Inter, Roboto, sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: '99999',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease',
            background: type === 'success' ? 'linear-gradient(135deg,#34a853,#1e7e34)' : 'linear-gradient(135deg,#ea4335,#b31412)'
        });

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        // Animate out and remove
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /* ─────────────────────────────────────────────
       Core: handle the signed-in Google user
    ───────────────────────────────────────────── */
    function handleGoogleUser(googleUser) {
        const email    = (googleUser.email    || '').toLowerCase().trim();
        const fullName = (googleUser.fullName || '').trim();

        if (!email) return;

        // --- Look up existing user by email ---
        const users = getTable('userTable');
        let user = users.find(u => (u.email || '').toLowerCase() === email);

        if (user) {
            // Existing user → log in
            localStorage.setItem('currentUser', JSON.stringify(user));
            showToast(`Welcome back, ${user.fullName || user.username}! 👋`, 'success');
        } else {
            // New user → auto-register as Customer
            const newUserID    = 'u' + Date.now();
            const newCustomerID = 'c' + Date.now();
            const emailPrefix  = email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase();
            const username     = emailPrefix || 'user' + Date.now();

            const newUser = {
                userID:   newUserID,
                username: username,
                fullName: fullName || username,
                email:    email,
                password: '',          // no password for Google accounts
                phoneNum: '',
                role:     'Customer',
                authProvider: 'google'
            };

            const newCustomer = {
                customerID: newCustomerID,
                userID:     newUserID
            };

            users.push(newUser);
            saveTable('userTable', users);

            const customers = getTable('customerTable');
            customers.push(newCustomer);
            saveTable('customerTable', customers);

            localStorage.setItem('currentUser', JSON.stringify(newUser));
            showToast(`Account created! Welcome, ${newUser.fullName}! 🎉`, 'success');
        }

        // Redirect to home after a short delay so the toast is visible
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    /* ─────────────────────────────────────────────
       Attach button handlers on DOMContentLoaded
    ───────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {

        // Covers both #google-signin-btn (signin.html) and #google-signup-btn (signup.html)
        const btn = document.getElementById('google-signin-btn')
                 || document.getElementById('google-signup-btn');

        if (!btn) return; // Page doesn't have a Google button — nothing to do

        btn.addEventListener('click', function () {
            const popup = openGooglePopup();

            if (!popup) {
                showToast('Popup blocked! Please allow popups for this site.', 'error');
                return;
            }

            function messageHandler(event) {
                const data = event.data;
                if (data && data.type === 'GOOGLE_SIGNIN_SUCCESS' && data.user) {
                    window.removeEventListener('message', messageHandler);
                    handleGoogleUser(data.user);
                }
            }

            window.addEventListener('message', messageHandler);

            // Safety: remove listener if popup is closed without completing sign-in
            const pollClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(pollClosed);
                    window.removeEventListener('message', messageHandler);
                }
            }, 500);
        });
    });

})();
