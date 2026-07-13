/**
 * google-signin.js
 * Real Google Identity Services (GIS) OAuth 2.0 sign-in.
 * Works on both signin.html and signup.html.
 *
 * Flow:
 *  1. Fetch GOOGLE_CLIENT_ID from /api/config
 *  2. Initialize google.accounts.id with the client ID
 *  3. Render the official Google Sign-In button into #google-btn-container
 *  4. On credential response → POST to /api/users/google-auth (server verifies token)
 *  5. Store user in localStorage → redirect to index.html
 */

(function () {

    /* ─────────────────────────────────────────────
       Toast notification (uses global showToast if available)
    ───────────────────────────────────────────── */
    function showToast(message, type) {
        if (typeof window.showToast === 'function') {
            window.showToast(message, type);
            return;
        }
        // Fallback inline toast
        const old = document.getElementById('gs-toast');
        if (old) old.remove();

        const toast = document.createElement('div');
        toast.id = 'gs-toast';
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed', bottom: '30px', right: '30px',
            padding: '14px 24px', borderRadius: '8px', color: '#fff',
            fontFamily: 'Inter, Roboto, sans-serif', fontSize: '15px',
            fontWeight: '600', boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: '99999', opacity: '0', transform: 'translateY(20px)',
            transition: 'all 0.3s ease',
            background: type === 'success'
                ? 'linear-gradient(135deg,#34a853,#1e7e34)'
                : 'linear-gradient(135deg,#ea4335,#b31412)'
        });
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /* ─────────────────────────────────────────────
       Core: handle the verified Google credential
    ───────────────────────────────────────────── */
    async function handleGoogleCredential(credential) {
        try {
            const res = await fetch('/api/users/google-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential })
            });

            if (!res.ok) {
                const err = await res.json();
                showToast(err.error || 'Google sign-in failed. Please try again.', 'error');
                return;
            }

            const user = await res.json();
            localStorage.setItem('currentUser', JSON.stringify(user));

            const isNewUser = !localStorage.getItem('_gsi_returning_' + user.email);
            localStorage.setItem('_gsi_returning_' + user.email, '1');

            if (isNewUser) {
                showToast(`Account created! Welcome, ${user.fullName}! 🎉`, 'success');
            } else {
                showToast(`Welcome back, ${user.fullName || user.username}! 👋`, 'success');
            }

            setTimeout(() => { window.location.href = 'index.html'; }, 1500);

        } catch (err) {
            console.error('Google auth network error:', err);
            showToast('Network error during Google sign-in. Please try again.', 'error');
        }
    }

    /* ─────────────────────────────────────────────
       Init: fetch Client ID from server → init GIS
    ───────────────────────────────────────────── */
    async function initGoogleSignIn() {
        const container = document.getElementById('google-btn-container');
        if (!container) return; // Page doesn't have a Google button

        try {
            const configRes = await fetch('/api/config');
            const config    = await configRes.json();
            const clientId  = config.googleClientId;

            if (!clientId) {
                console.warn('Google Client ID not configured on server.');
                container.innerHTML = '<p style="color:#999;font-size:0.85rem;">Google sign-in unavailable</p>';
                return;
            }

            // Wait for the GIS library to load
            function tryInit() {
                if (typeof google === 'undefined' || !google.accounts) {
                    setTimeout(tryInit, 150);
                    return;
                }

                google.accounts.id.initialize({
                    client_id: clientId,
                    callback: (response) => {
                        if (response.credential) {
                            handleGoogleCredential(response.credential);
                        }
                    },
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                // Render the official Google-branded button
                google.accounts.id.renderButton(container, {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    text: container.dataset.text || 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'left',
                    width: container.offsetWidth || 360,
                });
            }

            tryInit();

        } catch (err) {
            console.error('Failed to initialize Google Sign-In:', err);
        }
    }

    document.addEventListener('DOMContentLoaded', initGoogleSignIn);

})();
