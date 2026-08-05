"use client";

import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";

type Props = {
  trekName?: string;
};

export default function WhatsAppButton({ trekName }: Props) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919027314439";

  const message = trekName
    ? `Hi, I want to book the ${trekName}. Please share details.`
    : "Hi, I’m interested in your treks. Please share details.";

  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    // optional: tracking (add Google Analytics / custom)
    console.log("WhatsApp clicked");
  };

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95 sm:bottom-8 sm:right-8"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappLogo weight="fill" className="h-7 w-7" />
    </a>
  );
}