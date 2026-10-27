import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import PowerStats from './components/PowerStats';
import GridTelemetry from './components/GridTelemetry';
import CoverageMap from './components/CoverageMap';
import OutageTracker from './components/OutageTracker';
import NewsRoom from './components/NewsRoom';
import NkeanyiBanner from './components/NkeanyiBanner';
import MeterPortal from './components/MeterPortal';
import SupportModal from './components/SupportModal';
import CareersModal from './components/CareersModal';
import Footer from './components/Footer';
import HealthSafetyPage from './components/HealthSafetyPage';
import AboutUsPage from './components/AboutUsPage';
import LeadershipPage from './components/LeadershipPage';
import MeteringPage from './components/MeteringPage';
import TidTokenPage from './components/TidTokenPage';
import MediaEventsPage from './components/MediaEventsPage';
import NewsArticlePage from './components/NewsArticlePage';
import CustomerServicePage from './components/CustomerServicePage';
import NewConnectionPage from './components/NewConnectionPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import AdminDashboard from './components/admin/AdminDashboard';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import WhatsAppButton from './components/WhatsAppButton';
import { useHashPath } from './hooks/useHashPath';
import { useReveal } from './hooks/useReveal';
import { startVisit, usePageViews } from './hooks/useAnalyticsTracker';
import { SAFETY_ROUTE_BASE } from './data/safetyContent';
import { ABOUT_ROUTE_BASE, LEADERSHIP_ROUTE_BASE } from './data/aboutContent';
import { METERING_ROUTE_BASE } from './data/meteringContent';
import {
  CUSTOMER_SERVICE_ROUTE_BASE,
  NEW_CONNECTION_ROUTE_BASE,
} from './data/customerServiceContent';
import { TID_TOKEN_ROUTE_BASE } from './data/tidTokenContent';
import { MEDIA_ROUTE_BASE, NEWS_ROUTE_BASE } from './data/mediaContent';
import { TERMS_ROUTE_BASE } from './data/termsContent';
import { PRIVACY_ROUTE_BASE } from './data/privacyContent';

/** Hash route that opens the content management dashboard. */
const ADMIN_ROUTE_BASE = '/admin';

/**
 * Landing page: every section stacked into a single scrolling page.
 */
function LandingPage({
  onOpenSupportModal,
  onOpenCareersModal,
}) {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Continuous Marquee Ticker */}
      <Marquee />

      {/* Aba Power by the numbers: Stats Bento Grid */}
      <PowerStats />

      {/* Media: Showcase Cards */}
      <GridTelemetry
        onOpenSupportModal={onOpenSupportModal}
        onOpenCareersModal={onOpenCareersModal}
      />

      {/* Nkeanyi Web: 9 LGAs Concession Community Hub */}
      <CoverageMap />

      {/* Customer Service: Outage Tracker & 24/7 Dispatch */}
      <OutageTracker />

      {/* NewsRoom: Latest News from Aba Power (auto-sliding) */}
      <NewsRoom />

      {/* Nkeanyi App Download Banner (Overlaps / sits on top of the Footer) */}
      <NkeanyiBanner />
    </>
  );
}

