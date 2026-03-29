import { codeToHtml } from "shiki";
import { CodeOutputBlockClient } from "./code-output-block-client";

export async function CodeOutputBlock({
  code,
  output,
  language,
}: {
  code: string;
  output: string;
  language?: "bash" | "c" | "python" | "tsx" | "typescript" | "javascript";
}) {
  const resolvedLanguage = language ?? "python";
  const html = await codeToHtml(code, {
    lang: resolvedLanguage,
    theme: "github-dark",
  });

  return <CodeOutputBlockClient code={code} html={html} language={resolvedLanguage} output={output} />;
}
