import React, { useEffect, useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { RESOURCES, resourcesByGroup } from '../../data/cms/resources';
import {
    ResourceIcon,
    IconDashboard,
    IconLogout,
    IconDatabase,
    IconChart,
    IconExternal,
    IconX,
    IconMenu,
} from './AdminIcons';
/* Official APL brand logo (transparent PNG). */
import aplLogo from '../../assets/apl-logo.png';
import AdminOverview from './AdminOverview';
import AnalyticsPanel from './AnalyticsPanel';
import ResourceManager from './ResourceManager';
import SettingsEditor from './SettingsEditor';
import DataPanel from './DataPanel';
import AdminLogin from './AdminLogin';
/* Reuse the site preloader styling for the admin session-check splash. */
import '../../preloader.css';

const DASHBOARD_VIEW = '__dashboard';
const ANALYTICS_VIEW = '__analytics';
const DATA_VIEW = '__data';

export default function AdminDashboard({ resourceKey = null }) {
    const { isAuthenticated, authReady, logout, content } = useContent();
    const [view, setView] = useState(resourceKey || DASHBOARD_VIEW);
    const [navOpen, setNavOpen] = useState(false);

    // Keep the active panel in sync with the URL (e.g. #/admin/news).
    // The analytics panel is not a CMS resource, so it gets its own token.
    useEffect(() => {
        if (!resourceKey) return;
        setView(resourceKey === 'analytics' ? ANALYTICS_VIEW : resourceKey);
    }, [resourceKey]);

    // Wait for Supabase to resolve any persisted session before deciding.
    // Without this the login screen would flash for already-signed-in admins.
    if (!authReady) {
        // Mirrors the site preloader: the logo sits inside the revolving ring.
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e]">
                <div className="apl-preloader-inner">
                    <div className="apl-preloader-spinner">
                        <span className="apl-preloader-track" aria-hidden="true" />
                        <span className="apl-preloader-ring" aria-hidden="true" />
                        <img
                            src={aplLogo}
                            alt="APL Electric Company"
                            className="apl-preloader-logo"
                        />
                    </div>
                    <p className="apl-preloader-text">Verifying session…</p>
                </div>
            </div>
        );
    }

    // Hard gate: no authenticated Supabase session means no dashboard.
    if (!isAuthenticated) {
        return <AdminLogin onSuccess={() => setView(DASHBOARD_VIEW)} />;
    }

    const groups = resourcesByGroup();
    const activeResource = RESOURCES.find((r) => r.key === view) || null;

    const select = (key) => {
        setView(key);
        setNavOpen(false);
    };

    const sideNav = (
        <nav className="flex flex-col gap-6">
            <button
                type="button"
                onClick={() => select(DASHBOARD_VIEW)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${view === DASHBOARD_VIEW
                    ? 'bg-[#0072CE] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
            >
                <IconDashboard className="w-4 h-4" />
                Dashboard
            </button>

            {Object.entries(groups).map(([group, resources]) => (
                <div key={group}>
                    <p className="mb-2 px-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                        {group}
                    </p>
                    <div className="flex flex-col gap-1">
                        {resources.map((resource) => {
                            const active = view === resource.key;
                            const count =
                                resource.kind === 'collection'
                                    ? (content.collections[resource.key] || []).length
                                    : null;
                            return (
                                <button
                                    key={resource.key}
                                    type="button"
                                    onClick={() => select(resource.key)}
                                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${active ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <ResourceIcon name={resource.icon} className="w-4 h-4 flex-shrink-0" />
                                    <span className="flex-1 text-left truncate">{resource.label}</span>
                                    {count !== null && (
                                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/70">
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div>
                <p className="mb-2 px-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                    Insights
                </p>
                <button
                    type="button"
                    onClick={() => select(ANALYTICS_VIEW)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${view === ANALYTICS_VIEW ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <IconChart className="w-4 h-4" />
                    Analytics
                </button>
            </div>

            <div>
                <p className="mb-2 px-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                    System
                </p>
                <button
                    type="button"
                    onClick={() => select(DATA_VIEW)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${view === DATA_VIEW ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <IconDatabase className="w-4 h-4" />
                    Data & Backups
                </button>
            </div>
        </nav>
    );

    const panel = () => {
        if (view === DASHBOARD_VIEW) return <AdminOverview onNavigate={select} />;
        if (view === ANALYTICS_VIEW) return <AnalyticsPanel />;
        if (view === DATA_VIEW) return <DataPanel />;
        if (!activeResource) {
            return <p className="text-sm text-slate-500">Select an item from the sidebar.</p>;
        }
        if (activeResource.kind === 'singleton') {
            return <SettingsEditor resource={activeResource} />;
        }
        return <ResourceManager resource={activeResource} />;
    };

    return (
        <div className="flex min-h-screen bg-[#eef4fb]">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto bg-gradient-to-b from-[#0b2440] to-[#030f1e] px-4 py-6 transition-transform lg:static lg:translate-x-0 ${navOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="mb-6 flex items-center justify-between px-1">
                    <a href="#hero" className="flex items-center gap-3">
                        <img src={aplLogo} alt="APL Electric Company" className="w-10 h-auto" />
                        <span>
                            <span className="block text-sm font-extrabold text-white heading-font leading-tight">
                                Content Studio
                            </span>
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F5B800]">
                                Aba Power
                            </span>
                        </span>
                    </a>
                    <button
                        type="button"
                        onClick={() => setNavOpen(false)}
                        className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 lg:hidden"
                        aria-label="Close navigation"
                    >
                        <IconX className="w-5 h-5" />
                    </button>
                </div>

                {sideNav}

                <div className="mt-auto pt-6">
                    <a
                        href="#hero"
                        className="mb-2 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white"
                    >
                        <IconExternal /> View live site
                    </a>
                    <button
                        type="button"
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-300/80 hover:bg-rose-500/15 hover:text-rose-200"
                    >
                        <IconLogout className="w-4 h-4" />
                        Sign out
                    </button>
                </div>
            </aside>

            {navOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setNavOpen(false)}
                    className="fixed inset-0 z-40 bg-[#030f1e]/50 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Main */}
            <div className="flex-1 min-w-0">
                {/* Mobile topbar */}
                <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
                    <button
                        type="button"
                        onClick={() => setNavOpen(true)}
                        className="rounded-lg p-2 text-[#0b2a4a] hover:bg-slate-100"
                        aria-label="Open navigation"
                    >
                        <IconMenu />
                    </button>
                    <span className="text-sm font-extrabold text-[#0b2a4a]">Content Studio</span>
                </div>

                <div className="px-4 py-8 sm:px-8 lg:px-10">{panel()}</div>
            </div>
        </div>
    );
}
