"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const instagramPosts = [
  "https://www.instagram.com/p/DeAcqtmILNP/",
  "https://www.instagram.com/p/DdbXZwgxFqT/",
  "https://www.instagram.com/p/DekdH4EoI-B/",
  "https://www.instagram.com/p/DeSgTyjI4kq/",
  "https://www.instagram.com/p/DeKQPBbRr13/",
  "https://www.instagram.com/p/Dd1RvAGxn2C/",
];

const getEmbedUrl = (url) => `${url.replace(/^http:/, "https:").replace(/\/$/, "")}/embed/`;

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
              Explore recent lash, brow, and beauty transformations from Candice Beauty Studio.
            </p>
            <a href="https://www.instagram.com/candice.beautystudio" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 border-b border-[#9F6920]/35 pb-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9F6920] transition-all duration-300 hover:gap-4 hover:border-[#9F6920] hover:text-[#462506]">
              Follow on Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="app-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {instagramPosts.map((postUrl, index) => (
            <article data-gallery-card key={postUrl} className="group relative w-[86vw] max-w-[380px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-[#9F6920]/16 bg-white shadow-[0_24px_60px_rgba(70,37,6,0.12)] sm:w-[52vw] sm:max-w-none lg:w-auto">
              <iframe
                src={getEmbedUrl(postUrl)}
                title={`Instagram gallery post ${index + 1}`}
                loading="lazy"
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                className="block h-[610px] w-full border-0 bg-white sm:h-[640px] lg:h-[610px]"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
