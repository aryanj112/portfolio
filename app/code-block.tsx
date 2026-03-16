import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang: "python" | "tsx" | "typescript" | "javascript";
}) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return <div className="blogCodeBlockShiki" dangerouslySetInnerHTML={{ __html: html }} />;
}
