import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  IconCreditCard,
  IconChevronDown,
  IconMenu,
  IconX,
  IconSearch,
} from './Icons';
import { useContent } from '../context/ContentContext';
import { trackSearch } from '../hooks/useAnalyticsTracker';
import { SAFETY_ROUTE_BASE } from '../data/safetyContent';
import { ABOUT_ROUTE_BASE, LEADERSHIP_ROUTE_BASE } from '../data/aboutContent';
import {
  METERING_ROUTE_BASE,
  METERING_MENU,
  MAP_APPLICATION_URL,
} from '../data/meteringContent';
import {
  CUSTOMER_SERVICE_ROUTE_BASE,
  NEW_CONNECTION_ROUTE_BASE,
} from '../data/customerServiceContent';
import { TID_TOKEN_ROUTE_BASE } from '../data/tidTokenContent';
import { MEDIA_ROUTE_BASE } from '../data/mediaContent';
/* Official APL Electric Company logo (transparent PNG) used for the brand. */
import aplLogo from '../assets/apl-logo.png';
import '../navbar.css';

/* Metering is the primary top-level group. Its direct children are the MAP
   topics. Declared before BASE_MENU, which references it. */
/* Metering sub-menu items keep their full href so external destinations (the
   MAP Application portal) are opened in a new tab by the dropdown. */
const METERING_SUBMENU = METERING_MENU.map((item) => ({
  label: item.label,
  href: /^https?:\/\//i.test(item.href) ? item.href : `#${item.href}`,
  tagline: item.tagline,
}));

/* E-Billing hands off to the Smart Power billing portal. External destinations
   are opened in a new tab by externalLinkProps below. */
const E_BILLING_LOGIN_URL = 'https://admin.smartpowerbilling.com/web/login';

/* Customer Service group. E-Billing leads the list, then the metering and
   support shortcuts, the FAQs and the tariff pages. Entries with an `action`
   open a modal instead of navigating. */
const CUSTOMER_SERVICE_SUBMENU = [
  {
    label: 'E-Billing',
    /* Opens the Smart Power billing portal, where customers log in to pay. */
    href: E_BILLING_LOGIN_URL,
    tagline: 'Log in to pay and manage your electricity bill online.',
  },
  {
    label: 'Begin your application to getting metered',
    href: `#${METERING_ROUTE_BASE}/application`,
    tagline: 'Start your MAP meter application.',
  },
  {
    label: 'New Connection Request',
    href: `#${NEW_CONNECTION_ROUTE_BASE}`,
    tagline: 'Download the form, fill it and return it to management.',
  },
  {
    label: 'Get to know of your MAP metering status',
    href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/metering-status`,
    tagline: 'Track every stage of your metering journey.',
  },
  {
    /* Ticket intake lives on the SmartPowerBilling support portal. */
    label: 'Customer Support',
    href: 'https://admin.smartpowerbilling.com/support/ticket/submit',
    tagline: 'Submit a ticket on the customer support portal.',
  },
  {
    label: 'Customer Portal Login',
    href: 'https://admin.smartpowerbilling.com/web/login',
    tagline: 'Log in to track your tickets and account.',
  },
  {
    label: 'APLE FAQs',
    href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/faqs`,
    tagline: 'Get answers and information on your meter usage.',
  },
  {
    label: 'Tariff Information',
    href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/tariff-information`,
    tagline: 'Learn more about the Mass Metering programme.',
  },
  {
    label: 'Tariff Review',
    href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/tariff-review`,
    tagline: 'Get up to date tariff reviews.',
  },
];

/* The Nkeanyi Web concession now lives on its own sub-site. */
const NKEANYI_WEB_URL = 'https://nkeanyi.abapower.com/';

/* External destinations open in a new tab; in-app hash links stay put. */
const externalLinkProps = (href) =>
  /^https?:\/\//i.test(href || '')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

/* Static menu structure mirrors abapower.com. The Health & Safety group's
   children are injected at runtime from the CMS topics collection. */
