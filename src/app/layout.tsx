import "./globals.css";
import "../../node_modules/jbx/dist/main.css";
import type { Metadata } from "next";

const title = "Cohesive Colors";
const description = "Create more cohesive color palettes";
const canonical = "https://javier.xyz/cohesive-colors";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    images: "https://javier.xyz/cohesive-colors/opengraph.jpg",
    title: title,
    description: description,
    url: canonical,
  },
  alternates: {
    canonical: canonical,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
