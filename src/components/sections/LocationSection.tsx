"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export function LocationSection() {
  const t = useTranslations("location");

  return (
    <section id="location" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-heading mb-6">{t("heading")}</h2>
          <p className="text-lg text-muted-foreground">{t("description")}</p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[16/12] w-full">
                  <iframe
                    src={t("mapEmbed")}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel location map"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Dirección</h3>
                    <p className="text-muted-foreground">{t("address")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              variant="default"
              className="w-full sm:w-auto"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=Acapulco+Guerrero",
                  "_blank"
                )
              }
            >
              <Navigation className="mr-2 h-5 w-5" />
              {t("mapCta")}
            </Button>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">5 min</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Playa La Condesa
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">15 min</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aeropuerto Internacional
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
