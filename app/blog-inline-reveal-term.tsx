import type { ReactNode } from "react";

export function BlogInlineRevealTerm({
  term,
  reveal,
  pad = true,
  placement = "below",
}: {
  term: string;
  reveal: ReactNode;
  pad?: boolean;
  placement?: "above" | "below";
}) {
  return (
    <>
      {pad ? " " : null}
      <span
        className={`blogInlineRevealTerm paintLink${placement === "above" ? " blogInlineRevealTermAbove" : ""}`}
        tabIndex={0}
      >
        {term}
        <span className="blogInlineRevealText">{reveal}</span>
      </span>
      {pad ? " " : null}
    </>
  );
}
