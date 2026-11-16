import BookingRedirect from "@/components/BookingRedirect";

export const metadata = {
  title: "Book an Appointment",
  description: "Book your lash, brow, or permanent makeup appointment with Candice Lash & Brows.",
  alternates: { canonical: "/booking/" },
  robots: { index: false, follow: true },
};

export default function BookingPage() {
  return <BookingRedirect />;
}
