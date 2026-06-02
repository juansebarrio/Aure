import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Imagen Open Graph generada (1200x630), on-brand.
// TODO(assets): refinar con la fuente IBM Plex Sans y/o el asset definitivo.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#1E2A47",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span style={{ fontSize: 120, fontWeight: 500, letterSpacing: "-0.02em" }}>
            aure
          </span>
          <span style={{ fontSize: 120, fontWeight: 500, color: "#C6A86B" }}>.</span>
        </div>
        <div style={{ width: 96, height: 4, backgroundColor: "#C6A86B", marginTop: 40 }} />
        <span style={{ fontSize: 40, color: "#AFC0D9", marginTop: 40 }}>
          {siteConfig.tagline}
        </span>
      </div>
    ),
    { ...size },
  );
}
