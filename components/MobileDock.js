"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Home",
    href: "/",
    icon: <path d="M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5M9 21v-7h6v7" />,
  },
  {
    label: "Services",
    href: "/services",
    icon: <path d="M12 3c1.7 3.3 4.1 5.7 7 7-2.9 1.3-5.3 3.7-7 7-1.7-3.3-4.1-5.7-7-7 2.9-1.3 5.3-3.7 7-7Zm6.5 13.5c.7 1.3 1.7 2.3 3 3-1.3.7-2.3 1.7-3 3-.7-1.3-1.7-2.3-3-3 1.3-.7 2.3-1.7 3-3Z" />,
  },
  {
    label: "Book",
    href: "https://www.nailzy.com/book/candicelashandbrows",
    external: true,
    icon: <><rect x="4" y="5" width="16" height="16" rx="3" /><path d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h6" /></>,
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: <><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="2" /><path d="m5 18 4.5-4.5 3 3 2-2L19 19" /></>,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <><path d="M21 11.5a8.3 8.3 0 0 1-8.5 8.2 9.5 9.5 0 0 1-4-.9L3 21l1.8-5a8.1 8.1 0 0 1-1.1-4.1 8.3 8.3 0 0 1 8.5-8.2A8.3 8.3 0 0 1 21 11.5Z" /><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></>,
  },
];

export default function MobileDock() {
  const pathname = usePathname();
  const activeIndex = items.findIndex((item) => !item.external && item.href === pathname);

  return (
    <nav aria-label="Quick navigation" className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
      <div className="relative mx-auto grid max-w-[460px] grid-cols-5 items-center rounded-[30px] border border-[#E9C579]/25 bg-[#251006]/90 p-1.5 shadow-[0_16px_44px_rgba(20,9,2,0.3)] backdrop-blur-2xl supports-[padding:max(0px)]:pb-[max(6px,env(safe-area-inset-bottom))]">
        <span className="pointer-events-none absolute inset-y-0 left-1.5 right-1.5" aria-hidden="true">
          <span className={`absolute inset-y-0 left-0 w-1/5 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${activeIndex < 0 ? "opacity-0" : "opacity-100"}`} style={{ transform: `translate3d(${Math.max(activeIndex, 0) * 100}%, 0, 0)` }}>
            <span className="absolute inset-x-0.5 inset-y-1.5 rounded-[24px] border border-white/70 bg-[#F1DEA8] shadow-[0_7px_20px_rgba(218,167,85,0.16),inset_0_1px_0_white]" />
          </span>
        </span>

        {items.map((item, index) => {
          const isActive = !item.external && activeIndex === index;
          const ItemLink = item.external ? "a" : Link;

          return (
          <ItemLink
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            aria-current={isActive ? "page" : undefined}
            className={`group relative isolate flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[24px] px-1 text-[10px] font-medium tracking-[0.02em] transition-colors duration-500 sm:min-h-[62px] sm:text-[11px] ${item.external ? "z-30" : "z-10"} ${item.external ? "text-[#462506]" : isActive ? "text-[#462506]" : "text-[#F1DEA8]/58 hover:text-[#F1DEA8]"}`}
          >
            {item.external && <span className="absolute left-1/2 top-1/2 z-0 h-[56px] w-[56px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#251006] bg-gradient-to-br from-[#F1DEA8] to-[#DAA755] shadow-[0_8px_22px_rgba(218,167,85,0.28)] transition-transform duration-500 group-hover:scale-105 sm:h-[60px] sm:w-[60px]" aria-hidden="true" />}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`relative z-10 h-[19px] w-[19px] transition-transform duration-500 ${isActive ? "-translate-y-0.5 scale-105" : "scale-100"}`} aria-hidden="true">
              {item.icon}
            </svg>
            <span className="relative z-10">{item.label}</span>
          </ItemLink>
          );
        })}
      </div>
    </nav>
  );
}
