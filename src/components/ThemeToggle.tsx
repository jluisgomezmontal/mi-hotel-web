"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("themeToggle");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = React.useMemo(() => {
    if (!mounted) {
      return "light";
    }
    if (theme === "system") {
      return resolvedTheme ?? "light";
    }
    return theme ?? "light";
  }, [mounted, theme, resolvedTheme]);

  const isLight = currentTheme === "light";
  const label = isLight ? t("dark") : t("light");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={cn("h-10 w-10", className)}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          className={`h-5 w-5 transition-all duration-200 ${
            isLight ? "opacity-100 scale-100" : "absolute opacity-0 scale-75"
          }`}
        />
        <Moon
          className={`h-5 w-5 transition-all duration-200 ${
            isLight ? "absolute opacity-0 scale-75" : "opacity-100 scale-100"
          }`}
        />
      </span>
    </Button>
  );
}
