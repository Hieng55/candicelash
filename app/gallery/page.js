import Gallery from "@/components/Gallery";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "Gallery | Candice Lash & Brow",
  description: "Explore recent lash and brow artistry from Candice Beauty Studio.",
};

export default function GalleryPage() {
  return (
    <SectionPage>
      <Gallery />
    </SectionPage>
  );
}
