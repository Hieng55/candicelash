"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import studioImage from "@/images/about us/Luxe Candice Lash Studio Retreat.webp";
import portraitImage from "@/images/about us/avatar.jpg";
import candiceLogo from "@/images/logo candice@3x.png";

export default function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.context(() => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from("[data-about-image]", { y: 24, opacity: 0, duration: 0.8 })
            .from("[data-about-portrait]", { y: 18, opacity: 0, duration: 0.65 }, "-=0.42")
            .from("[data-about-copy]", { y: 14, opacity: 0, duration: 0.55, stagger: 0.07 }, "-=0.5");
        }, section);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-[#F7EED7] py-20 text-[#462506] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-white/25 blur-[90px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-28 top-16 h-96 w-96 rounded-full bg-[#E9C579]/10 blur-[100px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-14 sm:gap-18 lg:grid-cols-[1.04fr_0.96fr] lg:gap-24">
          <div className="relative pb-20 sm:pb-24 lg:pt-3">
            <div className="absolute -left-3 -top-3 bottom-[84px] right-8 rounded-tl-[138px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[76px] border border-[#DAA755]/28 sm:rounded-tl-[198px]" aria-hidden="true" />

            <div data-about-image className="relative aspect-[1.12/1] overflow-hidden rounded-tl-[125px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[68px] border border-white/75 bg-[#E9C579]/20 shadow-[0_30px_75px_rgba(70,37,6,0.12)] sm:rounded-tl-[185px]">
              <Image
                src={studioImage}
                alt="Inside Candice Beauty Studio"
                fill
                sizes="(min-width: 1024px) 650px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#462506]/12 via-transparent to-white/[0.06]" />
            </div>

            <div data-about-portrait className="absolute bottom-1 left-2 w-[145px] sm:left-7 sm:w-[185px] lg:-left-5 lg:w-[198px]">
              <div className="relative aspect-[0.76/1] overflow-hidden rounded-t-[94px] rounded-b-[20px] border-[7px] border-[#F7EED7] bg-white shadow-[0_20px_48px_rgba(70,37,6,0.18)]">
                <Image src={portraitImage} alt="Candice, lash and brow artist" fill sizes="200px" className="object-cover object-[center_28%]" />
              </div>
              <div className="absolute -bottom-2 -right-5 h-14 w-14 overflow-hidden rounded-full border border-[#DAA755]/55 bg-white shadow-[0_8px_22px_rgba(70,37,6,0.15)] sm:h-[68px] sm:w-[68px]">
                <Image src={candiceLogo} alt="" aria-hidden="true" sizes="68px" className="absolute left-1/2 top-1/2 h-auto w-[78px] max-w-none -translate-x-1/2 -translate-y-1/2 sm:w-[88px]" />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4 text-[12px] font-semibold uppercase tracking-[0.26em] text-[#9F6920]">
              <span className="about-rule" aria-hidden="true" />
              Private beauty studio
            </div>
          </div>

          <div className="relative lg:pt-1">
            <div data-about-copy className="mb-7 flex items-center gap-5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#9F6920]">
              <span className="about-rule" aria-hidden="true" />
              About Candice
            </div>

            <h2 data-about-copy className="max-w-[560px] font-forum text-[44px] leading-[0.98] sm:text-[56px] lg:text-[68px]">
              Artistry shaped around you,
              <span className="mt-2 block italic text-[#9F6920]">with care in every detail.</span>
            </h2>

            <div data-about-copy className="mt-8 max-w-[550px] space-y-4 text-[15px] leading-7 text-[#462506]/70">
              <p>Hi, I’m Candice Truong. For more than eight years, I’ve specialized in luxury lash and brow artistry, creating refined, personalized looks for hundreds of clients.</p>
              <p>I believe beauty should feel distinctly yours. Every appointment begins with listening—to your features, your style, and the way you want to feel—then thoughtfully enhancing what is naturally beautiful about you.</p>
            </div>

            <div data-about-copy className="mt-8 border-y border-[#9F6920]/16 bg-white/30 px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#9F6920]">Visit the studio</span>
                  <h3 className="mt-1 font-forum text-[28px] leading-none">Studio hours</h3>
                </div>
                <span className="text-[12px] text-[#462506]/50">Alexandria, Virginia</span>
              </div>

              <div className="mt-4 divide-y divide-[#9F6920]/12 border-t border-[#9F6920]/12">
                <div className="flex items-center justify-between gap-4 py-3 text-[13px]">
                  <span className="font-forum text-[16px] text-[#462506]/68">Monday – Saturday</span>
                  <span className="font-semibold text-[#462506]">9:30 AM – 7 PM</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-3 text-[13px]">
                  <span className="font-forum text-[16px] text-[#9F6920]">Sunday</span>
                  <span className="font-semibold text-[#9F6920]">11:30 AM – 7 PM</span>
                </div>
              </div>
            </div>

            <div data-about-copy className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#9F6920]">Follow my work</span>
              <div className="flex items-center gap-3">
                {[
                  ["/icons/facebook.svg", "Facebook", "https://www.facebook.com/candicebeautystudioo/"],
                  ["https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg", "Instagram", "https://www.instagram.com/candice.beautystudio"],
                  ["/icons/google-maps.svg", "Google Maps", "https://maps.google.com/?cid=791661076391546862"],
                ].map(([icon, label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${label}`} title={label} className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#9F6920]/20 bg-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DAA755] hover:bg-white">
                    <img src={icon} alt="" aria-hidden="true" className="h-[18px] w-[18px] object-contain transition-transform duration-300 group-hover:scale-105" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