const BASE_MENU = [
  {
    label: 'Company',
    href: `#${ABOUT_ROUTE_BASE}`,
    children: [
      { label: 'About Us', href: `#${ABOUT_ROUTE_BASE}` },
      { label: 'Leadership', href: `#${LEADERSHIP_ROUTE_BASE}` },
      /* Careers points at the Geometric Power careers page, opened in a new tab. */
      { label: 'Careers', href: 'https://geometricpower.com/careers.php' },
    ],
  },
  {
    label: 'Apply for a MAP meter',
    href: MAP_APPLICATION_URL,
  },
];

const STANDALONE = [{ label: 'Media & Events', href: `#${MEDIA_ROUTE_BASE}` }];

/* Intent map for the site search. Each entry matches loose visitor phrasing
   ("no light", "buy token") and routes them to the right section. Queries are
   logged by trackSearch, which is what powers "most searched keywords". */
const SEARCH_TARGETS = [
  { terms: ['metering', 'map portal', 'meter price', 'meter specification', 'initialization', 'metered'], href: `#${METERING_ROUTE_BASE}`, label: 'Metering' },
  { terms: ['map application', 'apply for meter', 'application'], href: MAP_APPLICATION_URL, label: 'MAP Application', external: true },
  { terms: ['metering status', 'map status', 'application status', 'track'], href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/metering-status`, label: 'MAP Metering Status' },
  { terms: ['outage', 'power failure', 'no light', 'fault', 'restore', 'load shedding', 'blackout'], href: '#customer-service', label: 'Report an Outage' },
  { terms: ['e-billing', 'ebilling', 'bill', 'pay', 'payment', 'recharge'], href: E_BILLING_LOGIN_URL, label: 'E-Billing', external: true },
  { terms: ['token', 'tid', 'prepaid', 'meter', 'vending'], href: `#${TID_TOKEN_ROUTE_BASE}`, label: 'TID Token' },
  { terms: ['tariff', 'rate', 'price', 'cost', 'band'], href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/tariff-information`, label: 'Tariff Information' },
  { terms: ['tariff review', 'review', 'rate change'], href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/tariff-review`, label: 'Tariff Review' },
  { terms: ['new connection', 'application', 'apply', 'connect', 'refund', 'get metered', 'connection form'], href: `#${NEW_CONNECTION_ROUTE_BASE}`, label: 'New Connection Request' },
  { terms: ['faq', 'faqs', 'aple faq', 'question'], href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/faqs`, label: 'APLE FAQs' },
  { terms: ['safety', 'health', 'covid', 'hazard', 'ppe'], href: `#${SAFETY_ROUTE_BASE}`, label: 'Health & Safety' },
  { terms: ['project', 'concession', 'nkeanyi', 'community', 'lga', 'ring fenced'], href: NKEANYI_WEB_URL, label: 'Nkeanyi Web', external: true },
  { terms: ['customer service', 'contact', 'phone'], href: `#${CUSTOMER_SERVICE_ROUTE_BASE}`, label: 'Customer Service' },
  { terms: ['support', 'complaint', 'help', 'ticket', 'log a fault', 'portal login'], href: 'https://admin.smartpowerbilling.com/support/ticket/submit', label: 'Customer Support', external: true },
  { terms: ['generation', 'distribution', 'grid', 'telemetry'], href: '#media', label: 'Media & Grid Telemetry' },
  { terms: ['industrial', 'business', 'commercial'], href: '#industrial', label: 'Industrial Customers' },
  { terms: ['news', 'update', 'press', 'announcement', 'media', 'event', 'gallery', 'photos'], href: `#${MEDIA_ROUTE_BASE}`, label: 'Media & Events' },
  { terms: ['career', 'job', 'vacancy', 'recruit'], action: 'careers', label: 'Careers' },
  { terms: ['about', 'company', 'leadership', 'who we are'], href: `#${ABOUT_ROUTE_BASE}`, label: 'About Us' },
];

export default function Navbar({ onOpenSupportModal, onOpenCareersModal }) {
  const { getCollection } = useContent();

  // Health & Safety dropdown is generated from the CMS topics collection, and
  // the Customer Service dropdown mirrors the abapower.com service menu.
  const MENU = useMemo(() => {
    const topics = getCollection('safetyTopics');
    return [
      ...BASE_MENU,
      {
        label: 'Health & Safety',
        href: `#${SAFETY_ROUTE_BASE}`,
        children: topics.map((topic) => ({
          label: topic.title,
          href: `#${SAFETY_ROUTE_BASE}/${topic.slug}`,
        })),
      },
      {
        label: 'Customer Service',
        href: `#${CUSTOMER_SERVICE_ROUTE_BASE}`,
        /* Rendered as a wide, two-column (four-pair) panel. */
        wide: true,
        children: CUSTOMER_SERVICE_SUBMENU,
      },
    ];
  }, [getCollection]);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchNote, setSearchNote] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Auto-dismiss the search feedback toast.
  useEffect(() => {
    if (!searchNote) return undefined;
    const timer = setTimeout(() => setSearchNote(''), 3200);
    return () => clearTimeout(timer);
  }, [searchNote]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleItem = useCallback(
    (item) => {
      if (item.action === 'careers') {
        onOpenCareersModal();
      } else if (item.action === 'support') {
        onOpenSupportModal();
      }
      closeMenu();
    },
    [onOpenCareersModal, onOpenSupportModal, closeMenu],
  );

  /* Site search: records the query (for the "most searched keywords" report)
     then jumps to the best matching section. */
  const runSearch = useCallback(
    (event) => {
      event.preventDefault();
      const term = query.trim();
      if (!term) return;

      trackSearch(term);

      const haystack = term.toLowerCase();
      const match = SEARCH_TARGETS.find((target) =>
        target.terms.some((t) => haystack.includes(t)),
      );

      if (!match) {
        setSearchNote(`No exact match for "${term}" — showing Customer Service.`);
        window.location.hash = `#${CUSTOMER_SERVICE_ROUTE_BASE}`;
      } else if (match.action === 'careers') {
        onOpenCareersModal();
        setSearchNote(`Showing ${match.label}.`);
      } else if (match.external) {
        window.open(match.href, '_blank', 'noopener,noreferrer');
        setSearchNote(`Opening ${match.label}.`);
      } else {
        window.location.hash = match.href;
        setSearchNote(`Showing ${match.label}.`);
      }

      setSearchOpen(false);
      setQuery('');
      closeMenu();
    },
    [query, onOpenCareersModal, closeMenu],
  );

  return (
    <header className={`gpnav ${scrolled || menuOpen ? 'gpnav-scrolled' : ''}`}>
      <div className="gpnav-wrap">
        <div className="gpnav-inner">
          {/* Brand */}
          <a
            href="#hero"
            className="gpnav-logo"
            aria-label="APL Electric Company Home"
            onClick={closeMenu}
          >
            <img
              src={aplLogo}
              alt="APL Electric Company"
              className="gpnav-logo-img"
            />
          </a>

          {/* Desktop navigation */}
          <nav className="gpnav-desktop" aria-label="Main navigation">
            {MENU.map((group) => {
              const hasChildren = Array.isArray(group.children) && group.children.length > 0;
              return (
                <div className="gpnav-item" key={group.label}>
                  <a
                    href={group.href}
                    className="gpnav-link"
                    {...externalLinkProps(group.href)}
                  >
                    {group.label}
                    {hasChildren && <IconChevronDown className="gpnav-chevron" />}
                  </a>
                  {hasChildren && (
                    <div
                      className={`gpnav-dropdown ${group.children.some((child) => child.submenu)
                        ? 'gpnav-dropdown-nested'
                        : ''
                        } ${group.wide ? 'gpnav-dropdown-wide' : ''}`}
                    >
                      {group.children.map((child) =>
                        child.action ? (
                          <a
                            key={child.label}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleItem(child);
                            }}
                          >
                            <span className="gpnav-submenu-label">{child.label}</span>
                            {child.tagline && (
                              <span className="gpnav-submenu-note">{child.tagline}</span>
                            )}
                          </a>
                        ) : child.submenu ? (
                          <div className="gpnav-subitem" key={child.label}>
                            <a href={child.href} className="gpnav-subitem-trigger">
                              <span>{child.label}</span>
                              <IconChevronDown className="gpnav-subchevron" />
                            </a>
                            <div className="gpnav-submenu">
                              {child.submenu.map((sub) => (
                                <a key={sub.label} href={sub.href}>
                                  <span className="gpnav-submenu-label">{sub.label}</span>
                                  {sub.tagline && (
                                    <span className="gpnav-submenu-note">{sub.tagline}</span>
                                  )}
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <a
                            key={child.label}
                            href={child.href}
                            {...externalLinkProps(child.href)}
                          >
                            <span className="gpnav-submenu-label">{child.label}</span>
                            {child.tagline && (
                              <span className="gpnav-submenu-note">{child.tagline}</span>
                            )}
                          </a>
                        ),
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {STANDALONE.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="gpnav-link"
                data-track={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action cluster */}
          <div className="gpnav-actions">
            {/* Site search — queries are captured for the analytics keyword report */}
            <form
              className={`gpnav-search ${searchOpen ? 'is-open' : ''}`}
              onSubmit={runSearch}
            >
              <button
                type="button"
                className="gpnav-support"
                style={{ display: 'inline-flex' }}
                onClick={() => setSearchOpen((open) => !open)}
                title="Search the site"
                aria-label="Search the site"
              >
                <IconSearch className="w-4 h-4" />
              </button>
              <input
                className="gpnav-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search: outage, token, tariff…"
                aria-label="Search the site"
              />
            </form>

            {/* "Pay Bill" links straight to the Nkeanyi self-service portal,
                where customers pay bills and buy tokens. */}
            <a
              href={NKEANYI_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gpnav-pay"
              data-track="Pay Bill (pay)"
              onClick={closeMenu}
            >
              <IconCreditCard className="w-4 h-4" />
              <span className="gpnav-pay-label">Pay Bill</span>
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="gpnav-mobile-btn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <IconX className="gpnav-mobile-icon" />
              ) : (
                <IconMenu className="gpnav-mobile-icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Transient search feedback */}
      {searchNote && (
        <div
          role="status"
          className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0b2a4a]/92 px-4 py-2 text-xs font-semibold text-white shadow-lg"
        >
          {searchNote}
        </div>
      )}

      {/* Mobile slide-down menu */}
      <div className={`gpnav-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="gpnav-mobile-wrap">
          {MENU.map((group) => {
            const hasChildren = Array.isArray(group.children) && group.children.length > 0;
            if (!hasChildren) {
              return (
                <a
                  key={group.label}
                  href={group.href}
                  className="gpnav-mobile-link"
                  onClick={closeMenu}
                  {...externalLinkProps(group.href)}
                >
                  {group.label}
                </a>
              );
            }
            return (
              <details className="gpnav-mobile-details" key={group.label}>
                <summary>{group.label}</summary>
                <div>
                  {group.children.map((child) =>
                    child.action ? (
                      <a
                        key={child.label}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleItem(child);
                        }}
                      >
                        {child.label}
                      </a>
                    ) : child.submenu ? (
                      <details className="gpnav-mobile-subdetails" key={child.label}>
                        <summary>{child.label}</summary>
                        <div>
                          <a href={child.href} onClick={closeMenu}>
                            {child.label} overview
                          </a>
                          {child.submenu.map((sub) => (
                            <a key={sub.label} href={sub.href} onClick={closeMenu}>
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={closeMenu}
                        {...externalLinkProps(child.href)}
                      >
                        {child.label}
                      </a>
                    ),
                  )}
                </div>
              </details>
            );
          })}

          {STANDALONE.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="gpnav-mobile-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          <a
            href={NKEANYI_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gpnav-mobile-pay"
            onClick={closeMenu}
          >
            <IconCreditCard className="w-4 h-4" />
            Pay Bill
          </a>

          <button
            type="button"
            className="gpnav-mobile-cta"
            onClick={() => {
              onOpenCareersModal();
              closeMenu();
            }}
          >
            Careers
          </button>
        </div>
      </div>
    </header>
  );
}
