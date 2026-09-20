import { ImageResponse } from "next/og";

export const alt = "Bryan Oyloe — Full-Stack and Forward Deployed Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f6f4ef",
        color: "#181a1b",
        padding: "64px 72px",
        borderTop: "18px solid #b43f18",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span style={{ fontWeight: 700 }}>BRYAN OYLOE</span>
        <span style={{ color: "#b43f18" }}>FULL-STACK · CUSTOMER SOLUTIONS</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
        <div style={{ fontSize: 76, lineHeight: 1.04, letterSpacing: "-3px" }}>
          I turn ambiguous workflows into reliable software.
        </div>
        <div style={{ fontSize: 27, color: "#555852", marginTop: 32 }}>
          Senior Full-Stack · Forward Deployed Engineering · Production Ownership
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#555852" }}>
        <span>bryanoyloe.com</span>
        <span>Rails · React · TypeScript · Python · SQL</span>
      </div>
    </div>,
    size,
  );
}
