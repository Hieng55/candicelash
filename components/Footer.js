import Image from "next/image";
import candiceLogo from "@/images/logo.png";

const pageLinks = [
  ["Home", "/"],
  ["About us", "/about"],
  ["Services", "/services"],
  ["Client Care", "/policy"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
];

const socialLinks = [
  ["Instagram", "https://www.instagram.com/candice.beautystudio"],
  ["Facebook", "https://www.facebook.com/candicebeautystudioo/"],
  ["Google Maps", "https://maps.google.com/?cid=791661076391546862"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#291205] text-[#F7EED7]">
      <div className="pointer-events-none absolute -bottom-36 left-1/3 h-80 w-80 rounded-full bg-[#DAA755]/[0.07] blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_0.9fr_1.05fr] lg:gap-10">
          <div className="max-w-[340px]">
            <a href="/" className="relative block h-[76px] w-[210px]" aria-label="Candice Beauty Studio home">
              <Image src={candiceLogo} alt="Candice Beauty Studio" sizes="210px" className="brand-logo absolute left-1/2 top-1/2 h-auto w-[235px] max-w-none -translate-x-1/2 -translate-y-1/2" />
            </a>
            <p className="mt-5 text-[16px] leading-8 text-[#F7EED7]/64">
              Bespoke lash, brow, and permanent makeup artistry created with intention in Alexandria, Virginia.
            </p>
            <a href="https://www.nailzy.com/book/candicelashandbrows" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#E9C579] transition-all duration-300 hover:gap-4 hover:text-white">
              Reserve an appointment <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#DAA755]">Explore</p>
            <nav aria-label="Footer navigation" className="mt-6 grid gap-3">
              {pageLinks.map(([label, href]) => (
                <a key={label} href={href} className="w-fit font-forum text-[21px] text-[#F7EED7]/78 transition-colors hover:text-[#E9C579]">{label}</a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#DAA755]">Visit</p>
            <a href="https://maps.google.com/?cid=791661076391546862" target="_blank" rel="noopener noreferrer" className="mt-6 block font-forum text-[20px] leading-8 text-[#F7EED7]/78 transition-colors hover:text-[#E9C579]">
              2465 Mandeville Lane<br />Unit 240, Suite 31<br />Alexandria, VA 22314
            </a>
            <a href="tel:+14026863390" className="mt-5 inline-block font-forum text-[23px] text-[#E9C579] transition-colors hover:text-white">(402) 686-3390</a>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#DAA755]">Stay connected</p>
            <div className="mt-6 flex flex-col items-start gap-3">
              {socialLinks.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 font-forum text-[20px] text-[#F7EED7]/78 transition-colors hover:text-[#E9C579]">
                  <span className="h-px w-5 bg-[#DAA755]/45 transition-all duration-300 group-hover:w-7 group-hover:bg-[#DAA755]" aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-6 text-[14px] leading-7 text-[#F7EED7]/60">
              <p>Mon – Sat: 9:30 AM – 7 PM</p>
              <p>Sunday: 11:30 AM – 7 PM</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#F1DEA8]/48">© {new Date().getFullYear()} Candice Beauty Studio. All rights reserved.</p>
          <a href="#" className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E9C579]/80 transition-colors hover:text-[#E9C579]">
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E9C579]/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#E9C579]" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
