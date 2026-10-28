"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ombreImage from "@/images/services/ombre.png";
import nanoHairstrokeOmbreImage from "@/images/services/nanohairstoke & ombre.png";
import lashLiftTintImage from "@/images/services/menu/lasher.png";
import PMUIntakeForm from "@/components/PMUIntakeForm";

const bookingUrl = "https://www.nailzy.com/book/candicelashandbrows";

const categories = [
  {
    name: "Permanent Makeup",
    slug: "permanent-makeup",
    eyebrow: "Long-lasting brow artistry",
    services: [
      ["Consultation", 0, 5, null, "Not sure which brow style is right for you? Schedule a virtual consultation or send me a clear photo of your brows and face. I’ll review your features, discuss your desired look, and recommend the best brow shape and style for you."],
      ["Nano Hairstroke Brows", 750, 180, null, "A semi-permanent brow technique that creates fine, realistic hair-like strokes to mimic natural brow hairs. Each stroke follows the natural direction and shape of your brows for a soft, defined result."],
      ["Ombré Brows / Shading Brows", 550, 180, null, "A semi-permanent technique that creates soft, powdery brows with a smooth gradient effect. It gives the appearance of filled-in brows while remaining natural and elegant, and is suitable for all skin types, including oily skin.", ombreImage],
      ["Nano Hairstroke & Ombré Combo", 349, 180, null, "A signature combination of delicate nano hairstrokes and soft ombré shading for natural-looking texture, enhanced definition, and beautifully dimensional brows.", nanoHairstrokeOmbreImage],
      ["Combo Brows · Hairstroke & Shading", 650, 180, null, "A combination of realistic hairstrokes and ombré shading for natural, defined, and long-lasting brows. This method blends individual strokes with added depth and dimension for a beautifully full result."],
      ["6–8 Week Touch-up", 150, 60, null, "A follow-up appointment recommended 6–8 weeks after the initial session to perfect the shape, color, and healed results."],
      ["Semi-annual Touch-up", 200, 60, null, "A maintenance appointment recommended approximately every 6 months to refresh color, definition, and the overall appearance of your brows as the pigment gradually fades over time."],
      ["Yearly Touch-up", 250, 60, null, "A maintenance appointment recommended approximately 12–20 months after your initial service to refresh faded pigment, restore definition, and maintain the overall appearance of your brows."],
    ],
  },
  {
    name: "Lash Extension",
    slug: "lash-extension",
    eyebrow: "Full sets & finishing touches",
    services: [
      ["Classic Full Set", 149, 90, null, "A natural, clean, and elegant look. Each natural lash is enhanced with one extension to add length, definition, and soft fullness while keeping the lashes lightweight and comfortable—perfect for a polished “your lashes but better” look."],
      ["Hybrid Full Set", 179, 90, null, "The perfect balance between natural and full. Classic extensions and lightweight volume fans create added texture, dimension, and soft fullness while remaining elegant and effortless."],
      ["Wet Look Full Set", 169, 90, null, "A sleek, glossy, and defined style that resembles freshly coated lashes. Lightweight closed fans create a dark, wispy, mascara-like finish without the heaviness of a full-volume set."],
      ["Volume Full Set", 199, 120, null, "A fuller, softer, and more dramatic look created with lightweight volume fans. This set adds density, depth, and fluffy fullness while remaining lightweight and comfortable."],
      ["Anime / Medusa Full Set", 179, 120, "from", "A bold, dramatic style inspired by anime lashes, with strategically placed spikes and wispy texture for a unique effect. Designed to create larger-looking, lifted, doll-like eyes with a sharp yet feminine finish."],
      ["Lash Removal without New Set", 30, 30, null, "Gentle, professional removal of lash extensions while protecting your natural lashes."],
      ["Lash Removal + New Set", 15, 30, null, "Removal of existing lash extensions followed by a fresh full set."],
      ["Add-on Wispy", 15, 15, null, "Add soft, textured wispy spikes for extra texture and a little more drama to your set."],
    ],
  },
  {
    name: "Lash Refill",
    slug: "lash-refill",
    eyebrow: "Maintain your signature set",
    services: [
      ["Classic Refill · 2 Weeks", 75, 60, null, "For clients returning within 2 weeks. This service fills in grown-out and shed lashes to refresh your set and maintain a full, natural-looking appearance."],
      ["Classic Refill · 3 Weeks", 95, 60, null, "Recommended for clients returning within 3 weeks. This service refreshes your existing Classic set by replacing grown-out and shed extensions for a clean, natural look."],
      ["Hybrid Refill · 2 Weeks", 90, 60, null, "Recommended for clients returning within 2 weeks. This service replaces grown-out and shed extensions while restoring fullness and maintaining a soft, textured look."],
      ["Hybrid Refill · 3 Weeks", 110, 75, null, "Recommended within 15–21 days of your previous appointment. This maintenance service restores fullness and keeps your Hybrid set soft and textured."],
      ["Wet Look Refill · 2 Weeks", 85, 60, null, "Recommended within 8–14 days of your previous appointment. This service replaces grown-out and shed extensions while maintaining the signature sleek, defined appearance."],
      ["Wet Look Refill · 3 Weeks", 105, 60, null, "Recommended within 15–21 days of your previous appointment. This service restores fullness and maintains the signature sleek, defined appearance."],
      ["Volume Refill · 2 Weeks", 100, 75, null, "Recommended within 8–14 days of your previous appointment. This service restores fullness and maintains a soft, full, and fluffy look."],
      ["Volume Refill · 3 Weeks", 130, 90, null, "Recommended within 15–21 days of your previous appointment. This service restores fullness and maintains a soft, full, and fluffy look."],
      ["Anime Lash Refill", 120, 90, "from", "A refill for your Anime set, replacing grown-out and shed extensions while maintaining the signature spiky, wispy look. Perfect for keeping your lashes full, clean, and defined."],
    ],
  },
  {
    name: "Brows Service",
    slug: "brows-service",
    eyebrow: "Shape, lift & definition",
    services: [
      ["Brow Wax", 15, 15, null, "Professional brow waxing to remove unwanted hair and clean up the brows, leaving them neat, smooth, and defined."],
      ["Brow Wax & Shaping", 30, 30, null, "Detailed brow mapping creates a balanced, customized shape based on your natural features, followed by professional waxing to remove unwanted hair and define the brows."],
      ["Brow Lamination & Shaping", 90, 60, null, "A brow styling treatment using premium-quality products to smooth and lift the natural brow hairs, creating a fuller, more defined, and polished look while enhancing your natural brow shape."],
      ["Brow Lamination & Tint", 115, 60, null, "A brow styling treatment using premium-quality products to smooth, lift, and shape the natural brow hairs, combined with a custom tint to enhance color, definition, and fullness. Includes brow mapping and wax clean-up."],
      ["Brow Tint & Shaping", 45, 30, null, "A custom brow tint paired with professional brow mapping and shaping to enhance your natural brow color, definition, and overall shape. Includes brow mapping and wax clean-up."],
    ],
  },
  {
    name: "Lash Services",
    slug: "lash-services",
    eyebrow: "Natural lash treatments",
    services: [
      ["Lash Lift", 95, 60],
      ["Lash Lift and Tint", 105, 60, null, null, lashLiftTintImage],
      ["Lash Tint · Lower Lashes", 20, 20],
    ],
  },
];

