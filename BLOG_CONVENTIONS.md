# Blog Conventions

This file documents the conventions used for blog posts in this portfolio so future edits stay consistent.

## General style

- Keep the writing casual, direct, and personal.
- Prefer explanation with intuition over sounding overly formal.
- If something is meant to feel like notes, that is okay.
- Avoid over-structuring the post unless needed.

## Section headings

- Do not default to normal heading tags for sub-sections.
- Preferred pattern is a paragraph with strong text.
- Use the shared component:

```tsx
import { PStrong } from "../../blog-strong-heading";

<PStrong>History:</PStrong>
```

## Inline term reveals

- For glossary-style inline terms, use the hover/focus reveal pattern.
- Preferred shared component:

```tsx
import { BlogInlineRevealTerm } from "../../blog-inline-reveal-term";

<BlogInlineRevealTerm term="PID" reveal="process identifier" />
```

- This component adds inline spacing by default.
- Use this for terms like `PID`, `GNU`, `UNIX`, `GUI`, `Bash`, and similar short concepts.
- Do not overuse it on common words if it starts feeling noisy.

## Links

- Use the painted underline link style through the shared component instead of manually writing `className="paintLink"`.
- Preferred shared component:

```tsx
import { PaintLink } from "../../paint-link";

<PaintLink href="https://example.com">example link</PaintLink>
```

- This component also adds inline spacing by default.

## Code buttons

- If a blog post has a GitHub/code link, use the shared top metadata button component.
- Preferred shared component:

```tsx
import { BlogCodeLink } from "../../blog-code-link";

<BlogCodeLink href="https://github.com/user/repo" />
```

## Code blocks

- Use `CodeBlock` for code-only examples.
- Use `CodeOutputBlock` when showing both code and terminal/program output.
- Supported languages currently include:
  - `bash`
  - `c`
  - `python`
  - `tsx`
  - `typescript`
  - `javascript`

### Code only

```tsx
import { CodeBlock } from "../../code-block";

<CodeBlock
  language="bash"
  code={`ps`}
/>
```

### Code plus output

```tsx
import { CodeOutputBlock } from "../../code-output-block";

<CodeOutputBlock
  language="bash"
  code={`ps`}
  output={`PID TTY TIME CMD`}
/>
```

## Blog header metadata

- Blog posts use:
  - byline
  - post date
  - hover/focus reveal for `Last updated`
  - optional GitHub code button
  - view count

- Keep the visible header clean.
- Do not show `Last updated` as plain text by default in the header.

## Media

- Images usually use the shared lightbox component:

```tsx
import { BlogImageLightbox } from "../../blog-image-lightbox";

<BlogImageLightbox
  src="/blog/post-slug/example.png"
  alt="Example"
  width={1200}
  height={900}
/>
```

- Put blog assets in `public/blog/<post-slug>/`.
- If using third-party embeds, keep them centered and visually contained with rounded corners when possible.

## Current preferred feel

- Sleek code blocks with tighter spacing.
- Inline hover terms for important jargon, but not for every repeated word.
- Painted underline links.
- `p > strong` style mini-headings instead of regular section headers when that feels better.
- Posts should feel hand-written, not auto-generated.

## Files to reference

- `app/blog-inline-reveal-term.tsx`
- `app/paint-link.tsx`
- `app/blog-code-link.tsx`
- `app/blog-strong-heading.tsx`
- `app/code-block.tsx`
- `app/code-output-block.tsx`
- `app/blog-image-lightbox.tsx`
- `app/globals.css`

## Important note

- If a user asks for a different style in a specific post, follow the user over this document.
