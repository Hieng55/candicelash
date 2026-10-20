"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const reviews = [
  {
    quote: "Candice is incredibly gentle and detail-oriented. My lashes look full, soft, and completely natural—exactly what I hoped for.",
    name: "Ashley M.",
    service: "Lash extensions",
  },
  {
    quote: "Every appointment feels personal and unhurried. She listens, explains the process, and always creates a look that suits my face.",
    name: "Tiffany R.",
    service: "Brow service",
  },
  {
    quote: "The studio is beautiful, calm, and spotless. I leave feeling polished and confident every single time.",
    name: "Nina C.",
    service: "Lash refill",
  },
  {
    quote: "The shape and color are so flattering. Candice has an amazing eye for balance and makes the entire experience feel effortless.",
    name: "Lauren D.",
    service: "Permanent makeup",
  },
  {
    quote: "My retention has been amazing, and the set still feels light and comfortable. The care and quality are unmatched.",
    name: "Mia S.",
    service: "Volume lashes",
  },
  {
    quote: "I felt completely at ease from consultation to finish. The result is refined, natural, and perfectly suited to me.",
    name: "Caroline J.",
    service: "Brow artistry",
  },
];

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

export default function Reviews() {
  const sectionRef = useRef(null);
  const touchStartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = reviews.length - visibleCount;

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index >= maxIndex ? 0 : index + 1));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isPaused, maxIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap
          .timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
          .fromTo(section.querySelectorAll("[data-review-intro]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 })
          .fromTo(section.querySelectorAll("[data-review-card]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1 }, "-=0.35");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const moveReview = (direction) => {
    setActiveIndex((index) => {
      if (direction > 0) return index >= maxIndex ? 0 : index + 1;
      return index <= 0 ? maxIndex : index - 1;
    });
  };

  return (
    <section id="reviews" ref={sectionRef} className="relative overflow-hidden bg-[#351A07] py-20 text-[#F7EED7] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 top-8 h-96 w-96 rounded-full bg-[#DAA755]/10 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.05] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <div data-review-intro className="mb-7 flex items-center gap-5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#DAA755]">
              <span className="service-ornament-line" aria-hidden="true" />
              Client love
            </div>
            <h2 data-review-intro className="max-w-[650px] font-forum text-[44px] leading-[0.98] sm:text-[56px] lg:text-[68px]">
              Beautiful results,
              <span className="mt-2 block italic text-[#E9C579]">felt beyond the mirror.</span>
            </h2>
          </div>

          <div data-review-intro className="max-w-[440px] lg:justify-self-end">
            <p className="text-[15px] leading-7 text-[#F7EED7]/64">
              Thoughtful artistry, a calming studio, and an experience designed to make every client feel seen.
            </p>
            <a href="https://maps.google.com/?cid=791661076391546862" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 border-b border-[#E9C579]/45 pb-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#E9C579] transition-all duration-300 hover:gap-4 hover:border-[#E9C579] hover:text-white">
              View my reviews on Google <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div
          className="mt-14 overflow-hidden lg:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
          onTouchStart={(event) => { touchStartRef.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            if (touchStartRef.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStartRef.current;
            if (Math.abs(distance) > 45) moveReview(distance < 0 ? 1 : -1);
            touchStartRef.current = null;
          }}
          aria-roledescription="carousel"
          aria-label="Customer reviews"
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
          >
            {reviews.map((review, index) => (
              <article key={review.name} data-review-card className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3" aria-hidden={index < activeIndex || index >= activeIndex + visibleCount}>
                <div className="flex h-full min-h-[350px] flex-col rounded-[26px] border border-white/12 bg-[#F7EED7] p-7 shadow-[0_22px_55px_rgba(12,5,1,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_65px_rgba(12,5,1,0.3)] sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] tracking-[0.1em] text-[#DAA755]" aria-label="5 out of 5 stars">
                      <span aria-hidden="true">★★★★★</span>
                    </div>
                    <span className="font-forum text-[48px] leading-none text-[#9F6920]/18" aria-hidden="true">“</span>
                  </div>

                  <blockquote className="mt-7 flex-1 font-forum text-[27px] leading-[1.24] text-[#462506]">
                    “{review.quote}”
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4 border-t border-[#9F6920]/14 pt-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#462506] font-forum text-[19px] text-[#F1DEA8]">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-forum text-[19px] leading-none">{review.name}</p>
                      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#9F6920]/75">{review.service}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 px-2">
            <div className="flex items-center gap-2" aria-label={`Review group ${activeIndex + 1} of ${maxIndex + 1}`}>
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show review group ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-[#E9C579]" : "w-2.5 bg-[#E9C579]/25 hover:bg-[#E9C579]/50"}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={() => moveReview(-1)} aria-label="Previous reviews" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9C579]/30 text-[17px] text-[#E9C579] transition-all duration-300 hover:border-[#E9C579] hover:bg-[#E9C579] hover:text-[#462506]">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => moveReview(1)} aria-label="Next reviews" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9C579]/30 text-[17px] text-[#E9C579] transition-all duration-300 hover:border-[#E9C579] hover:bg-[#E9C579] hover:text-[#462506]">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
