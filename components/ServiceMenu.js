"use client";

import { useEffect, useState } from "react";

const bookingUrl = "https://www.nailzy.com/book/candicelashandbrows";

const categories = [
  {
    name: "Lash Extension",
    slug: "lash-extension",
    eyebrow: "Full sets & finishing touches",
    services: [
      ["Classic Full Set", 149, 90, null, "One extension per natural lash for clean length, soft fullness, and an elegant everyday finish."],
      ["Hybrid Full Set", 179, 90, null, "A balanced blend of classic lashes and lightweight volume fans for soft texture and added dimension."],
      ["Wet Look Full Set", 169, 90, null, "Glossy, defined lash spikes create a dark, wispy, mascara-like finish without heavy volume."],
      ["Volume Full Set", 199, 120, null, "Lightweight volume fans add airy density, depth, and a fuller glamorous finish."],
      ["Anime / Medusa Full Set", 179, 120, "from", "Strategic spikes and wispy texture create a lifted, doll-like statement look. Reference photo recommended."],
      ["Lash Removal without New Set", 30, 30, null, "Gentle professional removal designed to protect the health of your natural lashes."],
      ["Lash Removal + New Set", 15, 30, null, "Safe removal of your existing extensions before applying a fresh full set."],
      ["Add-on Wispy", 15, 15, null, "Soft textured spikes add extra movement, definition, and a touch of drama to your set."],
    ],
  },
  {
    name: "Lash Refill",
    slug: "lash-refill",
    eyebrow: "Maintain your signature set",
    services: [
      ["Classic Refill · 2 Weeks", 75, 60],
      ["Classic Refill · 3 Weeks", 95, 60],
      ["Hybrid Refill · 2 Weeks", 90, 60],
      ["Hybrid Refill · 3 Weeks", 110, 75],
      ["Wet Look Refill · 2 Weeks", 85, 60],
      ["Wet Look Refill · 3 Weeks", 105, 60],
      ["Volume Refill · 2 Weeks", 100, 75],
      ["Volume Refill · 3 Weeks", 130, 90],
      ["Anime Lash Refill", 120, 90, "from"],
    ],
  },
  {
    name: "Brows Service",
    slug: "brows-service",
    eyebrow: "Shape, lift & definition",
    services: [
      ["Brow Wax", 15, 15],
      ["Brow Wax & Shaping", 30, 30],
      ["Brow Lamination & Shaping", 90, 60],
      ["Brow Lamination & Tint", 115, 60],
      ["Brow Tint & Shaping", 45, 30],
    ],
  },
  {
    name: "Lash Services",
    slug: "lash-services",
    eyebrow: "Natural lash treatments",
    services: [
      ["Lash Lift", 95, 60],
      ["Lash Lift and Tint", 105, 60],
      ["Lash Tint · Lower Lashes", 20, 20],
    ],
  },
  {
    name: "Permanent Makeup",
    slug: "permanent-makeup",
    eyebrow: "Long-lasting brow artistry",
    services: [
      ["Consultation", 0, 5],
      ["Nano Hairstroke Brows", 750, 180],
      ["Ombré Brows / Shading Brows", 550, 180],
      ["Combo Brows · Hairstroke & Shading", 650, 180],
      ["6–8 Week Touch-up", 150, 60],
      ["Semi-annual Touch-up", 200, 60],
      ["Yearly Touch-up", 250, 60],
    ],
  },
];

const formatPrice = (price, mode) => {
  if (price === 0) return "Complimentary";
  return `${mode === "from" ? "From " : ""}$${price}`;
};

export default function ServiceMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const category = categories[activeIndex];

  useEffect(() => {
    const selectCategoryFromHash = () => {
      const slug = window.location.hash.slice(1);
      const categoryIndex = categories.findIndex((item) => item.slug === slug);

      if (categoryIndex < 0) return;
      setActiveIndex(categoryIndex);
      window.requestAnimationFrame(() => {
        document.getElementById("service-menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    selectCategoryFromHash();
    window.addEventListener("hashchange", selectCategoryFromHash);
    return () => window.removeEventListener("hashchange", selectCategoryFromHash);
  }, []);

  const selectCategory = (index) => {
    setActiveIndex(index);
    window.history.replaceState(null, "", `#${categories[index].slug}`);
  };

  return (
    <section id="service-menu" className="relative scroll-mt-4 bg-[#F7EED7] py-16 text-[#462506] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="app-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
          {categories.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => selectCategory(index)}
              aria-pressed={activeIndex === index}
              className={`shrink-0 snap-start rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-400 sm:px-6 ${activeIndex === index ? "border-[#462506] bg-[#462506] text-[#F1DEA8] shadow-[0_10px_24px_rgba(70,37,6,0.16)]" : "border-[#9F6920]/20 bg-white/45 text-[#9F6920] hover:border-[#9F6920]/50 hover:bg-white"}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div key={category.name} className="service-panel-enter mt-10 overflow-hidden rounded-[30px] border border-[#9F6920]/16 bg-white/55 shadow-[0_30px_80px_rgba(70,37,6,0.09)] sm:mt-12">
          <div className="border-b border-[#9F6920]/14 px-6 py-8 sm:px-9 sm:py-10 lg:flex lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9F6920]">{category.eyebrow}</p>
              <h2 className="mt-3 font-forum text-[40px] leading-none sm:text-[52px]">{category.name}</h2>
            </div>
            <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-[#462506]/48 lg:mt-0">{category.services.length} services</p>
          </div>

          <div className="divide-y divide-[#9F6920]/12 px-4 sm:px-7">
            {category.services.map(([name, price, duration, mode, description], index) => (
              <article key={name} className="group grid gap-4 px-2 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:px-3 sm:py-7">
                <div className="flex min-w-0 gap-4 sm:gap-5">
                  <span className="mt-1 font-forum text-[16px] text-[#9F6920]/38">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-forum text-[24px] leading-tight transition-colors group-hover:text-[#9F6920] sm:text-[27px]">{name}</h3>
                    {description && <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#462506]/62 sm:text-[15px]">{description}</p>}
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#462506]/45">{duration} minutes</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 pl-9 sm:justify-end sm:pl-0">
                  <span className="font-forum text-[24px] text-[#9F6920] sm:min-w-[120px] sm:text-right sm:text-[27px]">{formatPrice(price, mode)}</span>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={`Book ${name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#9F6920]/22 text-[#9F6920] transition-all duration-300 hover:border-[#462506] hover:bg-[#462506] hover:text-[#F1DEA8]">
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-7 text-center text-[12px] leading-6 text-[#462506]/48">Prices and availability are subject to change. Final appointment details are confirmed through Nailzy.</p>
      </div>
    </section>
  );
}
