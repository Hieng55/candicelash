import Gallery from "@/components/Gallery";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "Lash & Brow Gallery",
  description: "Explore recent lash extension, brow, and beauty artistry from Candice Beauty Studio in Alexandria, Virginia.",
  alternates: { canonical: "/gallery/" },
  openGraph: {
    title: "Lash & Brow Gallery",
    description: "Explore recent lash extension, brow, and beauty artistry from Candice Beauty Studio in Alexandria, Virginia.",
    url: "/gallery/",
    images: ["/opengraph-image.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <SectionPage title="Lash and Brow Gallery">
      <Gallery />
    </SectionPage>
  );
}
