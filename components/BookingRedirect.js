"use client";

import { useEffect } from "react";

const bookingUrl = "https://www.nailzy.com/book/candicelashandbrows";

export default function BookingRedirect() {
  useEffect(() => {
    window.location.replace(bookingUrl);
  }, []);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#351A07] px-5 text-center text-[#F7EED7]">
      <div className="max-w-[560px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DAA755]">
          Candice Lash &amp; Brows
        </p>
        <h1 className="mt-6 font-forum text-[48px] leading-tight sm:text-[64px]">
          Opening your booking page...
        </h1>
        <p className="mt-5 text-[15px] leading-7 text-white/65">
          You will be redirected to our secure online booking system.
        </p>
        <a
          href={bookingUrl}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-[#E9C579]/60 bg-[#E9C579] px-7 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#351A07] transition hover:bg-[#F1DEA8]"
        >
          Continue to booking
        </a>
      </div>
    </main>
  );
}
