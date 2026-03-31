"use client";

import { useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";

const AXIS_MIN = -4;
const AXIS_MAX = 4;
const AXIS_SPAN = AXIS_MAX - AXIS_MIN;
const PLOT_LEFT = 54;
const PLOT_RIGHT = 250;
const PLOT_TOP = 54;
const PLOT_BOTTOM = 250;
const PLOT_SIZE = PLOT_RIGHT - PLOT_LEFT;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function formatValue(value: number) {
  if (Math.abs(value) < 0.005) return "0.00";
  return value.toFixed(2);
}

export function LucasKanadeLineDemo() {
  const [ix, setIx] = useState(1);
  const [iy, setIy] = useState(0.6);
  const [it, setIt] = useState(-0.9);
  const [selectedT, setSelectedT] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);

  const { line, intercepts } = useMemo(() => {
    const points: Array<{ x: number; y: number }> = [];

    const sampleAtU = (u: number) => {
      if (Math.abs(iy) < 1e-6) return null;
      return (-it - ix * u) / iy;
    };

    const sampleAtV = (v: number) => {
      if (Math.abs(ix) < 1e-6) return null;
      return (-it - iy * v) / ix;
    };

    for (const u of [AXIS_MIN, AXIS_MAX]) {
      const v = sampleAtU(u);
      if (v !== null && v >= AXIS_MIN && v <= AXIS_MAX) points.push({ x: u, y: v });
    }

    for (const v of [AXIS_MIN, AXIS_MAX]) {
      const u = sampleAtV(v);
      if (u !== null && u >= AXIS_MIN && u <= AXIS_MAX) points.push({ x: u, y: v });
    }

    const deduped = points.filter(
      (point, index) =>
        points.findIndex((candidate) => Math.abs(candidate.x - point.x) < 1e-6 && Math.abs(candidate.y - point.y) < 1e-6) === index,
    );

    const toSvg = (u: number, v: number) => {
      const x = PLOT_LEFT + ((u - AXIS_MIN) / AXIS_SPAN) * PLOT_SIZE;
      const y = PLOT_BOTTOM - ((v - AXIS_MIN) / AXIS_SPAN) * PLOT_SIZE;
      return { x, y };
    };

    const svgPoints = deduped.slice(0, 2).map((point) => toSvg(point.x, point.y));

    return {
      line:
        svgPoints.length === 2
          ? {
              x1: svgPoints[0].x,
              y1: svgPoints[0].y,
              x2: svgPoints[1].x,
              y2: svgPoints[1].y,
              u1: deduped[0].x,
              v1: deduped[0].y,
              u2: deduped[1].x,
              v2: deduped[1].y,
            }
          : null,
      intercepts: {
        u: Math.abs(ix) < 1e-6 ? null : clamp(-it / ix, AXIS_MIN, AXIS_MAX),
        v: Math.abs(iy) < 1e-6 ? null : clamp(-it / iy, AXIS_MIN, AXIS_MAX),
      },
    };
  }, [ix, iy, it]);

  const selectedPoint = useMemo(() => {
    if (!line) return null;
    return {
      x: line.x1 + (line.x2 - line.x1) * selectedT,
      y: line.y1 + (line.y2 - line.y1) * selectedT,
      u: line.u1 + (line.u2 - line.u1) * selectedT,
      v: line.v1 + (line.v2 - line.v1) * selectedT,
    };
  }, [line, selectedT]);

  function updatePointFromPointer(event: React.PointerEvent<SVGSVGElement>) {
    if (!line) return;
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 320;
    const y = ((event.clientY - rect.top) / rect.height) * 320;
    const dx = line.x2 - line.x1;
    const dy = line.y2 - line.y1;
    const denom = dx * dx + dy * dy;
    if (denom < 1e-6) return;
    const t = ((x - line.x1) * dx + (y - line.y1) * dy) / denom;
    setSelectedT(clamp(t, 0, 1));
  }

  return (
    <div className="lkLineDemo">
      <div className="lkLineDemoTop">
        <div className="lkLineDemoEquation">
          <BlockMath math={`0 = u(${formatValue(ix)}) + v(${formatValue(iy)}) + (${formatValue(it)})`} />
        </div>
        <p className="lkLineDemoHover">
          {selectedPoint ? (
            <>
              <InlineMath math={"u"} /> = {formatValue(selectedPoint.u)}, <InlineMath math={"v"} /> = {formatValue(selectedPoint.v)}
            </>
          ) : (
            "drag the point to inspect (u, v)"
          )}
        </p>
      </div>

      <div className="lkLineDemoGrid">
        <div className="lkLineDemoPanel">
          <svg
            className="lkLineDemoSvg"
            viewBox="0 0 320 320"
            role="img"
            aria-label="Lucas-Kanade constraint line in the uv plane"
            onPointerMove={(event) => {
              if (isDragging) updatePointFromPointer(event);
            }}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
          >
            <rect x="0" y="0" width="320" height="320" fill="rgba(252,248,241,0.82)" />

            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
              const pos = PLOT_LEFT + index * (PLOT_SIZE / 8);
              return (
                <g key={index}>
                  <line x1={PLOT_LEFT} y1={pos} x2={PLOT_RIGHT} y2={pos} stroke="rgba(74,59,43,0.12)" strokeWidth="1" />
                  <line x1={pos} y1={PLOT_TOP} x2={pos} y2={PLOT_BOTTOM} stroke="rgba(74,59,43,0.12)" strokeWidth="1" />
                </g>
              );
            })}

            <line x1={PLOT_LEFT} y1={PLOT_BOTTOM} x2={PLOT_RIGHT} y2={PLOT_BOTTOM} stroke="#4a3b2b" strokeWidth="2.4" />
            <line x1={PLOT_LEFT} y1={PLOT_BOTTOM} x2={PLOT_LEFT} y2={PLOT_TOP} stroke="#4a3b2b" strokeWidth="2.4" />
            <line x1={PLOT_RIGHT} y1={PLOT_BOTTOM} x2={PLOT_RIGHT - 9} y2={PLOT_BOTTOM - 9} stroke="#4a3b2b" strokeWidth="2.4" />
            <line x1={PLOT_RIGHT} y1={PLOT_BOTTOM} x2={PLOT_RIGHT - 9} y2={PLOT_BOTTOM + 9} stroke="#4a3b2b" strokeWidth="2.4" />
            <line x1={PLOT_LEFT} y1={PLOT_TOP} x2={PLOT_LEFT - 9} y2={PLOT_TOP + 9} stroke="#4a3b2b" strokeWidth="2.4" />
            <line x1={PLOT_LEFT} y1={PLOT_TOP} x2={PLOT_LEFT + 9} y2={PLOT_TOP + 9} stroke="#4a3b2b" strokeWidth="2.4" />

            {line ? (
              <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#2f72b8" strokeWidth="4" strokeLinecap="round" />
            ) : null}

            {selectedPoint ? (
              <circle
                cx={selectedPoint.x}
                cy={selectedPoint.y}
                r="8"
                fill="#2f72b8"
                stroke="#f7f0e4"
                strokeWidth="2.5"
                className="lkLineDraggablePoint"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setIsDragging(true);
                  updatePointFromPointer(event as unknown as React.PointerEvent<SVGSVGElement>);
                }}
              />
            ) : null}

            <circle cx={(PLOT_LEFT + PLOT_RIGHT) / 2} cy={(PLOT_TOP + PLOT_BOTTOM) / 2} r="3.5" fill="#8d6a3f" />

            <text x="258" y="266" className="lkLineAxisLabel">
              u
            </text>
            <text x="34" y="46" className="lkLineAxisLabel">
              v
            </text>

            {intercepts.u !== null ? (
              <text x={PLOT_LEFT + ((intercepts.u - AXIS_MIN) / AXIS_SPAN) * PLOT_SIZE} y={268} className="lkLineTickLabel" textAnchor="middle">
                {formatValue(intercepts.u)}
              </text>
            ) : null}
            {intercepts.v !== null ? (
              <text x="34" y={PLOT_BOTTOM - ((intercepts.v - AXIS_MIN) / AXIS_SPAN) * PLOT_SIZE + 4} className="lkLineTickLabel" textAnchor="end">
                {formatValue(intercepts.v)}
              </text>
            ) : null}
          </svg>

          <p className="lkLineDemoHint">
            For one fixed set of <InlineMath math={"I_x, I_y, I_t"} /> values, there are many possible <InlineMath math={"(u,v)"} /> pairs
            that satisfy this equation. That is why one pixel gives us a line, not a single motion.
          </p>
        </div>

        <div className="lkLineDemoControls">
          <label className="lkLineDemoSlider">
            <span>
              <InlineMath math={"I_x"} />: {formatValue(ix)}
            </span>
            <input type="range" min="-2" max="2" step="0.1" value={ix} onChange={(event) => setIx(Number(event.target.value))} />
          </label>
          <label className="lkLineDemoSlider">
            <span>
              <InlineMath math={"I_y"} />: {formatValue(iy)}
            </span>
            <input type="range" min="-2" max="2" step="0.1" value={iy} onChange={(event) => setIy(Number(event.target.value))} />
          </label>
          <label className="lkLineDemoSlider">
            <span>
              <InlineMath math={"I_t"} />: {formatValue(it)}
            </span>
            <input type="range" min="-2" max="2" step="0.1" value={it} onChange={(event) => setIt(Number(event.target.value))} />
          </label>
        </div>
      </div>
    </div>
  );
}
