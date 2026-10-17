"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const bookingUrl = "https://www.nailzy.com/book/candicelashandbrows";
const directionsUrl = "https://maps.google.com/?cid=791661076391546862";

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap
          .timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
          .fromTo(section.querySelectorAll("[data-contact-copy]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 })
          .fromTo(section.querySelector("[data-contact-map]"), { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75 }, "-=0.45");
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden bg-[#F7EED7] text-[#462506]">
      <div className="pointer-events-none absolute -left-44 bottom-0 h-[440px] w-[440px] rounded-full bg-white/60 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1440px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex items-center px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-32 xl:pl-[100px] xl:pr-20">
          <div className="w-full max-w-[590px]">
            <div data-contact-copy className="mb-7 flex items-center gap-5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#9F6920]">
              <span className="about-rule" aria-hidden="true" />
              Visit the studio
            </div>

            <h2 data-contact-copy className="font-forum text-[44px] leading-[0.98] sm:text-[56px] lg:text-[68px]">
              Your beauty ritual,
              <span className="mt-2 block italic text-[#9F6920]">made personal.</span>
            </h2>

            <p data-contact-copy className="mt-7 max-w-[510px] text-[15px] leading-7 text-[#462506]/68">
              Ready for a look designed around you? Reserve your appointment or reach out to plan your visit to Candice Beauty Studio.
            </p>

            <div data-contact-copy className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-[#9F6920]/16 bg-[#9F6920]/16 sm:grid-cols-2">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="group bg-white/65 p-6 transition-colors duration-300 hover:bg-white">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9F6920]">Find us</span>
                <address className="mt-3 font-forum text-[20px] not-italic leading-7 text-[#462506]">
                  2465 Mandeville Lane<br />Unit 240, Suite 31<br />Alexandria, VA 22314
                </address>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9F6920] transition-all duration-300 group-hover:gap-3">
                  Get directions <span aria-hidden="true">↗</span>
                </span>
              </a>

              <div className="bg-white/65 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9F6920]">Studio hours</span>
                <div className="mt-3 space-y-3 font-forum text-[18px] leading-6">
                  <p><span className="block text-[#462506]">Monday – Saturday</span><span className="text-[#9F6920]">9:30 AM – 7 PM</span></p>
                  <p><span className="block text-[#462506]">Sunday</span><span className="text-[#9F6920]">11:30 AM – 7 PM</span></p>
                </div>
              </div>
            </div>

            <div data-contact-copy className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="luxury-button luxury-button-primary group w-full sm:w-auto">
                <span className="relative z-10">Book now</span>
                <span className="luxury-button-icon relative z-10" aria-hidden="true">↗</span>
              </a>
              <a href="tel:+14026863390" className="luxury-button luxury-button-contact group w-full sm:w-auto" aria-label="Call Candice Beauty Studio at 402-686-3390">
                <span className="relative z-10">Call us</span>
                <span className="luxury-button-icon relative z-10" aria-hidden="true">→</span>
              </a>
            </div>

            <a data-contact-copy href="tel:+14026863390" className="mt-7 inline-block font-forum text-[25px] text-[#9F6920] transition-colors hover:text-[#462506]">
              (402) 686-3390
            </a>
          </div>
        </div>

        <div data-contact-map className="relative min-h-[520px] overflow-hidden border-t border-[#9F6920]/16 lg:min-h-[790px] lg:border-l lg:border-t-0">
          <iframe
            title="Map to Candice Beauty Studio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.2802374543194!2d-77.0713591!3d38.8031317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b128e3166c33%3A0xafc8b8df8d24fee!2sCandice%20Lash%20%26%20Brows!5e0!3m2!1sen!2s!4v1792217415336!5m2!1sen!2s"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.55] sepia-[0.22]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F7EED7]/20 via-transparent to-transparent" aria-hidden="true" />

          <a href="#" className="absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#E9C579]/55 bg-[#462506]/90 text-[#F1DEA8] shadow-[0_12px_30px_rgba(20,9,2,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E9C579] hover:bg-[#351A07]" aria-label="Back to top">
            <span className="text-[20px]" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>

    </section>
  );
}
