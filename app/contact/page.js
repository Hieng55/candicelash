import Contact from "@/components/Contact";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "Contact & Visit | Candice Lash & Brow",
  description: "Contact Candice Beauty Studio, view studio hours, and get directions to our Alexandria location.",
};

export default function ContactPage() {
  return (
    <SectionPage>
      <Contact />
    </SectionPage>
  );
}
