"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import lashExtensionImage from "@/images/services/lash.jpg";
import lashRefillImage from "@/images/banner/eyelash-extension-procedure-woman-s-eye-with-long-eyelashes-eyelashes-close-up-macro-selective-focus-tweezers-beautiful-girl-eyelash-extension-procedure.webp";
import browsImage from "@/images/services/brows.jpg";
import lashServicesImage from "@/images/services/lash service.webp";
import permanentMakeupImage from "@/images/banner/beautician-hand-doing-eyebrow-tattooing-female-brows-closeup-shot.webp";

const services = [
  {
    category: "Permanent Makeup",
    slug: "permanent-makeup",
    title: "Permanent Makeup",
    detail: "Precise, natural-looking enhancements created to simplify your routine with lasting confidence.",
    image: permanentMakeupImage,
    position: "object-center",
  },
  {
    category: "Lash Extension",
    slug: "lash-extension",
    title: "Lash Extensions",
    detail: "Custom-designed sets that bring softness, definition, and effortless balance to your eyes.",
    image: lashExtensionImage,
    position: "object-[center_42%]",
  },
  {
    category: "Lash Refill",
    slug: "lash-refill",
    title: "Lash Refills",
    detail: "Thoughtful maintenance to restore fullness and keep your lash set looking beautifully seamless.",
    image: lashRefillImage,
    position: "object-center",
  },
  {
    category: "Brows Service",
    slug: "brows-service",
    title: "Brow Services",
    detail: "Refined shaping and definition designed around your natural features and personal style.",
    image: browsImage,
    position: "object-[center_38%]",
  },
  {
    category: "Lash Services",
    slug: "lash-services",
    title: "Lash Services",
    detail: "Personalized lash care and styling designed to enhance definition, balance, and everyday confidence.",
    image: lashServicesImage,
    position: "object-[center_42%]",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const updateVideoControls = () => setShowVideoControls(mobileQuery.matches);

    updateVideoControls();
    mobileQuery.addEventListener("change", updateVideoControls);
    return () => mobileQuery.removeEventListener("change", updateVideoControls);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap
          .timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
          .fromTo(section.querySelectorAll("[data-services-intro]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 })
          .fromTo(section.querySelectorAll("[data-service-card]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.07 }, "-=0.34");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleVideoPlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      try {
        await video.play();
      } catch {
        setIsVideoPlaying(false);
      }
      return;
    }

    video.pause();
  };

  return (
    <section id="services" ref={sectionRef} className="relative overflow-x-clip bg-[#351A07] py-20 text-[#F7EED7] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-16 h-[430px] w-[430px] rounded-full bg-[#DAA755]/10 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-44 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.045] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <div data-services-intro className="flex items-center justify-center gap-5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#DAA755]">
            <span className="luxury-line luxury-line-left max-w-[76px]" aria-hidden="true" />
            My expertise
            <span className="luxury-line luxury-line-right max-w-[76px]" aria-hidden="true" />
          </div>
          <h2 data-services-intro className="mt-6 font-forum text-[44px] leading-[0.98] sm:mt-7 sm:text-[56px] lg:text-[68px]">
            Signature services,
            <span className="mt-2 block italic text-[#E9C579]">tailored to you.</span>
          </h2>
          <p data-services-intro className="mx-auto mt-6 max-w-[590px] text-[15px] leading-7 text-[#F7EED7]/64">
            Explore the artistry and care behind every personalized appointment.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[0.64fr_1.36fr] lg:items-start lg:gap-6">
          <div data-service-card className="group relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-[32px] border border-[#E9C579]/30 bg-white/[0.06] shadow-[0_24px_60px_rgba(12,5,1,0.22)] lg:sticky lg:top-6 lg:mx-0 lg:max-w-none lg:rounded-[36px]">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              loop
              controls={showVideoControls}
              playsInline
              preload="metadata"
              aria-label="Candice Beauty Studio services and pricing video"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/videos/lash-and-brows.mp4" type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={toggleVideoPlayback}
              aria-label={isVideoPlaying ? "Pause video" : "Play video with sound"}
              className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E9C579]/80 bg-[#F7EED7]/90 text-[#462506] shadow-[0_10px_28px_rgba(20,9,2,0.3)] backdrop-blur-md transition-[left,top,width,height,background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:bg-[#FFF9EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1DEA8] motion-reduce:duration-0 ${isVideoPlaying ? "left-[calc(100%-2.375rem)] top-[2.375rem] h-11 w-11" : "left-1/2 top-1/2 h-14 w-14 sm:h-16 sm:w-16"}`}
            >
              {isVideoPlaying ? (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current">
                  <path d="m8 5 11 7-11 7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="app-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {services.map((service, index) => (
              <Link href={`/services#${service.slug}`} data-service-card key={service.category} aria-label={`View ${service.title} services`} className="group relative min-h-[420px] w-[84vw] max-w-[370px] shrink-0 snap-center overflow-hidden rounded-t-[210px] rounded-b-[28px] border border-white/12 bg-white/[0.06] shadow-[0_24px_60px_rgba(12,5,1,0.22)] sm:min-h-[440px] sm:w-[46vw] sm:max-w-none lg:min-h-[450px] lg:w-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] ${service.position}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0D02] via-[#2A1405]/42 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#E9C579]">
                    <span className="service-ornament-line" aria-hidden="true" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="service-ornament-tail" aria-hidden="true" />
                  </div>
                  <h3 className="font-forum text-[34px] leading-none text-white">{service.title}</h3>
                  <p className="mt-3 max-w-[390px] text-[13px] leading-6 text-white/68">{service.detail}</p>
                  <span className="mt-5 inline-flex items-center gap-3 border-b border-[#E9C579]/55 pb-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#F1DEA8] transition-all duration-300 group-hover:gap-4 group-hover:border-[#E9C579] group-hover:text-white">
                    Select service <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
