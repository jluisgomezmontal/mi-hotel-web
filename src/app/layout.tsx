import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { locales, defaultLocale, type Locale } from "@/i18n/locales";

const sans = Geist({
  variable: "--font-sans-base",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Mi Hotel Acapulco",
    template: "%s | Mi Hotel Acapulco",
  },
  description: "Live an unforgettable beachside stay in Acapulco.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mi Hotel Acapulco — Beachfront Luxury",
    description: "Discover suites, amenities, and experiences curated for your perfect seaside getaway in Acapulco.",
    url: "https://mihotelacapulco.com",
    siteName: "Mi Hotel Acapulco",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mi Hotel Acapulco oceanfront suites",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  alternates: {
    canonical: "https://mihotelacapulco.com",
    languages: {
      es: "https://mihotelacapulco.com/es",
      en: "https://mihotelacapulco.com/en",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Hotel Acapulco",
    description: "Luxury beachfront hotel with suites, spa, and gourmet dining.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  const locale = locales.includes(localeParam as Locale)
    ? (localeParam as Locale)
    : defaultLocale;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
