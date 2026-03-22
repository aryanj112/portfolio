"use client";

import { useEffect, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";

export function BlogMathPopup({
  math,
  label = "Open equation",
  items,
  inline = false,
  anchorId,
}: {
  math: string;
  label?: string;
  items: Array<{ symbol: string; meaning: string }>;
  inline?: boolean;
  anchorId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!anchorId) return;

    function syncWithHash() {
      if (window.location.hash === `#${anchorId}`) {
        setIsOpen(true);
      }
    }

    function handleForceOpen(event: Event) {
      const customEvent = event as CustomEvent<{ anchorId?: string }>;
      if (customEvent.detail?.anchorId === anchorId) {
        setIsOpen(true);
      }
    }

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    window.addEventListener("blog-math-open", handleForceOpen as EventListener);

    return () => {
      window.removeEventListener("hashchange", syncWithHash);
      window.removeEventListener("blog-math-open", handleForceOpen as EventListener);
    };
  }, [anchorId]);

  return (
    <div className="blogMathWrap" ref={rootRef} id={anchorId}>
      {inline ? (
        <button type="button" className="blogMathInlineButton paintLink" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen}>
          {label}
        </button>
      ) : (
        <button type="button" className="blogMathButton" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen}>
          <span className="blogMathButtonLabel">{label}</span>
          <BlockMath math={math} />
        </button>
      )}

      {isOpen ? (
        <div className="blogMathBackdrop" onClick={() => setIsOpen(false)} role="dialog" aria-label="Equation key">
          <div className="blogMathPopover" onClick={(event) => event.stopPropagation()}>
            <div className="blogMathPopoverEquation">
              <BlockMath math={math} />
            </div>
            <div className="blogMathKey">
              {items.map((item) => (
                <p key={item.symbol} className="blogMathKeyRow">
                  <span className="blogMathKeySymbol">
                    <InlineMath math={item.symbol} />
                  </span>
                  <span className="blogMathKeyColon">:</span>
                  <span>{item.meaning}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
