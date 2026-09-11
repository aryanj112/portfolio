"use client";

import { useState } from "react";

type PairKey = "royalty" | "firefighting" | "medicine";

const PLOT = {
  left: 66,
  right: 450,
  top: 30,
  bottom: 300,
};

const VECTOR_PAIRS: Record<
  PairKey,
  {
    label: string;
    left: { label: string; x: number; y: number };
    right: { label: string; x: number; y: number };
  }
> = {
  royalty: {
    label: "royalty",
    left: { label: "king", x: -0.58, y: 0.72 },
    right: { label: "queen", x: 0.58, y: 0.72 },
  },
  firefighting: {
    label: "firefighting",
    left: { label: "fireman", x: -0.78, y: 0.46 },
    right: { label: "firewoman", x: 0.78, y: 0.46 },
  },
  medicine: {
    label: "medicine",
    left: { label: "doctor", x: -0.36, y: 0.9 },
    right: { label: "nurse", x: 0.18, y: 0.82 },
  },
};

function toSvg(point: { x: number; y: number }) {
  const width = PLOT.right - PLOT.left;
  const height = PLOT.bottom - PLOT.top;

  return {
    x: PLOT.left + ((point.x + 1) / 2) * width,
    y: PLOT.bottom - point.y * height,
  };
}

export function WordVectorGraph() {
  const [selectedPair, setSelectedPair] = useState<PairKey>("royalty");
  const pair = VECTOR_PAIRS[selectedPair];
  const origin = toSvg({ x: 0, y: 0 });
  const left = toSvg(pair.left);
  const right = toSvg(pair.right);

  return (
    <div
      style={{
        alignItems: "start",
        display: "flex",
        flexWrap: "wrap",
        gap: "18px",
        margin: "22px auto 30px",
        maxWidth: "760px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          minWidth: "150px",
          order: 2,
        }}
        aria-label="Choose an occupation pair"
      >
        <strong style={{ fontSize: "0.95rem" }}>occupation</strong>
        {(Object.keys(VECTOR_PAIRS) as PairKey[]).map((key) => {
          const isSelected = selectedPair === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPair(key)}
              aria-pressed={isSelected}
              style={{
                border: "1px solid var(--rule)",
                borderRadius: "6px",
                background: isSelected ? "rgba(37, 31, 24, 0.9)" : "rgba(255, 251, 244, 0.82)",
                color: isSelected ? "rgba(255, 251, 244, 0.96)" : "inherit",
                cursor: "pointer",
                fontWeight: 700,
                textAlign: "left",
                padding: "8px 12px",
              }}
            >
              {VECTOR_PAIRS[key].label}
            </button>
          );
        })}
      </div>

      <svg
        viewBox="0 0 520 340"
        role="img"
        aria-label={`Toy word vector graph for ${pair.left.label} and ${pair.right.label}`}
        style={{
          flex: "1 1 520px",
          display: "block",
          width: "100%",
          maxWidth: "580px",
          height: "auto",
        }}
      >
        <defs>
          <marker id="word-vector-left-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M 0 0 L 8 3 L 0 6 L 2 3 z" fill="#3267d6" />
          </marker>
          <marker id="word-vector-right-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M 0 0 L 8 3 L 0 6 L 2 3 z" fill="#d63f5d" />
          </marker>
        </defs>

        <rect x="24" y="16" width="472" height="304" rx="12" fill="rgba(255, 251, 244, 0.68)" stroke="var(--rule)" />

        {[-1, -0.5, 0, 0.5, 1].map((tick) => {
          const x = toSvg({ x: tick, y: 0 }).x;
          return (
            <g key={`x-${tick}`}>
              <line x1={x} y1={PLOT.top} x2={x} y2={PLOT.bottom} stroke="rgba(74, 59, 43, 0.12)" />
              <text x={x} y={PLOT.bottom + 20} textAnchor="middle" fill="rgba(37, 31, 24, 0.62)" fontSize="12">
                {tick}
              </text>
            </g>
          );
        })}

        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = toSvg({ x: 0, y: tick }).y;
          return (
            <g key={`y-${tick}`}>
              <line x1={PLOT.left} y1={y} x2={PLOT.right} y2={y} stroke="rgba(74, 59, 43, 0.12)" />
              <text x={PLOT.left - 14} y={y + 4} textAnchor="end" fill="rgba(37, 31, 24, 0.62)" fontSize="12">
                {tick}
              </text>
            </g>
          );
        })}

        <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right + 18} y2={PLOT.bottom} stroke="#251f18" strokeWidth="2.4" />
        <line x1={origin.x} y1={PLOT.bottom} x2={origin.x} y2={PLOT.top - 18} stroke="#251f18" strokeWidth="2.4" />
        <path d={`M ${PLOT.right + 18} ${PLOT.bottom} L ${PLOT.right + 7} ${PLOT.bottom - 6} L ${PLOT.right + 7} ${PLOT.bottom + 6} Z`} fill="#251f18" />
        <path d={`M ${origin.x} ${PLOT.top - 18} L ${origin.x - 6} ${PLOT.top - 7} L ${origin.x + 6} ${PLOT.top - 7} Z`} fill="#251f18" />

        <text x={(PLOT.left + PLOT.right) / 2} y={PLOT.bottom + 36} textAnchor="middle" fill="#251f18" fontSize="14" fontWeight="700">
          gender
        </text>
        <text
          x={PLOT.left - 46}
          y={(PLOT.top + PLOT.bottom) / 2}
          textAnchor="middle"
          fill="#251f18"
          fontSize="14"
          fontWeight="700"
          transform={`rotate(-90 ${PLOT.left - 46} ${(PLOT.top + PLOT.bottom) / 2})`}
        >
          occupation
        </text>

        <line
          x1={origin.x}
          y1={origin.y}
          x2={left.x}
          y2={left.y}
          stroke="#3267d6"
          strokeWidth="3.5"
          markerEnd="url(#word-vector-left-arrow)"
        />
        <line
          x1={origin.x}
          y1={origin.y}
          x2={right.x}
          y2={right.y}
          stroke="#d63f5d"
          strokeWidth="3.5"
          markerEnd="url(#word-vector-right-arrow)"
        />

        {[
          { ...pair.left, ...left, color: "#3267d6" },
          { ...pair.right, ...right, color: "#d63f5d" },
        ].map((point) => (
          <g key={point.label}>
            <rect x={point.x - 48} y={point.y - 42} width="96" height="28" rx="7" fill="#fff8ef" stroke="var(--rule)" />
            <text x={point.x} y={point.y - 23} textAnchor="middle" fill="#251f18" fontSize="15" fontWeight="700">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
