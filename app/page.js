import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: { absolute: "Candice Lash & Brows | Lash Extensions in Alexandria, VA" },
  description: "Luxury lash extensions, lash refills, brow services, lash lifts, and permanent makeup by Candice Beauty Studio in Alexandria, Virginia.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Candice Lash & Brows | Lash Extensions in Alexandria, VA",
    description: "Luxury lash extensions, lash refills, brow services, lash lifts, and permanent makeup in Alexandria, Virginia.",
    url: "/",
    images: ["/opengraph-image.jpg"],
  },
};

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
