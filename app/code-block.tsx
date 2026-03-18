import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  lang,
  language,
}: {
  code: string;
  lang?: "python" | "tsx" | "typescript" | "javascript";
  language?: "python" | "tsx" | "typescript" | "javascript";
}) {
  const html = await codeToHtml(code, {
    lang: language ?? lang ?? "python",
    theme: "github-dark",
  });

  return <div className="blogCodeBlockShiki" dangerouslySetInnerHTML={{ __html: html }} />;
}
