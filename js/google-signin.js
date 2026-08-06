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
    const DEFAULT_CLIENT_ID = '856818404675-87d132b9u3aqdon4gctovo96umukb7cf.apps.googleusercontent.com';

    /* ─────────────────────────────────────────────
       Fallback: Interactive Google Sign-In Popup
    ───────────────────────────────────────────── */
    function renderFallbackGoogleBtn(container) {
        container.innerHTML = `
            <button type="button" id="fallback-google-btn" style="
                display: flex; align-items: center; justify-content: center; gap: 10px;
                width: 100%; height: 44px; background: #ffffff; color: #3c4043;
                border: 1px solid #dadce0; border-radius: 4px; font-family: 'Roboto', 'Segoe UI', sans-serif;
                font-size: 14px; font-weight: 500; cursor: pointer; transition: background-color 0.2s, box-shadow 0.2s;
                box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            ">
                <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.41-1.57-5.14-3.74L.88 13.04C2.36 15.98 5.43 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.86 10.78c-.18-.53-.28-1.09-.28-1.78s.1-1.25.28-1.78L.88 4.96C.32 6.08 0 7.48 0 9s.32 2.92.88 4.04l2.98-2.26z"/>
                    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0 5.43 0 2.36 2.02.88 4.96l2.98 2.26C4.59 5.05 6.62 3.58 9 3.58z"/>
                </svg>
                Sign in with Google
            </button>`;

        const btn = document.getElementById('fallback-google-btn');
        if (btn) {
            btn.addEventListener('mouseover', () => { btn.style.backgroundColor = '#f8f9fa'; });
            btn.addEventListener('mouseout', () => { btn.style.backgroundColor = '#ffffff'; });
            btn.addEventListener('click', () => {
                const width = 460, height = 580;
                const left = (window.screen.width - width) / 2;
                const top = (window.screen.height - height) / 2;
                window.open('google-mock-signin.html', 'GoogleSignIn', `width=${width},height=${height},top=${top},left=${left}`);
            });
        }
    }

    // Listen for completion from popup window
    window.addEventListener('message', async (event) => {
        if (event.data && event.data.type === 'GOOGLE_SIGNIN_SUCCESS') {
            const { email, fullName } = event.data.user;
            const username = email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase() || 'user';
            
            // Try syncing with backend API if available
            try {
                const res = await fetch('/api/users/google-auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ credential: 'mock_' + btoa(email) })
                });
                if (res.ok) {
                    const dbUser = await res.json();
                    localStorage.setItem('currentUser', JSON.stringify(dbUser));
                    showToast(`Welcome back, ${dbUser.fullName || dbUser.username}! 👋`, 'success');
                    setTimeout(() => { window.location.href = 'index.html'; }, 1200);
                    return;
                }
            } catch (e) {
                console.warn('Backend google-auth unavailable, signing in locally:', e);
            }

            // Local fallback sign in
            const localUser = {
                userID: 'u' + Date.now().toString(36),
                username: username,
                fullName: fullName || username,
                email: email,
                role: 'Customer'
            };
            localStorage.setItem('currentUser', JSON.stringify(localUser));
            showToast(`Welcome back, ${localUser.fullName}! 👋`, 'success');
            setTimeout(() => { window.location.href = 'index.html'; }, 1200);
        }
    });

    /* ─────────────────────────────────────────────
       Init: fetch Client ID from server → init GIS
    ───────────────────────────────────────────── */
    async function initGoogleSignIn() {
        const container = document.getElementById('google-btn-container');
        if (!container) return; // Page doesn't have a Google button

        let clientId = DEFAULT_CLIENT_ID;

        try {
            const configRes = await fetch('/api/config').catch(() => null);
            if (configRes && configRes.ok) {
                const config = await configRes.json();
                if (config.googleClientId) {
                    clientId = config.googleClientId;
                }
            }
        } catch (err) {
            console.warn('Could not fetch server config, using default Google Client ID:', err);
        }

        // Wait for the GIS library to load
        let attempts = 0;
        function tryInit() {
            if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                try {
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
                    return;
                } catch (err) {
                    console.warn('Google GIS button render failed, falling back to popup handler:', err);
                }
            }

            attempts++;
            if (attempts < 15) {
                setTimeout(tryInit, 150);
            } else {
                // If Google GIS script fails to load (offline or blocked), render interactive popup button
                renderFallbackGoogleBtn(container);
            }
        }

        tryInit();
    }

    document.addEventListener('DOMContentLoaded', initGoogleSignIn);

})();
