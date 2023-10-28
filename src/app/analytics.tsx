"use client";
import { Suspense } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function Analytics() {
  return (
    <Suspense>
      {" "}
      <GoogleAnalytics trackPageViews />
    </Suspense>
  );
}
