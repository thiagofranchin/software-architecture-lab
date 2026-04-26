import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Software Architecture Lab — Aprenda arquitetura de software de forma visual e prática";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "#0f0d0c",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, #d9714944 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, #c9972a33 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Header: icon + label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "#d97149",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
              <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
              <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#d97149",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Laboratório Visual e Aplicado
          </span>
        </div>

        {/* Main title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
            <span style={{ fontSize: 88, fontWeight: 900, color: "#d97149", lineHeight: 1 }}>
              Software
            </span>
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
            <span style={{ fontSize: 88, fontWeight: 900, color: "#f5f0ec", lineHeight: 1 }}>
              Architecture
            </span>
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
            <span style={{ fontSize: 88, fontWeight: 900, color: "#c9972a", lineHeight: 1 }}>
              Lab
            </span>
          </div>
        </div>

        {/* Footer: tagline + pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
          <p style={{ fontSize: 22, color: "#a89888", margin: 0, lineHeight: 1.5 }}>
            Aprenda arquitetura de software de forma visual, progressiva e aplicável ao mundo real.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["Trilhas", "Conceitos", "Design Patterns", "Frontend · Backend"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "8px 18px",
                  background: "#1e1a18",
                  border: "1px solid #2e2824",
                  borderRadius: 999,
                  fontSize: 15,
                  color: "#c4b5a8",
                  fontWeight: 500,
                  display: "flex",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