const formatPrice = (price, mode) => {
  if (mode === "from") return `From $${price}`;
  return `$${price.toFixed(2)}`;
};

export default function ServiceMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
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

  useEffect(() => {
    if (!previewImage) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setPreviewImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [previewImage]);

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
            {category.services.map(([name, price, duration, mode, description, image], index) => (
              <article key={name} className="group grid gap-4 px-2 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:px-3 sm:py-7">
                <div className="flex min-w-0 gap-4 sm:gap-5">
                  <span className="mt-1 font-forum text-[16px] text-[#9F6920]/38">{String(index + 1).padStart(2, "0")}</span>
                  <div className={`min-w-0 flex-1 ${image ? "grid gap-5 sm:grid-cols-[132px_1fr] sm:items-center" : ""}`}>
                    {image && (
                      <button type="button" onClick={() => setPreviewImage({ src: image, name })} aria-label={`View larger ${name} result`} className="relative aspect-square w-full max-w-[260px] cursor-zoom-in overflow-hidden rounded-[18px] border border-[#9F6920]/15 bg-[#EFE1C8] shadow-[0_14px_34px_rgba(70,37,6,0.12)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(70,37,6,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9F6920] sm:max-w-none">
                        <Image src={image} alt={`${name} result`} fill sizes="(max-width: 639px) 260px, 132px" className="object-cover" />
                      </button>
                    )}
                    <div>
                      <h3 className="font-forum text-[24px] leading-tight transition-colors group-hover:text-[#9F6920] sm:text-[27px]">{name}</h3>
                      {description && <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#462506]/62 sm:text-[15px]">{description}</p>}
                      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#462506]/45">{duration} minutes</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 pl-9 sm:justify-end sm:pl-0">
                  <span className="font-forum text-[24px] text-[#9F6920] sm:min-w-[120px] sm:text-right sm:text-[27px]">{formatPrice(price, mode)}</span>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={`Book ${name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#9F6920]/22 text-[#9F6920] transition-all duration-300 hover:border-[#462506] hover:bg-[#462506] hover:text-[#F1DEA8]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 16 16 8M10 8h6v6" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-7 text-center text-[12px] leading-6 text-[#462506]/48">Prices and availability are subject to change. Final appointment details are confirmed through Nailzy.</p>
      </div>

      {category.slug === "permanent-makeup" && (
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <PMUIntakeForm />
        </div>
      )}

      {previewImage && (
        <div role="dialog" aria-modal="true" aria-label={`${previewImage.name} result preview`} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#160B03]/90 p-4 backdrop-blur-sm sm:p-8" onClick={() => setPreviewImage(null)}>
          <div className="relative h-full w-full max-w-[820px]" onClick={(event) => event.stopPropagation()}>
            <Image src={previewImage.src} alt={`${previewImage.name} result`} fill priority sizes="(max-width: 860px) 100vw, 820px" className="object-contain" />
            <button type="button" onClick={() => setPreviewImage(null)} aria-label="Close image preview" autoFocus className="absolute right-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#462506]/85 text-white shadow-lg transition hover:rotate-90 hover:bg-[#9F6920] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-2 sm:top-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
