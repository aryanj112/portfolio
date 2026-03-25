"use client";

import { PaintLink } from "./paint-link";

export function BlogMathAnchorLink({
  anchorId,
  children,
}: {
  anchorId: string;
  children: React.ReactNode;
}) {
  return (
    <PaintLink
      href={`#${anchorId}`}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("blog-math-open", {
            detail: { anchorId },
          }),
        );
      }}
    >
      {children}
    </PaintLink>
  );
}
