import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Yatra — ${siteConfig.name}`,
    short_name: "Yatra",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F3EBDA",
    theme_color: "#A3281E",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
