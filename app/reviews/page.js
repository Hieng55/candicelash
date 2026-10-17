import Reviews from "@/components/Reviews";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "Client Reviews",
  description: "Read client reviews for lash extensions, brow services, and permanent makeup at Candice Beauty Studio in Alexandria, Virginia.",
  alternates: { canonical: "/reviews/" },
  openGraph: {
    title: "Client Reviews",
    description: "Read client reviews for lash extensions, brow services, and permanent makeup at Candice Beauty Studio in Alexandria, Virginia.",
    url: "/reviews/",
    images: ["/opengraph-image.jpg"],
  },
};

export default function ReviewsPage() {
  return (
    <SectionPage title="Candice Lash and Brows Client Reviews">
      <Reviews />
    </SectionPage>
  );
}
