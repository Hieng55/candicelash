import Footer from "@/components/Footer";

export default function SectionPage({ children, title }) {
  return (
    <main className="min-h-screen bg-[#F7EED7] pb-[92px] lg:pb-0">
      <h1 className="sr-only">{title}</h1>
      <div className="h-[84px] bg-[#351A07] lg:h-[118px]" aria-hidden="true" />
      {children}
      <Footer />
    </main>
  );
}
