import Image from "next/image";
import ServiceMenu from "@/components/ServiceMenu";
import Footer from "@/components/Footer";
import heroImage from "@/images/services/lash service.jpg";

export const metadata = {
  title: "Services & Pricing | Candice Lash & Brow",
  description: "Explore lash, brow, and permanent makeup services and pricing at Candice Beauty Studio in Alexandria, Virginia.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F7EED7] pb-[92px] lg:pb-0">
      <section className="relative min-h-[560px] overflow-hidden bg-[#351A07] text-[#F7EED7] sm:min-h-[620px]">
        <Image src={heroImage} alt="Lash artistry at Candice Beauty Studio" fill priority sizes="100vw" className="object-cover object-center opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,13,2,0.96)_0%,rgba(53,26,7,0.76)_48%,rgba(32,13,2,0.4)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#351A07]/75 via-transparent to-[#351A07]/35" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1240px] items-center px-5 pb-20 pt-[84px] sm:min-h-[620px] sm:px-8 lg:px-10 lg:pt-[118px]">
          <div className="max-w-[720px]">
            <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DAA755]">
              <span className="service-ornament-line" aria-hidden="true" />
              Services & pricing
            </div>
            <h1 className="mt-7 font-forum text-[52px] leading-[0.92] sm:text-[72px] lg:text-[86px]">
              Your look,
              <span className="mt-2 block italic text-[#E9C579]">beautifully considered.</span>
            </h1>
            <p className="mt-7 max-w-[560px] text-[15px] leading-7 text-white/68 sm:text-[16px]">
              Explore personalized lash, brow, and permanent makeup treatments designed to feel distinctly yours.
            </p>
          </div>
        </div>
      </section>

      <ServiceMenu />
      <Footer />
    </main>
  );
}
