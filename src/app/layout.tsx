import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Bhoye Visuals",
    template: "%s | Bhoye Visuals",
  },
  description: "Cinematic storytelling through visual direction and film.",
  keywords: [
    "Bhoye Visuals",
    "cinematic video",
    "videography",
    "film maker",
    "creative visuals",
    "Chicago",
    "wedding video",
    "event shoot",
  ],
  authors: [{ name: "Bhoye.mov", url: "https://bhoyevisuals.vercel.app" }],
  metadataBase: new URL("https://bhoyevisuals.vercel.app"),
  openGraph: {
    title: "Bhoye Visuals",
    description: "Cinematic storytelling through visual direction and film.",
    url: "https://bhoyevisuals.vercel.app",
    siteName: "Bhoye Visuals",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bhoye Visuals Open Graph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhoye Visuals",
    description: "Cinematic storytelling through visual direction and film.",
    images: ["/og-image.png"],
    creator: "@bhoyevisuals",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-background text-foreground">
          {/* Global Navbar */}
          <Navbar />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1f1f1f",
                color: "#fff",
                border: "1px solid #333",
              },
            }}
          />

          {/* Page Content */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
