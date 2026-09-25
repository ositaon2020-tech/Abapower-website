import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

/** Human-readable message used when the project has no env configuration yet. */
const NOT_CONFIGURED_MESSAGE =
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file, then restart the dev server.';

/**
 * Reduce a Supabase session to the small shape the UI needs. Keeping this
 * explicit avoids leaking the whole session/token object into components.
 */
function normaliseSession(session) {
    if (!session?.user) return null;
    return {
        id: session.user.id,
        email: session.user.email,
        lastSignInAt: session.user.last_sign_in_at || null,
        provider: session.user.app_metadata?.provider || 'email',
    };
}

/**
 * AUTH PROVIDER — enforces email/password authentication through Supabase.
 *
 * The dashboard only unlocks once Supabase reports an active session. This is
 * the *client* half of the gate; because every protected table in Supabase must
 * also have Row Level Security enabled, an unauthenticated request is rejected
 * at the database too — the UI gate alone is not the security boundary.
 */
export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    // When Supabase is not configured there is nothing to bootstrap, so we are
    // "ready" immediately and simply deny access.
    const [authReady, setAuthReady] = useState(!isSupabaseConfigured);

    /* -------------------------------------------------------- bootstrap */
    useEffect(() => {
        // Unconfigured builds are already "ready" (see the initial state) and
        // have nothing to subscribe to.
        if (!supabase) return undefined;

        let active = true;

        // 1) Pick up any persisted session from localStorage.
        supabase.auth
            .getSession()
            .then(({ data }) => {
                if (!active) return;
                setSession(normaliseSession(data.session));
            })
            .finally(() => {
                if (active) setAuthReady(true);
            });

        // 2) React to sign-in / sign-out / token refresh for the tab's lifetime.
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(normaliseSession(nextSession));
            setAuthReady(true);
        });

        return () => {
            active = false;
            subscription.unsubscribe();
        };
    }, []);

    /* ------------------------------------------------------------- login */
    const login = useCallback(async (email, password) => {
        if (!supabase) {
            return { ok: false, error: NOT_CONFIGURED_MESSAGE };
        }
        if (!email || !password) {
            return { ok: false, error: 'Enter both your email and password.' };
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (error) {
            // Normalise Supabase's messages into clearer operator-facing copy.
            const message =
                error.message === 'Invalid login credentials'
                    ? 'Incorrect email or password. Please try again.'
                    : error.message || 'Sign-in failed. Please try again.';
            return { ok: false, error: message };
        }

        setSession(normaliseSession(data.session));
        return { ok: true, error: null };
    }, []);

    /* ------------------------------------------------------------ logout */
    const logout = useCallback(async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        // Clear locally regardless so the UI never stays stuck "signed in".
        setSession(null);
    }, []);

    const value = useMemo(
        () => ({
            session,
            isAuthenticated: Boolean(session),
            authReady,
            isSupabaseConfigured,
            configured: isSupabaseConfigured,
            login,
            logout,
        }),
        [session, authReady, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}

export default AuthContext;
