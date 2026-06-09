import { ImageResponse } from "next/og";

// Apple touch icon generado (180x180): isotipo AURE sobre azul (Aure_V1.pdf).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Isotipo como SVG (data URI): cuña blanca + círculo dorado.
const MARK =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='36' cy='70' r='14.5' fill='%23c0a872'/><polygon points='48,8 67,8 79,92 60,92' fill='%23ffffff'/></svg>";

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
        <img width="104" height="104" src={MARK} alt="AURE" />
      </div>
    ),
    { ...size },
  );
}
