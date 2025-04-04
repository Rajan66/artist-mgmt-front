import type { Metadata } from "next";
import { Raleway } from "next/font/google";

import { ToastContainer } from "react-toastify";

import ThemeProvider from "@/components/theme-provider";
import QueryProvider from "@/lib/tanstack-query/query-provider";

import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VoxCloud",
  description: "VoxCloud, an Artist Management System powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable} antialiased`}>
        <QueryProvider>
          <ThemeProvider
            defaultTheme="system"
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <ToastContainer />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
