import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time: a signboard-style card using only verified content.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(to bottom, #0F2540, #1D4266 55%, #E8906A 90%, #FFC97D)",
          padding: "64px 72px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#FFC857",
            color: "#0B1A36",
            border: "4px solid #0B1A36",
            fontSize: 34,
            letterSpacing: 6,
            padding: "14px 28px",
          }}
        >
          {`${siteConfig.name.toUpperCase()} JUNCTION`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, color: "#FFF3DC" }}>{siteConfig.name}</div>
          <div style={{ display: "flex", fontSize: 38, color: "#C9D6EC", marginTop: 12 }}>
            {`${siteConfig.role} · ${siteConfig.institutionShort}`}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#0B1A36", paddingBottom: 28 }}
          >
            <span>Yatra — an engineering journey</span>
            <span>{siteConfig.city}, India</span>
          </div>
          <div style={{ display: "flex", height: 18, background: "#0B1A36" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
