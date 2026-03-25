import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

export function PaintLink({
  href,
  children,
  className = "",
  onClick,
  pad = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  pad?: boolean;
}) {
  const isInternalHref = href.startsWith("/") || href.startsWith("#");
  const resolvedClassName = className ? `paintLink ${className}` : "paintLink";

  if (isInternalHref) {
    return (
      <>
        {pad ? " " : null}
        <Link href={href} className={resolvedClassName} onClick={onClick}>
          {children}
        </Link>
        {pad ? " " : null}
      </>
    );
  }

  return (
    <>
      {pad ? " " : null}
      <a href={href} className={resolvedClassName} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
      {pad ? " " : null}
    </>
  );
}