export default function App() {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);

  const openPayModal = () => setIsPayModalOpen(true);
  const openSupportModal = () => setIsSupportModalOpen(true);
  const openCareersModal = () => setIsCareersModalOpen(true);

  // Tiny hash router:
  //   "#/admin[/<resource>]"        -> CMS dashboard (login gate inside)
  //   "#/health-safety[/<topic>]"   -> Health & Safety pages
  //   "#/about-us"                  -> standalone About Us page
  //   "#/leadership"                -> standalone Leadership page
  //   "#/metering[/<topic>]"        -> Metering (MAP) pages
  //   "#/customer-service[/<topic>]" -> Customer Service pages
  //   "#/new-connection"            -> standalone New Connection form page
  //   "#/tid-token"                 -> standalone TID Token (rollover) page
  //   "#/media"                     -> standalone Media & Events (newsroom + gallery) page
  //   "#/news/<id>"                 -> standalone news article (full story) page
  //   "#/terms"                     -> standalone Terms & Conditions page
  //   "#/privacy"                   -> standalone Privacy Policy page
  //   anything else                 -> scrolling landing page
  const path = useHashPath();

  // Fade/slide every `[data-reveal]` block into place as it enters the
  // viewport. Re-run per route so freshly routed pages are picked up.
  useReveal(path);

  // First-party analytics: one visit per browser session, plus a page view
  // whenever the hash route changes. Clicks on [data-track] elements are
  // captured by startVisit's document-level listener.
  useEffect(() => startVisit(), []);
  usePageViews(path);

  const isSafetyRoute =
    path === SAFETY_ROUTE_BASE || path.startsWith(`${SAFETY_ROUTE_BASE}/`);
  const isAboutRoute =
    path === ABOUT_ROUTE_BASE || path.startsWith(`${ABOUT_ROUTE_BASE}/`);
  const isLeadershipRoute =
    path === LEADERSHIP_ROUTE_BASE ||
    path.startsWith(`${LEADERSHIP_ROUTE_BASE}/`);
  const isMeteringRoute =
    path === METERING_ROUTE_BASE || path.startsWith(`${METERING_ROUTE_BASE}/`);
  const isCustomerServiceRoute =
    path === CUSTOMER_SERVICE_ROUTE_BASE ||
    path.startsWith(`${CUSTOMER_SERVICE_ROUTE_BASE}/`);
  const isNewConnectionRoute =
    path === NEW_CONNECTION_ROUTE_BASE ||
    path.startsWith(`${NEW_CONNECTION_ROUTE_BASE}/`);
  const isTidTokenRoute =
    path === TID_TOKEN_ROUTE_BASE || path.startsWith(`${TID_TOKEN_ROUTE_BASE}/`);
  const isMediaRoute =
    path === MEDIA_ROUTE_BASE || path.startsWith(`${MEDIA_ROUTE_BASE}/`);
  const isNewsRoute =
    path === NEWS_ROUTE_BASE || path.startsWith(`${NEWS_ROUTE_BASE}/`);
  const isTermsRoute =
    path === TERMS_ROUTE_BASE || path.startsWith(`${TERMS_ROUTE_BASE}/`);
  const isPrivacyRoute =
    path === PRIVACY_ROUTE_BASE || path.startsWith(`${PRIVACY_ROUTE_BASE}/`);
  const isAdminRoute =
    path === ADMIN_ROUTE_BASE || path.startsWith(`${ADMIN_ROUTE_BASE}/`);

  const safetySlug =
    isSafetyRoute && path.length > SAFETY_ROUTE_BASE.length
      ? path.slice(SAFETY_ROUTE_BASE.length + 1).replace(/\/+$/, '') || null
      : null;

  const meteringSlug =
    isMeteringRoute && path.length > METERING_ROUTE_BASE.length
      ? path.slice(METERING_ROUTE_BASE.length + 1).replace(/\/+$/, '') || null
      : null;

  const customerServiceSlug =
    isCustomerServiceRoute &&
      path.length > CUSTOMER_SERVICE_ROUTE_BASE.length
      ? path
        .slice(CUSTOMER_SERVICE_ROUTE_BASE.length + 1)
        .replace(/\/+$/, '') || null
      : null;

  // Optional article id, e.g. "#/news/nw-1" -> "nw-1".
  const newsSlug =
    isNewsRoute && path.length > NEWS_ROUTE_BASE.length
      ? path.slice(NEWS_ROUTE_BASE.length + 1).replace(/\/+$/, '') || null
      : null;

  // Optional resource key, e.g. "#/admin/news" -> "news".
  const adminResourceKey =
    isAdminRoute && path.length > ADMIN_ROUTE_BASE.length
      ? path.slice(ADMIN_ROUTE_BASE.length + 1).replace(/\/+$/, '') || null
      : null;

  // The dashboard is a standalone, chrome-free admin area.
  if (isAdminRoute) {
    return (
      <>
        {/* Brand splash: same 3s preloader effect as the public site */}
        <Preloader />
        <AdminDashboard resourceKey={adminResourceKey} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#030f1e] text-slate-100 flex flex-col font-sans selection:bg-[#0072CE] selection:text-white">
      {/* Brand splash: shown once while the site boots (3s) */}
      <Preloader />

      {/* Scroll progress bar + floating back-to-top control */}
      <ScrollProgress />

      {/* Floating WhatsApp support button (quick responses) */}
      <WhatsAppButton />

      {/* Navigation Header */}
      <Navbar
        onOpenPayModal={openPayModal}
        onOpenSupportModal={openSupportModal}
        onOpenCareersModal={openCareersModal}
      />

      {/* Routed content */}
      <main className="flex-1">
        {isSafetyRoute ? (
          <HealthSafetyPage slug={safetySlug} />
        ) : isLeadershipRoute ? (
          <LeadershipPage />
        ) : isAboutRoute ? (
          <AboutUsPage />
        ) : isMeteringRoute ? (
          <MeteringPage slug={meteringSlug} />
        ) : isNewConnectionRoute ? (
          <NewConnectionPage onOpenSupportModal={openSupportModal} />
        ) : isCustomerServiceRoute ? (
          <CustomerServicePage
            slug={customerServiceSlug}
            onOpenSupportModal={openSupportModal}
          />
        ) : isTidTokenRoute ? (
          <TidTokenPage />
        ) : isNewsRoute ? (
          <NewsArticlePage slug={newsSlug} />
        ) : isMediaRoute ? (
          <MediaEventsPage />
        ) : isTermsRoute ? (
          <TermsPage />
        ) : isPrivacyRoute ? (
          <PrivacyPage />
        ) : (
          <LandingPage
            onOpenSupportModal={openSupportModal}
            onOpenCareersModal={openCareersModal}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPayModal={openPayModal}
        onOpenSupportModal={openSupportModal}
      />

      {/* Modals */}
      <MeterPortal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} />

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        onOpenPayModal={() => {
          setIsSupportModalOpen(false);
          setIsPayModalOpen(true);
        }}
      />

      <CareersModal
        isOpen={isCareersModalOpen}
        onClose={() => setIsCareersModalOpen(false)}
      />
    </div>
  );
}
