import { Forum, Jost } from "next/font/google";
import Header from "@/components/Header";
import MobileDock from "@/components/MobileDock";
import "./globals.css";

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
  title: "Candice Lash & Brow",
  description: "Bespoke lash and brow artistry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${forum.variable}`}>
        <Header />
        {children}
        <MobileDock />
      </body>
    </html>
  );
}
