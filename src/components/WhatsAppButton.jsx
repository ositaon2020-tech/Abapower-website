import React from 'react';
import { IconWhatsApp } from './Icons';

/**
 * Floating WhatsApp support button.
 *
 * A sticky, bottom-left "chat" affordance that opens a WhatsApp conversation
 * with the Aba Power support line for quick responses. It sits opposite the
 * back-to-top control (bottom-right) so the two never overlap, and carries the
 * WhatsApp brand green so it reads instantly as a chat entry point.
 */

/* Aba Power support / WhatsApp line, matching the footer contact
   (+234 909 186 6376). `wa.me` requires the number without "+" or spaces. */
const WHATSAPP_NUMBER = '2349091866376';

/* Pre-filled opener so customers land in the chat ready to type. */
const WHATSAPP_MESSAGE = "Hello Aba Power, I'd like some support.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
)}`;

export default function WhatsAppButton() {
    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="Floating · WhatsApp Support"
            aria-label="Chat with Aba Power support on WhatsApp"
            title="Chat with us on WhatsApp"
            className="apl-whatsapp"
        >
            {/* Soft pulsing halo behind the button */}
            <span className="apl-whatsapp-pulse" aria-hidden="true" />

            {/* Brand glyph */}
            <span className="apl-whatsapp-icon" aria-hidden="true">
                <IconWhatsApp className="w-7 h-7" />
            </span>

            {/* Label that slides out on hover / focus */}
            <span className="apl-whatsapp-label">Chat with us</span>
        </a>
    );
}
