import { Forum, Jost } from "next/font/google";
import Header from "@/components/Header";
import MobileDock from "@/components/MobileDock";
import "./globals.css";

const siteUrl = "https://candicelashandbrows.com";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${siteUrl}/#business`,
  name: "Candice Lash & Brows",
  alternateName: "Candice Beauty Studio",
  description: "Luxury lash extensions, lash refills, brow services, lash lifts, and permanent makeup in Alexandria, Virginia.",
  url: siteUrl,
  telephone: "+14026863390",
  image: `${siteUrl}/opengraph-image.jpg`,
  logo: `${siteUrl}/icon.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2465 Mandeville Lane, Unit 240, Suite 31",
    addressLocality: "Alexandria",
    addressRegion: "VA",
    postalCode: "22314",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.8031317,
    longitude: -77.0713591,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:30",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/candice.beautystudio",
    "https://www.facebook.com/candicebeautystudioo/",
    "https://maps.google.com/?cid=791661076391546862",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Beauty Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Lash Extensions" },
      { "@type": "OfferCatalog", name: "Lash Refills" },
      { "@type": "OfferCatalog", name: "Brow Services" },
      { "@type": "OfferCatalog", name: "Lash Services" },
      { "@type": "OfferCatalog", name: "Permanent Makeup" },
    ],
  },
};

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-forum",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Candice Lash & Brows | Alexandria, VA",
    template: "%s | Candice Lash & Brows",
  },
  description: "Luxury lash extensions, brow artistry, lash lifts, and permanent makeup personalized for you in Alexandria, Virginia.",
  applicationName: "Candice Lash & Brows",
  keywords: ["lash extensions Alexandria VA", "brow services Alexandria VA", "lash lift Alexandria", "permanent makeup Alexandria", "Candice Lash and Brows"],
  authors: [{ name: "Candice Lash & Brows", url: siteUrl }],
  creator: "Candice Lash & Brows",
  publisher: "Candice Lash & Brows",
  category: "Beauty Salon",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Candice Lash & Brows",
    title: "Candice Lash & Brows | Alexandria, VA",
    description: "Luxury lash extensions, brow artistry, lash lifts, and permanent makeup personalized for you in Alexandria, Virginia.",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Candice Lash & Brows beauty artistry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candice Lash & Brows | Alexandria, VA",
    description: "Luxury lash, brow, and permanent makeup artistry in Alexandria, Virginia.",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${forum.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        {children}
        <MobileDock />
      </body>
    </html>
  );
}
