import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteConfig } from "@/lib/site";

// Imagen Open Graph generada (1200x630): imagotipo oficial (Aure_V1.pdf) + tagline.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagotipo negativo oficial (PNG) embebido como data URI para Satori.
const logo = readFileSync(
  join(process.cwd(), "public/brand/aure-imagotipo-negativo.png"),
);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
        }}
      >
        <img width="600" height="220" src={logoSrc} alt="" />
        <span style={{ fontSize: 38, color: "#b3bacc", marginTop: 48 }}>
          {siteConfig.tagline}
        </span>
      </div>
    ),
    { ...size },
  );
}
