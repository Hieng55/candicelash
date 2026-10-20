import Contact from "@/components/Contact";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "Contact & Visit",
  description: "Contact Candice Beauty Studio, view studio hours, and get directions to the Alexandria location.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact & Visit",
    description: "Contact Candice Beauty Studio, view studio hours, and get directions to the Alexandria location.",
    url: "/contact/",
    images: ["/opengraph-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <SectionPage title="Contact Candice Lash and Brows">
      <Contact />
    </SectionPage>
  );
}
