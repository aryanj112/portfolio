"use client";

import { useMemo, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";

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
  const py = 214 + py3d * 42 - pz3d * 58;
  return `${px},${py}`;
}

function buildCurve(sxx: number, sxy: number, syy: number, fixedAxis: "x" | "y", value: number, yaw: number, pitch: number) {
  return GRID_VALUES.map((other) => {
    const x = fixedAxis === "x" ? value : other;
    const y = fixedAxis === "y" ? value : other;
    const z = sxx * x * x + 2 * sxy * x * y + syy * y * y;
    return projectPoint(x, y, z, yaw, pitch);
  }).join(" ");
}

export function HarrisSurfaceDemo() {
  const [sxx, setSxx] = useState(1.2);
  const [sxy, setSxy] = useState(0.0);
  const [syy, setSyy] = useState(1.2);
  const [isDiagonalMatrix, setIsDiagonalMatrix] = useState(false);
  const [rightView, setRightView] = useState<"topdown" | "regions">("topdown");
  const [yaw, setYaw] = useState(-0.72);
  const [pitch, setPitch] = useState(0.55);
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const activeSxy = isDiagonalMatrix ? 0 : sxy;

  const { lambda1, lambda2, classification } = useMemo(() => {
    const trace = sxx + syy;
    const detTerm = Math.sqrt((sxx - syy) ** 2 + 4 * activeSxy * activeSxy);
    const l1 = (trace + detTerm) / 2;
    const l2 = (trace - detTerm) / 2;

    let region = "Flat";
    if (l1 > 0.75 && l2 > 0.75) region = "Corner";
    else if (l1 > 0.75 || l2 > 0.75) region = "Edge";

    return { lambda1: l1, lambda2: l2, classification: region };
  }, [sxx, activeSxy, syy]);

  const curves = useMemo(() => {
    return {
      xCurves: GRID_VALUES.map((value) => buildCurve(sxx, activeSxy, syy, "x", value, yaw, pitch)),
      yCurves: GRID_VALUES.map((value) => buildCurve(sxx, activeSxy, syy, "y", value, yaw, pitch)),
    };
  }, [sxx, activeSxy, syy, yaw, pitch]);

  const lambdaPoint = useMemo(() => {
    const clamp = (value: number) => Math.max(0, Math.min(2.2, value));
    const x = 58 + (clamp(lambda1) / 2.2) * 240;
    const y = 268 - (clamp(lambda2) / 2.2) * 240;
    return { x, y };
  }, [lambda1, lambda2]);

  const topDownRadii = useMemo(() => {
    const clampRadius = (value: number, scale: number, minRadius: number, maxRadius: number) =>
      Math.max(minRadius, Math.min(maxRadius, scale / Math.sqrt(Math.max(value, 0.12))));

    return {
      innerRx: clampRadius(lambda1, 70, 28, 104),
      innerRy: clampRadius(lambda2, 70, 28, 72),
      outerRx: clampRadius(lambda1, 100, 42, 122),
      outerRy: clampRadius(lambda2, 100, 42, 88),
    };
  }, [lambda1, lambda2]);

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

  function resetView() {
    setYaw(-0.72);
    setPitch(0.55);
  }

  return (
    <div className="harrisSurfaceDemo">
      <div className="harrisSurfaceEquation">
        <BlockMath math={"E(u,v) \\approx \\left(\\sum I_x^2\\right)u^2 + 2\\left(\\sum I_xI_y\\right)uv + \\left(\\sum I_y^2\\right)v^2"} />
        <BlockMath
          math={`M = \\begin{bmatrix} ${sxx.toFixed(2)} & ${activeSxy.toFixed(2)} \\\\ ${activeSxy.toFixed(2)} & ${syy.toFixed(2)} \\end{bmatrix}`}
        />
      </div>

      <div className="harrisSurfaceToggleRow">
        <button
          type="button"
          className={`harrisDiagonalToggle${isDiagonalMatrix ? " isActive" : ""}`}
          onClick={() => setIsDiagonalMatrix((value) => !value)}
        >
          {isDiagonalMatrix ? "Diagonal matrix on" : "Diagonal matrix off"}
        </button>
      </div>

      <div className="harrisSurfacePanels">
        <div className="harrisSurfacePanel">
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
        </div>

        <div className="harrisSurfacePanel">
          <div className="harrisRightViews">
            <div className="harrisCrossSectionToggle">
              <button
                type="button"
                className={`harrisCrossSectionButton${rightView === "topdown" ? " isActive" : ""}`}
                onClick={() => setRightView("topdown")}
              >
                Top-down
              </button>
              <button
                type="button"
                className={`harrisCrossSectionButton${rightView === "regions" ? " isActive" : ""}`}
                onClick={() => setRightView("regions")}
              >
                λ view
              </button>
            </div>

            <div className="harrisMiniPanel">
              {rightView === "topdown" ? (
                <>
                  <p className="harrisMiniLabel">Top-down view</p>
                  <svg className="harrisCrossSectionSvg" viewBox="0 0 320 220" role="img" aria-label="Top down Harris contour view">
                    <rect x="0" y="0" width="320" height="220" fill="rgba(252,248,241,0.8)" />
                    <line x1="32" y1="110" x2="288" y2="110" stroke="rgba(74,59,43,0.16)" strokeWidth="1.2" />
                    <line x1="160" y1="24" x2="160" y2="196" stroke="rgba(74,59,43,0.16)" strokeWidth="1.2" />
                    <ellipse
                      cx="160"
                      cy="110"
                      rx={topDownRadii.innerRx}
                      ry={topDownRadii.innerRy}
                      fill="none"
                      stroke="#355a74"
                      strokeWidth="3"
                    />
                    <ellipse
                      cx="160"
                      cy="110"
                      rx={topDownRadii.outerRx}
                      ry={topDownRadii.outerRy}
                      fill="none"
                      stroke="#7fb7aa"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <p className="harrisMiniLabel">Corner regions</p>
                  <svg className="harrisCrossSectionSvg" viewBox="0 0 340 320" role="img" aria-label="Harris lambda region plot">
                    <rect x="0" y="0" width="340" height="320" fill="rgba(252,248,241,0.82)" />

                    <line x1="58" y1="268" x2="308" y2="268" stroke="#ef2b2d" strokeWidth="4" />
                    <line x1="58" y1="268" x2="58" y2="24" stroke="#ef2b2d" strokeWidth="4" />
                    <line x1="308" y1="268" x2="294" y2="254" stroke="#ef2b2d" strokeWidth="4" />
                    <line x1="308" y1="268" x2="294" y2="282" stroke="#ef2b2d" strokeWidth="4" />
                    <line x1="58" y1="24" x2="44" y2="38" stroke="#ef2b2d" strokeWidth="4" />
                    <line x1="58" y1="24" x2="72" y2="38" stroke="#ef2b2d" strokeWidth="4" />

                    <line x1="58" y1="173" x2="152" y2="268" stroke="#121212" strokeWidth="4" />
                    <line x1="84" y1="180" x2="156" y2="41" stroke="#28a74f" strokeWidth="4" />
                    <line x1="132" y1="214" x2="292" y2="154" stroke="#169be6" strokeWidth="4" />

                    <circle cx={lambdaPoint.x + 2} cy={lambdaPoint.y} r="8" fill="#8f4db4" />

                    <text
                      x="22"
                      y="162"
                      fill="#ef2b2d"
                      transform="rotate(-90 22 162)"
                      style={{ fontSize: "20px", fontWeight: 700 }}
                    >
                      λ₂
                    </text>
                    <text x="214" y="308" fill="#ef2b2d" style={{ fontSize: "20px", fontWeight: 700 }}>
                      λ₁
                    </text>

                    <text x="64" y="92" fill="#18a44b" style={{ fontSize: "20px", fontWeight: 700 }}>
                      Edge
                    </text>

                    <text x="186" y="120" fill="#a24ab8" style={{ fontSize: "20px", fontWeight: 700 }}>
                      Corner
                    </text>

                    <text x="70" y="248" fill="#111111" style={{ fontSize: "20px", fontWeight: 700 }}>
                      Flat
                    </text>

                    <text x="220" y="232" fill="#169be6" style={{ fontSize: "20px", fontWeight: 700 }}>
                      Edge
                    </text>
                  </svg>
                </>
              )}
            </div>
          </div>
          <p className="harrisSurfaceHint">
            Current region: {classification} ({lambda1.toFixed(2)}, {lambda2.toFixed(2)})
          </p>
          <p className="harrisSurfaceHint">
            Swapping x and y changes the orientation, but not the eigenvalues.
          </p>
        </div>
      </div>

      <div className="harrisSurfaceControls">
        <div className="harrisSurfaceControlsTop">
          <p className="harrisSurfaceHint">Drag the surface to rotate it.</p>
          <button type="button" className="harrisResetButton" onClick={resetView}>
            Reset view
          </button>
        </div>
        <label className="harrisSurfaceSlider">
          <span><InlineMath math={"\\sum I_x^2"} />: {sxx.toFixed(2)}</span>
          <input type="range" min="-0.2" max="2" step="0.05" value={sxx} onChange={(e) => setSxx(Number(e.target.value))} />
        </label>
        <label className="harrisSurfaceSlider">
          <span><InlineMath math={"\\sum I_x I_y"} />: {activeSxy.toFixed(2)}</span>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.05"
            value={sxy}
            disabled={isDiagonalMatrix}
            onChange={(e) => setSxy(Number(e.target.value))}
          />
        </label>
        <label className="harrisSurfaceSlider">
          <span><InlineMath math={"\\sum I_y^2"} />: {syy.toFixed(2)}</span>
          <input type="range" min="-0.2" max="2" step="0.05" value={syy} onChange={(e) => setSyy(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
