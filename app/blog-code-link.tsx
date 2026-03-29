export function BlogCodeLink({ href }: { href: string }) {
  return (
    <a href={href} className="blogCodeLink" target="_blank" rel="noreferrer" aria-label="View code for this post">
      <span className="blogCodeLinkIcon" aria-hidden="true">
        {"</>"}
      </span>
      <span>Code</span>
    </a>
  );
}
