import { ImageResponse } from "next/og";

// Apple touch icon generado (180x180): isotipo AURE sobre azul. Placeholder
// hasta tener el PNG oficial del cliente (aure-favicon-180.png → app/apple-icon.png).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Isotipo (geometría del manual) como SVG data URI: pala crema + círculo dorado.
const MARK =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 342'><circle cx='57' cy='285' r='57' fill='%23c0a872'/><path d='M130 0 L300 342 L185 342 L72 112 Z' fill='%23ebeae8'/></svg>";

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
          backgroundColor: "#212a45",
        }}
      >
        <img width="105" height="120" src={MARK} alt="AURE" />
      </div>
    ),
    { ...size },
  );
}
