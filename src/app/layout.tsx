import type { Metadata } from "next";
import {
  Antonio,
  Montserrat,
  Ubuntu_Mono,
} from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

import "./globals.css";

const fontSans = Montserrat({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const fontDisplay = Antonio({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-antonio",
});

const fontMono = Ubuntu_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Aprenda arquitetura de software de forma visual e prática`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
    site: "@SoftArchLab",
    creator: "@SoftArchLab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background antialiased">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`(()=>{try{var t=localStorage.getItem("theme");var d=t==="light"?"light":"dark";document.documentElement.classList.toggle("dark",d==="dark")}catch(e){document.documentElement.classList.add("dark")}})();`}</Script>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
