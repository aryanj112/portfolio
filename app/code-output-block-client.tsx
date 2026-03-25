"use client";

import { useState } from "react";

export function CodeOutputBlockClient({
  code,
  html,
  language,
  output,
}: {
  code: string;
  html: string;
  language: string;
  output: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="blogCodeOutputFrame">
      <div className="blogCodeBlockTop">
        <span className="blogCodeBlockLanguage">{language}</span>
        <button type="button" className="blogCodeBlockCopyButton" onClick={handleCopy} aria-live="polite">
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
      <div className="blogCodeBlockShiki" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="blogCodeOutputSection">
        <div className="blogCodeOutputLabel">output</div>
        <pre className="blogCodeOutputPre">{output}</pre>
      </div>
    </div>
  );
}
