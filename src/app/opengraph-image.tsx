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
          background: "#F3EBDA",
          padding: "64px 72px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#A3281E",
            color: "#FFF8EC",
            border: "4px solid #A8812F",
            fontSize: 34,
            letterSpacing: 6,
            padding: "14px 28px",
          }}
        >
          {`${siteConfig.name.toUpperCase()} JUNCTION`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, color: "#1E1B18" }}>{siteConfig.name}</div>
          <div style={{ display: "flex", fontSize: 38, color: "#5A5248", marginTop: 12 }}>
            {`${siteConfig.role} · ${siteConfig.institutionShort}`}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#1F4D3A", paddingBottom: 28 }}
          >
            <span>Yatra — an engineering journey</span>
            <span>{siteConfig.city}, India</span>
          </div>
          <div style={{ display: "flex", height: 18, background: "#E7A622" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
