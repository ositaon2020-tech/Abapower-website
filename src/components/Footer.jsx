import React from 'react';
import {
  IconPhone,
  IconMapPin,
  IconMessageSquare,
  IconInstagram,
  IconTwitter,
  IconFacebook,
} from './Icons';
import {
  CUSTOMER_SERVICE_ROUTE_BASE,
  NEW_CONNECTION_ROUTE_BASE,
} from '../data/customerServiceContent';
import { METERING_ROUTE_BASE } from '../data/meteringContent';
/* Official APL Electric Company logo (transparent PNG). */
import aplLogo from '../assets/apl-logo.png';

/* The footer's "Customer Portal" entry mirrors the destination used by the
   Customer Service menu's "Customer Portal Login" item. */
const CUSTOMER_PORTAL_LOGIN_URL = 'https://admin.smartpowerbilling.com/web/login';

/* Official Aba Power social profiles. */
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/abapoweronline',
  twitter: 'https://x.com/AbaPowerOnline',
  facebook: 'https://www.facebook.com/share/1BvN5hdEY5/',
};

export default function Footer({ onOpenPayModal, onOpenSupportModal }) {
  const socials = [
    { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: IconInstagram },
    { label: 'X (Twitter)', href: SOCIAL_LINKS.twitter, Icon: IconTwitter },
    { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: IconFacebook },
  ];

  return (
    <footer className="bg-white text-slate-600 border-t border-[#0072CE]/20 pt-36 sm:pt-40 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#0072CE]/15"
          data-reveal-stagger
        >
          {/* Col 1: About Us */}
          <div className="lg:col-span-4 space-y-4">
            <img
              src={aplLogo}
              alt="APL Electric Company"
              className="w-36 h-auto"
            />
            <h4 className="font-extrabold text-[#0b2a4a] text-sm uppercase tracking-wider heading-font">
              About Us
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              APLE is a pioneer private sector licensee of the Nigerian Electricity Regulatory
              Commission, NERC for electricity distribution in Nigeria. APLE is a special purpose
              vehicle of the Aba Integrated Power Project for distribution of electricity to
              consumers within its ring-fenced Aba metropolis.
            </p>
          </div>

          {/* Col 2: Quicklinks */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-[#0b2a4a] text-sm uppercase tracking-wider mb-4 heading-font">
              Quicklinks
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-[#0072CE] transition-colors">Risk Policy Statement</a></li>
              <li><a href={`#${NEW_CONNECTION_ROUTE_BASE}`} className="hover:text-[#0072CE] transition-colors">Request New Connection</a></li>
              <li><a data-track="Footer · Customer Portal" href={CUSTOMER_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#0072CE] transition-colors">Customer Portal</a></li>
              <li><a href="#" className="hover:text-[#0072CE] transition-colors">FAQs</a></li>
              <li><a href="#/terms" className="hover:text-[#0072CE] transition-colors">Terms & Conditions</a></li>
              <li><a href="#/privacy" className="hover:text-[#0072CE] transition-colors">Privacy</a></li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-[#0b2a4a] text-sm uppercase tracking-wider mb-4 heading-font">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href={`#${METERING_ROUTE_BASE}`} className="hover:text-[#0072CE] transition-colors">Metering</a></li>
              <li><a data-track="Footer · Customer Service" href={`#${CUSTOMER_SERVICE_ROUTE_BASE}`} className="hover:text-[#0072CE] transition-colors">Customer Service</a></li>
              {/* Careers points at the Geometric Power careers page, the same
                  destination used by the main menu. */}
              <li><a href="https://geometricpower.com/careers.php" target="_blank" rel="noopener noreferrer" className="hover:text-[#0072CE] transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="font-extrabold text-[#0b2a4a] text-sm uppercase tracking-wider mb-4 heading-font">
              Contact Info
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <IconMapPin className="w-4 h-4 text-[#F5B800] flex-shrink-0 mt-0.5" />
                <span>Suite 300, Aba Power Plaza, No.2 Aba Power Road Osisioma-Aba, Abia State</span>
              </div>
              <div className="flex items-center gap-2 text-[#0b2a4a] font-bold">
                <IconPhone className="w-4 h-4 text-[#F5B800] flex-shrink-0" />
                <span>09162788075</span>
              </div>
              <div className="flex items-center gap-2 text-[#0b2a4a] font-bold">
                <IconMessageSquare className="w-4 h-4 text-[#F5B800] flex-shrink-0" />
                <span>+234 909 186 6376</span>
              </div>

              <div className="flex items-center gap-3 pt-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0072CE]/10 text-[#0072CE] border border-[#0072CE]/20 hover:bg-[#0072CE] hover:text-white transition-colors"
                  >
                    <social.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"
          data-reveal="up"
        >
          <div>
            © 2026 APL Electric Company Limited.
          </div>
          <div>
            Powered by Aba Power
          </div>
        </div>
      </div>
    </footer>
  );
}
