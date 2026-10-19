import Policy from "@/components/Policy";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "Client Care",
  description: "Review permanent makeup pre-care and lash extension pre-care and aftercare instructions from Candice Lash & Brows in Alexandria, Virginia.",
  alternates: { canonical: "/policy/" },
  openGraph: {
    title: "Client Care",
    description: "Prepare for your PMU or lash appointment and protect your results with our care guidance.",
    url: "/policy/",
    images: ["/opengraph-image.jpg"],
  },
};

export default function PolicyPage() {
  return (
    <SectionPage title="Client Care">
      <Policy />
    </SectionPage>
  );
}
