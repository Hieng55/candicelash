"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import gsap from "gsap";

const tiktokProfileUrl = "https://www.tiktok.com/@candicebeautystudio";

export default function Gallery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap
          .timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
          .fromTo(section.querySelectorAll("[data-gallery-intro]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 })
          .fromTo(section.querySelectorAll("[data-gallery-card]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.35");
        observer.disconnect();
      },
      { threshold: 0.08 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative overflow-hidden bg-[#F7EED7] py-20 text-[#462506] sm:py-24 lg:py-32">
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[430px] w-[430px] rounded-full bg-white/55 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-44 bottom-20 h-[420px] w-[420px] rounded-full bg-[#DAA755]/12 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.62fr]">
          <div>
            <div data-gallery-intro className="mb-7 flex items-center gap-5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#9F6920]">
              <span className="about-rule" aria-hidden="true" />
              Follow the artistry
            </div>
            <h2 data-gallery-intro className="max-w-[690px] font-forum text-[44px] leading-[0.98] sm:text-[56px] lg:text-[68px]">
              From the studio,
              <span className="mt-2 block italic text-[#9F6920]">to your inspiration.</span>
            </h2>
          </div>

          <div data-gallery-intro className="max-w-[420px] lg:justify-self-end">
            <p className="text-[15px] leading-7 text-[#462506]/68">
              Explore recent lash, brow, and beauty transformations from Candice Beauty Studio on TikTok.
            </p>
            <a href="https://www.tiktok.com/@candicebeautystudio" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 border-b border-[#9F6920]/35 pb-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9F6920] transition-all duration-300 hover:gap-4 hover:border-[#9F6920] hover:text-[#462506]">
              Follow on TikTok <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div data-gallery-card className="relative mx-auto mt-12 max-w-[900px] overflow-visible rounded-[32px] border border-[#E9C579]/20 bg-[#351A07] p-3 shadow-[0_30px_80px_rgba(70,37,6,0.2)] sm:overflow-hidden sm:p-6 lg:mt-16 lg:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#DAA755]/12 blur-[80px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/[0.06] blur-[90px]" aria-hidden="true" />

          <div className="relative mb-5 flex flex-col gap-4 px-2 pt-2 text-[#F7EED7] sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:px-1">
            <div>
              <div className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E9C579]">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E9C579] opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E9C579]" />
                </span>
                Live from TikTok
              </div>
              <h3 className="mt-3 font-forum text-[30px] leading-tight sm:text-[38px]">
                Fresh from the studio.
              </h3>
            </div>
            <p className="max-w-[300px] text-[13px] leading-6 text-[#F7EED7]/60 sm:text-right">
              New transformations appear here automatically whenever we post.
            </p>
          </div>

          <div className="tiktok-profile-shell relative overflow-visible rounded-[22px] border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:overflow-hidden">
            <blockquote
              className="tiktok-embed !m-0 !min-w-full !max-w-full"
              cite={tiktokProfileUrl}
              data-unique-id="candicebeautystudio"
              data-embed-from="oembed"
              data-embed-type="creator"
            >
              <section className="flex min-h-[420px] items-center justify-center px-6 text-center">
                <a
                  href={tiktokProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#462506]"
                >
                  View @candicebeautystudio on TikTok
                </a>
              </section>
            </blockquote>
          </div>

          <div className="relative mt-4 flex flex-col gap-3 px-2 pb-1 sm:flex-row sm:items-center sm:justify-between sm:px-1">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[#F7EED7]/55">
              <span className="text-[#E9C579]" aria-hidden="true">↔</span>
              Swipe to explore our latest work
            </p>
            <a
              href={tiktokProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E9C579]/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E9C579] transition hover:border-[#E9C579] hover:bg-[#E9C579] hover:text-[#351A07]"
            >
              Follow @candicebeautystudio <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
