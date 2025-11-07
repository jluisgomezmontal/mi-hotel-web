"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  
  // Si estamos en español, cambiar a inglés. Si estamos en inglés, cambiar a español
  const newLocale = locale === "es" ? "en" : "es";

  return (
    <Link href={pathname} locale={newLocale}>
      <Button
        variant="ghost"
        size="sm"
        className={cn("h-10 gap-2 px-4", className)}
        aria-label={t("label")}
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium uppercase">{newLocale}</span>
      </Button>
    </Link>
  );
}
