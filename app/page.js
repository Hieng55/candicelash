import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#462506]">
      <Header />
      <Hero />
      <AboutUs />
      <Services />
    </main>
  );
}
