"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "es" ? "en" : "es";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="h-10 gap-2 px-4"
      aria-label={t("label")}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium uppercase">{locale === "es" ? "EN" : "ES"}</span>
    </Button>
  );
}
