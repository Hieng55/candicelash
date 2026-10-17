"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import candiceLogo from "@/images/logo.png";

const leftNavigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
];

const rightNavigation = [
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Book now", href: "https://www.nailzy.com/book/candicelashandbrows", external: true },
];

const navigation = [...leftNavigation, ...rightNavigation];

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from("[data-header-item]", {
        y: -16,
        opacity: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope: headerRef },
  );

  useGSAP(
    () => {
      if (!menuRef.current) return;
      const menu = menuRef.current;
      const links = linksRef.current.filter(Boolean);

      if (isOpen) {
        gsap.set(menu, { visibility: "visible" });
        gsap
          .timeline()
          .to(menu, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power4.inOut" })
          .fromTo(links, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45 }, "-=0.25");
      } else {
        gsap
          .timeline({ onComplete: () => gsap.set(menu, { visibility: "hidden" }) })
          .to(links, { y: -10, opacity: 0, stagger: 0.03, duration: 0.18 })
          .to(menu, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.48, ease: "power4.inOut" });
      }
    },
    { dependencies: [isOpen] },
  );

  const renderLink = (item) => {
    const isActive = pathname === item.href;

    return (
      <Link
        key={item.label}
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        aria-current={isActive ? "page" : undefined}
        data-header-item
        className={`nav-link relative py-3 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 hover:text-[#DAA755] ${
          isActive ? "nav-link-active text-[#DAA755]" : "text-[#F1DEA8]"
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header ref={headerRef} className="absolute inset-x-0 top-0 z-50 text-[#F1DEA8]">
      <div className="mx-auto grid h-[84px] max-w-[1240px] grid-cols-[1fr_auto] items-center px-5 sm:px-8 lg:h-[118px] lg:grid-cols-[1fr_190px_1fr] lg:px-10">
        <nav aria-label="Primary navigation" className="hidden items-center justify-end gap-8 pr-8 lg:flex xl:gap-11 xl:pr-12">
          {leftNavigation.map(renderLink)}
        </nav>

        <Link
          href="/"
          data-header-item
          className="relative z-[60] block h-[70px] w-[175px] justify-self-start lg:h-[86px] lg:w-[190px] lg:justify-self-center"
          aria-label="Candice Beauty Studio - Home"
        >
          <Image
            src={candiceLogo}
            alt="Candice Beauty Studio"
            priority
            sizes="190px"
            className="brand-logo absolute left-1/2 top-1/2 h-auto w-[198px] max-w-none -translate-x-1/2 -translate-y-1/2 lg:w-[225px]"
          />
        </Link>

        <nav aria-label="Secondary navigation" className="hidden items-center justify-start gap-8 pl-8 lg:flex xl:gap-11 xl:pl-12">
          {rightNavigation.map(renderLink)}
        </nav>

        <button
          type="button"
          data-header-item
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="relative z-[60] flex h-11 w-11 items-center justify-center justify-self-end lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-7">
            <span className={`absolute left-0 top-0 h-px w-7 bg-[#F1DEA8] transition-transform duration-300 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-px w-5 bg-[#DAA755] transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute bottom-0 left-0 h-px w-7 bg-[#F1DEA8] transition-transform duration-300 ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="invisible fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#462506] px-6 pb-8 pt-[112px] lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setIsOpen(false)}
              ref={(element) => { linksRef.current[index] = element; }}
              className="flex items-baseline justify-between border-b border-[#9F6920]/45 py-3 text-[#F1DEA8]"
            >
              <span className="font-forum text-[32px] sm:text-[40px]">{item.label}</span>
              <span className="text-[12px] tracking-[0.16em] text-[#DAA755]">0{index + 1}</span>
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-center text-[12px] uppercase tracking-[0.18em] text-[#E9C579]/70">
          Lashes · Brows · PMU
        </p>
      </div>
    </header>
  );
}
