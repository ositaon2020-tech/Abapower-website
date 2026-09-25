import { createClient } from '@supabase/supabase-js';

/**
 * Supabase browser client.
 *
 * Reads configuration from Vite env vars so the same build works across
 * environments without editing code:
 *
 *   VITE_SUPABASE_URL       e.g. https://xxxxxxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY  the project's public "anon" API key
 *
 * The anon key is safe to ship to the browser because every table it can touch
 * is protected by Row Level Security. Never put the `service_role` key here.
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Placeholder text shipped in `.env.example` / `.env.local`. Treating these as
 * "not configured" means the app shows a helpful setup notice instead of firing
 * pointless requests at a fake host.
 */
const PLACEHOLDER_PATTERN = /your-project-ref|your-anon|example\.supabase\.co/i;

const isPlaceholder = (value) => !value || PLACEHOLDER_PATTERN.test(value);

/**
 * True when both required env vars are present and look like real values. The
 * auth layer uses this to decide whether it can talk to Supabase, or should
 * fail closed and explain how to configure it.
 */
export const isSupabaseConfigured = Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !isPlaceholder(SUPABASE_URL) &&
    !isPlaceholder(SUPABASE_ANON_KEY),
);

/**
 * The shared client instance, or `null` when the environment is not yet
 * configured. Guarded so importing this module never throws at build time.
 */
export const supabase = isSupabaseConfigured
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            // Persist the session in localStorage and refresh tokens
            // automatically so admins stay signed in across reloads.
            persistSession: true,
            autoRefreshToken: true,
            // Parse the session from the URL after magic-link / OAuth redirects.
            detectSessionInUrl: true,
        },
    })
    : null;

export default supabase;
