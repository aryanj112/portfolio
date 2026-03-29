import { codeToHtml } from "shiki";
import { CodeBlockClient } from "./code-block-client";

export async function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: "bash" | "c" | "python" | "tsx" | "typescript" | "javascript";
}) {
  const resolvedLanguage = language ?? "python";
  const html = await codeToHtml(code, {
    lang: resolvedLanguage,
    theme: "github-dark",
  });

  return <CodeBlockClient code={code} html={html} language={resolvedLanguage} />;
}
