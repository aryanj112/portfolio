"use client";

import { useMemo, useRef, useState } from "react";

const GRID_VALUES = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1];

function projectPoint(x: number, y: number, z: number, yaw: number, pitch: number) {
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);

  const rx = x * cosYaw - y * sinYaw;
  const ry = x * sinYaw + y * cosYaw;
  const rz = z;

  const py3d = ry * cosPitch - rz * sinPitch;
  const pz3d = ry * sinPitch + rz * cosPitch;

  const px = 180 + rx * 82;
  const py = 126 + py3d * 42 - pz3d * 58;
  return `${px},${py}`;
}

function buildCurve(a: number, b: number, c: number, fixedAxis: "x" | "y", value: number, yaw: number, pitch: number) {
  return GRID_VALUES.map((other) => {
    const x = fixedAxis === "x" ? value : other;
    const y = fixedAxis === "y" ? value : other;
    const z = a * x * x + 2 * b * x * y + c * y * y;
    return projectPoint(x, y, z, yaw, pitch);
  }).join(" ");
}

export function HarrisSurfaceDemo() {
  const [a, setA] = useState(1.2);
  const [b, setB] = useState(0.0);
  const [c, setC] = useState(1.2);
  const [yaw, setYaw] = useState(-0.72);
  const [pitch, setPitch] = useState(0.55);
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);

  const classification = useMemo(() => {
    if (a > 0.75 && c > 0.75) return "Corner-like";
    if ((a > 0.75 && c < 0.3) || (c > 0.75 && a < 0.3)) return "Edge-like";
    return "Patch-like";
  }, [a, c]);

  const curves = useMemo(() => {
    return {
      xCurves: GRID_VALUES.map((value) => buildCurve(a, b, c, "x", value, yaw, pitch)),
      yCurves: GRID_VALUES.map((value) => buildCurve(a, b, c, "y", value, yaw, pitch)),
    };
  }, [a, b, c, yaw, pitch]);

  function handlePointerDown(event: React.PointerEvent<SVGSVGElement>) {
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      yaw,
      pitch,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    setYaw(dragRef.current.yaw + dx * 0.01);
    setPitch(Math.max(-1.1, Math.min(1.1, dragRef.current.pitch + dy * 0.008)));
  }

  function handlePointerUp(event: React.PointerEvent<SVGSVGElement>) {
    dragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="harrisSurfaceDemo">
      <div className="harrisSurfaceTop">
        <div>
          <p className="harrisSurfaceEyebrow">Interactive surface</p>
          <h3 className="harrisSurfaceTitle">Cornerness parabola</h3>
        </div>
        <p className="harrisSurfaceBadge">{classification}</p>
      </div>

      <svg
        className="harrisSurfaceSvg"
        viewBox="0 0 360 270"
        role="img"
        aria-label="Interactive Harris surface visualization"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <defs>
          <linearGradient id="surfaceFade" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#b9d9c6" />
            <stop offset="100%" stopColor="#7ca3bf" />
          </linearGradient>
        </defs>

        {curves.xCurves.map((points, index) => (
          <polyline
            key={`x-${index}`}
            points={points}
            fill="none"
            stroke="url(#surfaceFade)"
            strokeOpacity={0.9}
            strokeWidth={index === 4 ? 2.4 : 1.2}
          />
        ))}

        {curves.yCurves.map((points, index) => (
          <polyline
            key={`y-${index}`}
            points={points}
            fill="none"
            stroke="#445a73"
            strokeOpacity={index === 4 ? 0.95 : 0.45}
            strokeWidth={index === 4 ? 2.2 : 1}
          />
        ))}
      </svg>

      <div className="harrisSurfaceControls">
        <p className="harrisSurfaceHint">Drag the surface to rotate it.</p>
        <label className="harrisSurfaceSlider">
          <span>a: {a.toFixed(2)}</span>
          <input type="range" min="-0.2" max="2" step="0.05" value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label className="harrisSurfaceSlider">
          <span>b: {b.toFixed(2)}</span>
          <input type="range" min="-1" max="1" step="0.05" value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label className="harrisSurfaceSlider">
          <span>c: {c.toFixed(2)}</span>
          <input type="range" min="-0.2" max="2" step="0.05" value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
