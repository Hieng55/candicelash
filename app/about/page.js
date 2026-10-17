import AboutUs from "@/components/AboutUs";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "About Candice",
  description: "Meet Candice and discover the personalized artistry behind Candice Beauty Studio in Alexandria, Virginia.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Candice",
    description: "Meet Candice and discover the personalized artistry behind Candice Beauty Studio in Alexandria, Virginia.",
    url: "/about/",
    images: ["/opengraph-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <SectionPage title="About Candice Beauty Studio">
      <AboutUs />
    </SectionPage>
  );
}
