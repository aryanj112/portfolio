import type { ReactNode } from "react";

export function BlogInlineRevealTerm({
  term,
  reveal,
  pad = true,
}: {
  term: string;
  reveal: ReactNode;
  pad?: boolean;
}) {
  return (
    <>
      {pad ? " " : null}
      <span className="blogInlineRevealTerm paintLink" tabIndex={0}>
        {term}
        <span className="blogInlineRevealText">{reveal}</span>
      </span>
      {pad ? " " : null}
    </>
  );
}
