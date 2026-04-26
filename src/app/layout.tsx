import type { Metadata } from "next";
import {
  Merriweather,
  Montserrat,
  Ubuntu_Mono,
} from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const fontSans = Montserrat({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const fontSerif = Merriweather({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
});

const fontMono = Ubuntu_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: ["400", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sal-lab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Software Architecture Lab",
    template: "%s · Software Architecture Lab",
  },
  description:
    "Laboratório visual e prático para aprender arquitetura de software, com trilhas, conceitos, exemplos e estudos de caso.",
  applicationName: "Software Architecture Lab",
  keywords: [
    "arquitetura de software",
    "clean architecture",
    "design patterns",
    "frontend",
    "backend",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Software Architecture Lab",
    description:
      "Aprenda arquitetura de software de forma visual, progressiva e prática.",
    url: siteUrl,
    siteName: "Software Architecture Lab",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Architecture Lab",
    description:
      "Aprenda arquitetura de software de forma visual, progressiva e prática.",
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
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const storedTheme = localStorage.getItem("theme");
              const theme = storedTheme === "light" || storedTheme === "dark"
                ? storedTheme
                : window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light";
              document.documentElement.classList.toggle("dark", theme === "dark");
            })();`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
