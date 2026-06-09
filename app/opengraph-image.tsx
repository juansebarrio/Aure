import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Imagen Open Graph generada (1200x630), on-brand (Aure_V1.pdf).
// TODO(assets): refinar con la fuente IBM Plex Sans y/o el asset definitivo.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Isotipo (cuña cálida + círculo dorado) como SVG data URI.
const MARK =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='36' cy='70' r='14.5' fill='%23c0a872'/><polygon points='48,8 67,8 79,92 60,92' fill='%23ebeae8'/></svg>";

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
          backgroundColor: "#212a45",
          color: "#ffffff",
        }}
      >
        <img width="116" height="116" src={MARK} alt="" />
        <div style={{ display: "flex", alignItems: "flex-end", marginTop: 28 }}>
          <span style={{ fontSize: 120, fontWeight: 600, letterSpacing: "-0.02em" }}>
            aure.
          </span>
        </div>
        <div style={{ width: 96, height: 4, backgroundColor: "#c0a872", marginTop: 36 }} />
        <span style={{ fontSize: 40, color: "#b3bacc", marginTop: 36 }}>
          {siteConfig.tagline}
        </span>
      </div>
    ),
    { ...size },
  );
}
