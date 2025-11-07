"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("navigation");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#rooms", label: t("rooms") },
    { href: "#services", label: t("services") },
    { href: "#reviews", label: t("reviews") },
    { href: "#gallery", label: t("gallery") },
    { href: "#location", label: t("location") },
    { href: "#contact", label: t("contact") },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "glass-card border-b text-foreground backdrop-blur-xl"
          : "bg-transparent text-white"
      )}
      suppressHydrationWarning
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-xl font-bold">M</span>
            </div>
            <span
              className={cn(
                "hidden font-display text-xl font-semibold sm:block",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Mi Hotel Acapulco
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-foreground hover:bg-accent hover:text-accent-foreground"
                    : "text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher
              className={cn(
                isScrolled
                  ? "text-foreground hover:bg-foreground/10"
                  : "text-white hover:bg-white/10"
              )}
            />
            <ThemeToggle
              className={cn(
                isScrolled
                  ? "text-foreground hover:bg-foreground/10"
                  : "text-white hover:bg-white/10"
              )}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="glass-card border-t md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
