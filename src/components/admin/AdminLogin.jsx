import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IconLock, IconArrowRight } from '../Icons';
/* Official APL brand logo (transparent PNG). */
import aplLogo from '../../assets/apl-logo.png';

export default function AdminLogin({ onSuccess }) {
    const { login, configured } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        // Supabase verifies the credentials server-side; only a resolved
        // session grants access.
        const { ok, error: message } = await login(email, password);

        setSubmitting(false);
        if (ok) {
            onSuccess?.();
        } else {
            setError(message || 'Incorrect email or password. Please try again.');
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e] px-4 py-16">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0072CE]/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#F5B800]/15 blur-3xl" />

            <div className="relative w-full max-w-md">
                <div className="mb-8 flex flex-col items-center text-center">
                    <img src={aplLogo} alt="APL Electric Company" className="w-44 h-auto mb-4" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#F5B800]">
                        Aba Power Content Studio
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold heading-font text-white tracking-tight">
                        Sign in to manage the site
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md shadow-2xl"
                >
                    <div className="mb-5">
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/25"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                            Password
                        </label>
                        <div className="relative">
                            <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/25"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="mb-4 rounded-xl bg-rose-500/15 px-4 py-3 text-sm font-semibold text-rose-200">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || !configured}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5B800] px-6 py-3.5 text-sm font-extrabold text-[#0b2a4a] transition-colors hover:bg-[#e0a800] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? 'Signing in…' : 'Enter dashboard'}
                        {!submitting && <IconArrowRight className="w-4 h-4" />}
                    </button>

                    {!configured ? (
                        <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center text-xs text-amber-200">
                            Supabase is not configured. Add{' '}
                            <span className="font-bold">VITE_SUPABASE_URL</span> and{' '}
                            <span className="font-bold">VITE_SUPABASE_ANON_KEY</span> to your{' '}
                            <span className="font-bold">.env.local</span>, then restart the dev
                            server.
                        </p>
                    ) : (
                        <p className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xs text-white/55">
                            Protected by{' '}
                            <span className="font-bold text-white/80">Supabase Auth</span>. Sign in
                            with your administrator account.
                        </p>
                    )}
                </form>

                <p className="mt-6 text-center text-xs text-white/40">
                    <a href="#hero" className="font-semibold text-white/60 hover:text-[#F5B800]">
                        ← Back to website
                    </a>
                </p>
            </div>
        </div>
    );
}
