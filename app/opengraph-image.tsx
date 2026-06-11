import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteConfig } from "@/lib/site";

// Imagen Open Graph generada (1200x630): imagotipo oficial (Aure_V1.pdf) + tagline.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  // IMPORTANTE: el readFileSync va DENTRO de la función, no a nivel de módulo.
  // A nivel de módulo corría al importar el módulo durante la resolución de
  // metadata en runtime (p. ej. en /propiedades, que es dinámica); en el
  // serverless de Vercel `public/` no está en el bundle de la función y el
  // readFileSync tiraba ENOENT → "Server Components render error". Acá solo corre
  // cuando se genera la imagen (en build), y con try/catch degrada sin romper.
  let logoSrc = "";
  try {
    const logo = readFileSync(
      join(process.cwd(), "public/brand/aure-imagotipo-negativo.png"),
    );
    logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  } catch {
    logoSrc = "";
  }

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
        {logoSrc ? (
          <img width="600" height="220" src={logoSrc} alt="" />
        ) : null}
        <span style={{ fontSize: 38, color: "#b3bacc", marginTop: 48 }}>
          {siteConfig.tagline}
        </span>
      </div>
    ),
    { ...size },
  );
}
