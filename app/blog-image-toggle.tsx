"use client";

import { useState } from "react";
import { BlogImageLightbox } from "./blog-image-lightbox";

export function BlogImageToggle({
  colorSrc,
  graySrc,
  colorAlt,
  grayAlt,
  width,
  height,
}: {
  colorSrc: string;
  graySrc: string;
  colorAlt: string;
  grayAlt: string;
  width: number;
  height: number;
}) {
  const [mode, setMode] = useState<"color" | "gray">("color");

  const isColor = mode === "color";

  return (
    <div className="blogImageToggleBlock">
      <BlogImageLightbox
        className="blogInlineImage"
        src={isColor ? colorSrc : graySrc}
        alt={isColor ? colorAlt : grayAlt}
        width={width}
        height={height}
      />

      <div className="blogImageToggleRow">
        <span className="blogImageToggleLabel">View:</span>
        <button
          type="button"
          className={`blogImageToggleButton${isColor ? " isActive" : ""}`}
          onClick={() => setMode("color")}
        >
          Color
        </button>
        <button
          type="button"
          className={`blogImageToggleButton${!isColor ? " isActive" : ""}`}
          onClick={() => setMode("gray")}
        >
          Grayscale
        </button>
      </div>
    </div>
  );
}
