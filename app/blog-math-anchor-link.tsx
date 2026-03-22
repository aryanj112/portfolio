"use client";

export function BlogMathAnchorLink({
  anchorId,
  children,
}: {
  anchorId: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${anchorId}`}
      className="paintLink"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("blog-math-open", {
            detail: { anchorId },
          }),
        );
      }}
    >
      {children}
    </a>
  );
}
