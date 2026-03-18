"use client";

import { useEffect, useRef, useState } from "react";

export function BlogViewCount({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadViews() {
      try {
        const response = await fetch(`/api/blog/views/${slug}`, {
          method: "POST",
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { count: number | null; enabled: boolean };

        if (!cancelled) {
          setCount(data.count);
        }
      } catch {
        if (!cancelled) {
          setCount(null);
        }
      }
    }

    loadViews();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="blogViewCountWrap" ref={rootRef}>
      <button
        type="button"
        className="blogViewCountButton"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label="Show page viewer count"
      >
        <span aria-hidden="true">👀</span>
        <span>{count ?? "--"}</span>
      </button>

      {isOpen ? (
        <div className="blogViewCountPopover" role="dialog" aria-label="Viewer count details">
          <p className="blogViewCountMessage">
            You are the <strong>{count ?? "--"}</strong> viewer of this page
          </p>
        </div>
      ) : null}
    </div>
  );
}
