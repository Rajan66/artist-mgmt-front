"use client";

import dynamic from "next/dynamic";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false, //for client-side rendering
  }
);

export default NextThemesProvider;
