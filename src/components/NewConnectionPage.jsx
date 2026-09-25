import React from 'react';
import {
    IconZap,
    IconDocument,
    IconArrowRight,
    IconCheckCircle,
    IconPhone,
    IconMessageSquare,
    IconLock,
    IconCopy,
} from './Icons';
import { useContent } from '../context/ContentContext';
import {
    NEW_CONNECTION_PAGE,
} from '../data/customerServiceContent';
// Vite resolves the imported PDF to a hashed asset URL at build time, so the
// download below always points at the deployed copy of the official form.
import newConnectionFormPdf from '../assets/APLE-NEW-SERVICE-CONNECTION-FORM-1-1.pdf';

const formHref = `${newConnectionFormPdf}#view=FitH`;

function PageBanner({ children }) {
    return (
        <div className="relative pt-36 pb-14 sm:pt-40 sm:pb-16 overflow-hidden bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e]">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0072CE]/25 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F5B800]/15 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute inset-0 blue-grid-overlay opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal="up">{children}</div>
        </div>
    );
}

function HeroStats({ stats }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-4xl" data-reveal-stagger>
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm"
                >
                    <span className="block text-xl sm:text-2xl font-extrabold heading-font text-white">
                        {stat.value}
                    </span>
                    <span className="block text-[11px] sm:text-xs font-semibold text-white/65 mt-1 leading-snug">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function NewConnectionPage({ onOpenSupportModal = () => { } }) {
    const { getSettings } = useContent();
    const branding = getSettings ? getSettings('branding') : {};
    const submitEmail = branding?.email || NEW_CONNECTION_PAGE.submit.email;
    const submitPhone = branding?.phone || NEW_CONNECTION_PAGE.submit.phone;

    return (
        <div id="new-connection" className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]">
            <PageBanner>
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70 mb-5"
                >
                    <a href="#hero" className="hover:text-[#F5B800] transition-colors">
                        Home
                    </a>
                    <span aria-hidden="true">/</span>
                    <a
                        href="#customer-service"
                        className="hover:text-[#F5B800] transition-colors"
                    >
                        Customer Service
                    </a>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#F5B800] font-semibold">New Connection Request</span>
                </nav>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
                    <IconZap className="w-3.5 h-3.5 text-[#F5B800]" />
                    <span>{NEW_CONNECTION_PAGE.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white heading-font tracking-tight leading-[1.1] max-w-4xl">
                    {NEW_CONNECTION_PAGE.title}{' '}
                    <span className="text-[#F5B800]">{NEW_CONNECTION_PAGE.titleAccent}</span>
                </h1>

                <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6 max-w-3xl">
                    {NEW_CONNECTION_PAGE.subtitle}
                </p>

                <HeroStats stats={NEW_CONNECTION_PAGE.stats} />
            </PageBanner>

            {/* Download card */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-reveal-stagger>
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-[#cfe2f5]">
                                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-[#0072CE] mb-3">
                                    <IconDocument className="w-3.5 h-3.5" />
                                    <span>Application form</span>
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-3">
                                    Aba Power new service connection form
                                </h2>
                                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                                    Download the official form below, complete every section and return it
                                    to Aba Power management for processing. You can print it to fill in by
                                    hand or type directly into the PDF before sending it back.
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={newConnectionFormPdf}
                                        download="APLE-NEW-SERVICE-CONNECTION-FORM-1-1.pdf"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5B800] text-[#0b2a4a] font-extrabold text-sm hover:bg-[#ffcb2b] transition-all shadow-lg"
                                    >
                                        <IconDocument className="w-4 h-4" />
                                        <span>Download the form (PDF)</span>
                                    </a>
                                    <a
                                        href={formHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0072CE] text-white font-bold text-sm hover:bg-[#005fb3] transition-all"
                                    >
                                        <IconArrowRight className="w-4 h-4" />
                                        <span>View in browser</span>
                                    </a>
                                </div>

                                <div className="mt-8 pt-8 border-t border-[#e2eefb]">
                                    <h3 className="text-lg sm:text-xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-4">
                                        What to include
                                    </h3>
                                    <ul className="space-y-3">
                                        {NEW_CONNECTION_PAGE.requirements.map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <IconCheckCircle className="w-5 h-5 text-[#0072CE] flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How it works */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-lg border border-[#cfe2f5]">
                                <h2 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-6">
                                    How the application works
                                </h2>
                                <ol className="space-y-6">
                                    {NEW_CONNECTION_PAGE.steps.map((step, index) => (
                                        <li key={step.title} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0072CE] text-white flex items-center justify-center font-extrabold heading-font">
                                                {index + 1}
                                            </span>
                                            <span>
                                                <span className="block font-extrabold heading-font text-[#0b2a4a] text-sm sm:text-base">
                                                    {step.title}
                                                </span>
                                                <span className="block text-slate-600 text-sm leading-relaxed mt-1">
                                                    {step.body}
                                                </span>
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="mt-4 bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e] rounded-3xl p-7 sm:p-8">
                                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-[#F5B800] mb-3">
                                    <IconLock className="w-3.5 h-3.5" />
                                    <span>Return your form</span>
                                </span>
                                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5">
                                    {NEW_CONNECTION_PAGE.submit.note}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={`mailto:${submitEmail}`}
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F5B800] text-[#0b2a4a] font-extrabold text-sm hover:bg-[#ffcb2b] transition-all"
                                    >
                                        <IconCopy className="w-4 h-4" />
                                        <span className="break-all">{submitEmail}</span>
                                    </a>
                                    <button
                                        type="button"
                                        onClick={onOpenSupportModal}
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white font-bold text-sm hover:bg-white/10 transition-all"
                                    >
                                        <IconMessageSquare className="w-4 h-4" />
                                        <span>Customer support</span>
                                    </button>
                                </div>
                                <p className="text-white/60 text-xs mt-4">
                                    Prefer to talk it through? Call the Aba Power customer service line on{' '}
                                    <span className="text-[#F5B800] font-semibold">{submitPhone}</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact strip */}
            <section className="pb-16 sm:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl border border-[#cfe2f5] p-7 sm:p-9 grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-reveal="up">
                        <div>
                            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-[#0072CE] mb-2">
                                <IconPhone className="w-3.5 h-3.5" />
                                <span>Talk to us</span>
                            </span>
                            <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                                Need help applying?
                            </h3>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href={`tel:${String(submitPhone).replace(/\s/g, '')}`}
                                className="rounded-2xl border border-[#cfe2f5] bg-[#f4f9fe] px-5 py-4 hover:shadow-md transition-all"
                            >
                                <span className="block text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500 mb-1">
                                    Call
                                </span>
                                <span className="block text-lg font-extrabold heading-font text-[#0b2a4a]">
                                    {submitPhone}
                                </span>
                            </a>
                            <a
                                href={`mailto:${submitEmail}`}
                                className="rounded-2xl border border-[#cfe2f5] bg-[#f4f9fe] px-5 py-4 hover:shadow-md transition-all"
                            >
                                <span className="block text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500 mb-1">
                                    Email
                                </span>
                                <span className="block text-lg font-extrabold heading-font text-[#0b2a4a] break-all">
                                    {submitEmail}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
