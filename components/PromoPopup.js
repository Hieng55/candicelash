"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import promoImage1 from "@/images/popup/1.jpg";
import promoImage2 from "@/images/popup/2.jpg";

const promoImages = [promoImage1, promoImage2];

export default function PromoPopup() {
  const pathname = usePathname();
  const [activePopup, setActivePopup] = useState(0);
  const isBookingPage = pathname.startsWith("/booking");
  const isOpen = !isBookingPage && activePopup < promoImages.length;

  const closeCurrentPopup = () => {
    setActivePopup((currentPopup) => currentPopup + 1);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeCurrentPopup();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Promotion ${activePopup + 1} of ${promoImages.length}`}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#160B03]/85 p-3 backdrop-blur-sm sm:p-6"
      onClick={closeCurrentPopup}
    >
      <div
        className="relative flex max-h-[calc(100dvh-24px)] max-w-[min(92vw,620px)] items-center justify-center sm:max-h-[calc(100dvh-48px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={promoImages[activePopup]}
          alt={`Candice Lash & Brows promotion ${activePopup + 1}`}
          priority
          sizes="(max-width: 680px) 92vw, 620px"
          className="h-auto max-h-[calc(100dvh-24px)] w-auto max-w-full rounded-[20px] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:max-h-[calc(100dvh-48px)]"
        />

        <button
          type="button"
          onClick={closeCurrentPopup}
          aria-label={activePopup === promoImages.length - 1 ? "Close promotion" : "Close and view next promotion"}
          autoFocus
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-[#351A07]/90 text-white shadow-lg backdrop-blur-sm transition hover:rotate-90 hover:bg-[#9F6920] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3 sm:top-3"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
