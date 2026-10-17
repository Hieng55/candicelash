import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#462506] pb-[92px] lg:pb-0">
      <Hero />
      <AboutUs />
      <Services />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
