import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import "../globals.css";
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

const BASE_URL = "https://mihotelacapulco.com";

type LocaleMetadata = {
  titleDefault: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    locale: string;
  };
  twitter: {
    title: string;
    description: string;
  };
  canonical: string;
};

const localeMetadata: Record<Locale, LocaleMetadata> = {
  es: {
    titleDefault: "Hoteles en San Marcos Guerrero y Acapulco | Mi Hotel",
    description:
      "Descubre Mi Hotel, tu refugio boutique frente al mar en Acapulco con escapadas exclusivas hacia San Marcos, Guerrero.",
    keywords: [
      "hoteles en san marcos",
      "hoteles en san marcos guerrero",
      "hoteles en acapulco",
      "hotel boutique en san marcos",
      "hotel frente al mar acapulco",
    ],
    openGraph: {
      title: "Hoteles en San Marcos Guerrero y Acapulco — Mi Hotel",
      description:
        "Hospédate en suites de lujo, vive experiencias gastronómicas y disfruta del Pacífico desde San Marcos y Acapulco.",
      locale: "es_MX",
    },
    twitter: {
      title: "Hoteles en San Marcos y Acapulco | Mi Hotel",
      description:
        "Reserva con nuestro concierge y experimenta el lujo costero entre San Marcos Guerrero y la bahía de Acapulco.",
    },
    canonical: `${BASE_URL}/es`,
  },
  en: {
    titleDefault: "Hotels in San Marcos Guerrero and Acapulco | Mi Hotel",
    description:
      "Experience Mi Hotel, a boutique beachfront escape in Acapulco with curated getaways near San Marcos, Guerrero.",
    keywords: [
      "hotels in san marcos",
      "hotels in san marcos guerrero",
      "hotels in acapulco",
      "boutique hotel san marcos",
      "beachfront hotel acapulco",
    ],
    openGraph: {
      title: "Hotels in San Marcos Guerrero and Acapulco — Mi Hotel",
      description:
        "Stay in luxury suites, savor gourmet dining, and enjoy the Pacific coastline between San Marcos and Acapulco.",
      locale: "en_US",
    },
    twitter: {
      title: "Hotels in San Marcos and Acapulco | Mi Hotel",
      description:
        "Book with our concierge and enjoy coastal luxury spanning San Marcos Guerrero and Acapulco Bay.",
    },
    canonical: `${BASE_URL}/en`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale: localeParam } = params;
  const locale = locales.includes(localeParam as Locale)
    ? (localeParam as Locale)
    : defaultLocale;

  const meta = localeMetadata[locale];

  return {
    title: {
      default: meta.titleDefault,
      template: `%s | Mi Hotel`,
    },
    description: meta.description,
    keywords: meta.keywords,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: BASE_URL,
      siteName: "Mi Hotel",
      images: [
        {
          url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: "Mi Hotel oceanfront suites",
        },
      ],
      locale: meta.openGraph.locale,
      type: "website",
    },
    alternates: {
      canonical: meta.canonical,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitter.title,
      description: meta.twitter.description,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  };
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
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
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
