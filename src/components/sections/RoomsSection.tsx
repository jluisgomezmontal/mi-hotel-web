"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Users, Eye } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

interface Room {
  id: string;
  name: string;
  price: string;
  capacity: string;
  thumbnail: string;
  gallery: string[];
  highlights: string[];
  amenitiesList: string[];
}

export function RoomsSection() {
  const t = useTranslations("rooms");
  const rooms = t.raw("items") as Room[];

  return (
    <section id="rooms" className="py-24 sm:py-32">
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

        {/* Room Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden transition-all hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.thumbnail}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-2xl font-bold">{room.price}</p>
                        <p className="text-sm opacity-90">{t("pricePerNight")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {room.capacity}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {room.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" className="w-full group">
                        <Eye className="mr-2 h-4 w-4" />
                        {t("viewDetails")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-3xl">{room.name}</DialogTitle>
                        <DialogDescription className="flex items-center gap-4 pt-2 text-base">
                          <span className="text-2xl font-bold text-primary">
                            {room.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {room.capacity}
                          </span>
                        </DialogDescription>
                      </DialogHeader>

                      {/* Gallery */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        {room.gallery.map((image, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-video overflow-hidden rounded-lg"
                          >
                            <Image
                              src={image}
                              alt={`${room.name} view ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Amenities */}
                      <div className="space-y-4 pt-4">
                        <h4 className="text-lg font-semibold">{t("amenities")}</h4>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {room.amenitiesList.map((amenity, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                              <span>{amenity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        variant="accent"
                        size="lg"
                        className="mt-4 w-full"
                        onClick={() => {
                          const contactSection = document.querySelector("#contact");
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        {t("bookNow")}
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
