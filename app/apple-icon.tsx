import { ImageResponse } from "next/og";

// Apple touch icon generado (180x180), on-brand: isotipo "a." sobre azul.
// TODO(assets): reemplazar por el set de favicons oficial del cliente (spec §5).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1E2A47",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              fontSize: 104,
              fontWeight: 500,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            a
          </span>
          <span style={{ fontSize: 104, fontWeight: 500, color: "#C6A86B" }}>.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
