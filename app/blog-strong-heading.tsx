import type { ReactNode } from "react";

export function PStrong({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const resolvedClassName = className ? `blogStrongHeading ${className}` : "blogStrongHeading";

  return (
    <p className={resolvedClassName}>
      <strong>{children}</strong>
    </p>
  );
}
