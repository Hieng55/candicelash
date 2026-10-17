import Reviews from "@/components/Reviews";
import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "Client Reviews | Candice Lash & Brow",
  description: "Read what clients say about their experience at Candice Beauty Studio.",
};

export default function ReviewsPage() {
  return (
    <SectionPage>
      <Reviews />
    </SectionPage>
  );
}
