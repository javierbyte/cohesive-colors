import "./globals.css";
import "jbx/main.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import GithubCorner from "../GithubCorner";

const title = "Cohesive Colors";
const description = "Create more cohesive color palettes";
const canonical = "https://javier.xyz/cohesive-colors";

export const metadata: Metadata = {
  metadataBase: new URL("https://javier.xyz"),
  title,
  description,
  openGraph: {
    images: "/cohesive-colors/opengraph.jpg",
    title,
    description,
    url: canonical,
    type: "website",
  },
  alternates: {
    canonical,
  },
  twitter: {
    card: "summary_large_image",
    images: "/cohesive-colors/opengraph.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GithubCorner />
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
