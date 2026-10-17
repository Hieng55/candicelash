"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import glowPortrait from "@/images/banner/Golden Glow Beauty Portrait.webp";
import hourPortrait from "@/images/banner/Golden Hour Beauty Portrait.webp";
import heroPortrait from "@/images/banner/lash-brow-hero.webp";
import browTreatment from "@/images/banner/beautician-hand-doing-eyebrow-tattooing-female-brows-closeup-shot.webp";
import lashTreatment from "@/images/banner/closeup-female-eye-tweezers-eyelash-extension.webp";
import lashDetail from "@/images/banner/eyelash-extension-procedure-woman-s-eye-with-long-eyelashes-eyelashes-close-up-macro-selective-focus-tweezers-beautiful-girl-eyelash-extension-procedure.webp";
import candiceLogo from "@/images/logo candice@3x.png";

const slides = [
  {
    background: glowPortrait,
    insetImage: lashDetail,
    eyebrow: "Candice Beauty Studio",
    title: "Defined Beauty,",
    accent: "Soft Luxury",
    description: "Discover bespoke lash and brow artistry where graceful detail, modern technique, and your natural beauty come together.",
    services: "Lashes · Brows · Permanent Makeup",
    backgroundPosition: "62% center",
    insetPosition: "50% center",
  },
  {
    background: hourPortrait,
    insetImage: browTreatment,
    eyebrow: "Bespoke Brow Artistry",
    title: "Perfectly Shaped,",
    accent: "Naturally You",
    description: "Personalized brow treatments designed to balance your features and enhance the beauty that is already yours.",
    services: "Brow Mapping · Tinting · Permanent Makeup",
    backgroundPosition: "64% center",
    insetPosition: "50% center",
  },
  {
    background: heroPortrait,
    insetImage: lashTreatment,
    eyebrow: "Signature Lash Design",
    title: "Effortless Detail,",
    accent: "Lasting Allure",
    description: "Thoughtfully designed lash sets that bring softness, definition, and an elegant finish to every look.",
    services: "Classic · Hybrid · Volume Lashes",
    backgroundPosition: "64% center",
    insetPosition: "50% center",
  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const archRef = useRef(null);
  const backgroundRefs = useRef([]);
  const insetImageRefs = useRef([]);
  const animatingRef = useRef(false);
  const touchStartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.set(backgroundRefs.current, { zIndex: 0 });
      gsap.set(insetImageRefs.current, { zIndex: 0 });
      gsap.set(backgroundRefs.current[0], { zIndex: 1, clipPath: "circle(150% at 50% 50%)" });
      gsap.set(insetImageRefs.current[0], { zIndex: 1 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero-card]", { x: -40, opacity: 0, duration: 1.05, delay: 0.25 })
        .from("[data-slide-copy]", { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.55")
        .from("[data-arch]", { x: 45, opacity: 0, duration: 1.05 }, "-=0.85")
        .from("[data-bottom-item]", { y: 20, opacity: 0, duration: 0.65, stagger: 0.12 }, "-=0.55");
    },
    { scope: heroRef },
  );

  const goToSlide = (targetIndex) => {
    if (targetIndex === activeIndex || animatingRef.current) return;
    animatingRef.current = true;

    const targetBackground = backgroundRefs.current[targetIndex];
    const currentBackground = backgroundRefs.current[activeIndex];
    const targetInsetImage = insetImageRefs.current[targetIndex];
    const currentInsetImage = insetImageRefs.current[activeIndex];

    gsap.set(targetBackground, {
      zIndex: 2,
      clipPath: "circle(0% at 50% 50%)",
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    timeline
      .to([cardRef.current, archRef.current], {
        y: 5,
        opacity: 0,
        duration: 0.22,
        ease: "sine.inOut",
        stagger: 0.02,
      })
      .addLabel("reveal", "-=0.08")
      .to(
        targetBackground,
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 0.85,
          ease: "power3.inOut",
        },
        "reveal",
      )
      .call(
        () => {
          gsap.set(currentInsetImage, { zIndex: 0 });
          gsap.set(targetInsetImage, { zIndex: 1 });
          setActiveIndex(targetIndex);
        },
        null,
        "reveal+=0.28",
      )
      .fromTo(
        cardRef.current,
        { y: 10, scale: 0.995, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power2.out", force3D: true },
        "reveal+=0.3",
      )
      .fromTo(
        archRef.current,
        { y: 7, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "sine.out", force3D: true },
        "reveal+=0.34",
      )
      .call(
        () => {
          gsap.set(currentBackground, { zIndex: 0 });
          gsap.set(targetBackground, { zIndex: 1 });
        },
        null,
        "reveal+=0.85",
      );
  };

  const moveSlide = (direction) => {
    const targetIndex = (activeIndex + direction + slides.length) % slides.length;
    goToSlide(targetIndex);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!animatingRef.current) {
        const nextIndex = (activeIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }
    }, 6500);

    return () => window.clearInterval(interval);
  }, [activeIndex]);

  const activeSlide = slides[activeIndex];

  return (
    <section
      id="home"
      ref={heroRef}
      onTouchStart={(event) => { touchStartRef.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStartRef.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartRef.current;
        if (Math.abs(distance) > 50) moveSlide(distance < 0 ? 1 : -1);
        touchStartRef.current = null;
      }}
      className="relative min-h-[800px] touch-pan-y overflow-hidden bg-[#462506] text-[#F1DEA8] sm:min-h-[860px] lg:min-h-screen"
    >
      <div className="absolute inset-0 bg-[#462506]">
        {slides.map((slide, index) => (
          <div
            key={`background-${index}`}
            ref={(element) => { backgroundRefs.current[index] = element; }}
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: index === 0 ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={slide.background}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.backgroundPosition }}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(90deg,rgba(20,10,4,0.94)_0%,rgba(34,16,5,0.78)_38%,rgba(70,37,6,0.18)_70%,rgba(20,10,4,0.36)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_72%_38%,transparent_0%,rgba(25,12,5,0.08)_46%,rgba(16,8,3,0.5)_100%)]" />

      <div className="relative z-10 mx-auto grid min-h-[800px] max-w-[1240px] grid-cols-1 items-center gap-10 px-5 pb-40 pt-28 sm:min-h-[860px] sm:px-8 sm:pb-44 sm:pt-32 lg:min-h-screen lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:px-10 lg:pb-32 lg:pt-36">
        <div ref={cardRef} data-hero-card className="relative max-w-[620px] overflow-hidden rounded-[28px] border border-white/35 bg-white/[0.14] px-6 py-9 text-[#F1DEA8] shadow-[0_30px_90px_rgba(20,9,2,0.36)] backdrop-blur-[22px] sm:rounded-[32px] sm:px-10 sm:py-11 lg:px-12 lg:py-14">
          <span className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-transparent" aria-hidden="true" />
          <span className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.12]" aria-hidden="true" />
          <div>
            <div data-slide-copy className="relative mb-6 flex items-center gap-5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#F1DEA8] [text-shadow:0_1px_12px_rgba(233,197,121,0.24)]">
              <span className="luxury-line luxury-line-left" aria-hidden="true" />
              <span className="shrink-0">{activeSlide.eyebrow}</span>
              <span className="luxury-line luxury-line-right" aria-hidden="true" />
            </div>
            <h1 data-slide-copy className="relative font-forum text-[48px] leading-[0.94] sm:text-[66px] lg:text-[78px]">
              {activeSlide.title}
              <span className="mt-2 block text-[#DAA755]">{activeSlide.accent}</span>
            </h1>
            <p data-slide-copy className="relative mt-7 max-w-[510px] text-[14px] leading-7 text-white/78 sm:text-[15px]">{activeSlide.description}</p>
            <div data-slide-copy className="relative mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Link href="tel:+14026863390" className="luxury-button luxury-button-primary group w-full sm:w-auto" aria-label="Call Candice Beauty Studio at 402-686-3390">
                <span className="relative z-10">Call now</span>
                <span className="luxury-button-icon relative z-10" aria-hidden="true">→</span>
              </Link>
              <Link href="https://www.nailzy.com/book/candicelashandbrows" target="_blank" rel="noopener noreferrer" className="luxury-button luxury-button-secondary group w-full sm:w-auto">
                <span className="relative z-10">Book now</span>
                <span className="luxury-button-icon relative z-10" aria-hidden="true">→</span>
              </Link>
            </div>
            <p data-slide-copy className="relative mt-6 text-[13px] font-semibold leading-5 tracking-[0.11em] text-[#E9C579]">{activeSlide.services}</p>
          </div>
        </div>

        <div ref={archRef} data-arch className="relative mx-auto hidden h-[540px] w-full max-w-[430px] lg:block">
          <span className="absolute right-[-40px] top-[-74px] font-forum text-[180px] leading-none text-[#F1DEA8]/10">0{activeIndex + 1}</span>
          <span className="absolute inset-10 rounded-full bg-white/[0.16] blur-[60px]" aria-hidden="true" />
          <div className="absolute inset-x-3 bottom-0 top-4 overflow-hidden rounded-t-[215px] rounded-b-[28px] border border-white/55 bg-white/[0.13] p-3 shadow-[0_28px_75px_rgba(20,9,2,0.34),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-[18px]">
            <div className="relative h-full overflow-hidden rounded-t-[200px] rounded-b-[20px]">
              {slides.map((slide, index) => (
                <div
                  key={`inset-image-${index}`}
                  ref={(element) => { insetImageRefs.current[index] = element; }}
                  className="absolute inset-0"
                  aria-hidden={index !== activeIndex}
                >
                  <Image src={slide.insetImage} alt={index === activeIndex ? activeSlide.services : ""} fill sizes="430px" className="object-cover" style={{ objectPosition: slide.insetPosition }} />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[#462506]/25 via-transparent to-white/[0.1]" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-4 z-10 flex h-28 w-28 rotate-6 items-center justify-center rounded-full border border-[#DAA755] bg-[#F1DEA8] text-center text-[#462506] shadow-xl">
            <span className="font-forum text-[18px] leading-5">Beauty in<br />every detail</span>
          </div>
        </div>
      </div>

      <aside className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <span className="mb-2 text-[12px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Follow us</span>
        {[
          ["/icons/facebook.svg", "Facebook", "https://www.facebook.com/candicebeautystudioo/"],
          ["https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg", "Instagram", "https://www.instagram.com/candice.beautystudio"],
          ["/icons/google-maps.svg", "Google Maps", "https://maps.google.com/?cid=791661076391546862"],
        ].map(([icon, label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open Candice Beauty Studio on ${label}`} title={label} className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#F1DEA8]/40 bg-[#F1DEA8]/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DAA755] hover:bg-white">
            <img src={icon} alt="" aria-hidden="true" className="h-[21px] w-[21px] object-contain transition-transform duration-300 group-hover:scale-110" />
          </a>
        ))}
      </aside>

      <div className="absolute inset-x-0 bottom-24 z-20 px-5 sm:px-8 lg:bottom-8 lg:px-10">
        <div className="mx-auto flex max-w-[1240px] items-end justify-between gap-6">
          <a href="https://maps.google.com/?cid=791661076391546862" target="_blank" rel="noopener noreferrer" data-bottom-item className="hidden max-w-[410px] items-center gap-4 rounded-[28px] border border-white/50 bg-[#F1DEA8]/90 py-2.5 pl-3 pr-6 text-[#462506] shadow-[0_12px_35px_rgba(20,9,2,0.22)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:flex" aria-label="View Candice Beauty Studio on Google Maps">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#9F6920]/20 bg-white shadow-[inset_0_0_0_2px_rgba(241,222,168,0.35)]">
              <Image
                src={candiceLogo}
                alt=""
                aria-hidden="true"
                sizes="44px"
                className="absolute left-1/2 top-1/2 h-auto w-[50px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-95"
              />
            </div>
            <div>
              <p className="font-forum text-[18px]">Candice Beauty Studio</p>
              <p className="mt-0.5 text-[12px] font-medium leading-4 tracking-[0.02em] text-[#9F6920]">2465 Mandeville Lane Unit 240, Suite 31<br />Alexandria, VA 22314</p>
            </div>
          </a>

          <div data-bottom-item className="ml-auto flex w-full items-center justify-between gap-2 rounded-full border border-[#F1DEA8]/25 bg-[#462506]/70 p-2 pl-4 backdrop-blur-xl sm:w-auto sm:justify-start sm:gap-4 sm:pl-5">
            <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous slide" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#E9C579]">← Prev</button>
            <span className="h-6 w-px bg-[#F1DEA8]/25" />
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`pb-1 text-[12px] transition-colors ${activeIndex === index ? "border-b border-[#DAA755] text-[#DAA755]" : "text-[#F1DEA8]/55 hover:text-[#F1DEA8]"}`}
              >
                0{index + 1}
              </button>
            ))}
            <button type="button" onClick={() => moveSlide(1)} aria-label="Next slide" className="luxury-control-next">Next <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </div>
    </section>
  );
}
