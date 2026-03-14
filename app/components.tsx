"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DetailEntry, profile } from "./site-data";

const homeNavItems = [
  { href: "/#", hash: "", label: "Home", tone: "navPaint1" },
  { href: "/#work", hash: "work", label: "Work", tone: "navPaint2" },
  { href: "/#projects", hash: "projects", label: "Projects", tone: "navPaint3" },
  { href: "/#extracurriculars", hash: "extracurriculars", label: "Extracurriculars", tone: "navPaint4" },
  { href: "/#contact", hash: "contact", label: "Contact", tone: "navPaint5" },
];

const secondaryNavItems = [
  { href: "/more-me", label: "More Me 🎸", tone: "navPaint2" },
  { href: "/blog", label: "Blog ⚙️", tone: "navPaint3" },
];

const wordmarkPaints = [
  "wordmarkPaint1",
  "wordmarkPaint2",
  "wordmarkPaint3",
  "wordmarkPaint4",
  "wordmarkPaint5",
];

export function SiteShell({
  children,
  title,
  intro,
}: {
  children: React.ReactNode;
  title?: string;
  intro?: string;
}) {
  const pathname = usePathname();
  const [wordmarkTone, setWordmarkTone] = useState(wordmarkPaints[0]);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash.replace("#", ""));
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const randomizeWordmarkTone = () => {
    const nextTone = wordmarkPaints[Math.floor(Math.random() * wordmarkPaints.length)];
    setWordmarkTone(nextTone);
  };

  return (
    <main className="page">
      <header className="masthead">
        <div className="mastheadTop">
          <Link
            href="/"
            className={`wordmark ${wordmarkTone}`}
            onMouseEnter={randomizeWordmarkTone}
            onFocus={randomizeWordmarkTone}
          >
            <Image
              src={profile.headshot}
              alt={`${profile.name} headshot`}
              width={44}
              height={44}
              className="wordmarkPhoto"
            />
          </Link>
          <nav className="topNav" aria-label="Primary">
            {homeNavItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={`navPaintLink ${item.tone} ${
                  pathname === "/" && ((item.hash === "" && activeHash === "") || item.hash === activeHash)
                    ? "navActive"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <span className="navDivider" aria-hidden="true">
              |
            </span>
            {secondaryNavItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={`navPaintLink ${item.tone} ${pathname === item.href ? "navActive" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {(title || intro) && (
          <div className="pageIntro">
            {title ? <h1>{title}</h1> : null}
            {intro ? <p>{intro}</p> : null}
          </div>
        )}
      </header>
      {children}
    </main>
  );
}

export function SectionList({
  label,
  items,
  basePath,
}: {
  label: string;
  items: DetailEntry[];
  basePath: string;
}) {
  return (
    <section className="listSection">
      <h2 className="sectionSubhead">{label}</h2>
      <div className="rule" aria-hidden="true" />
      <div className="lineList">
        {items.map((item) => (
          <Link className="lineItem interactiveRow" href={`${basePath}/${item.slug}`} key={item.slug}>
            <div className="linePrimary">
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
            <div className="lineMeta">
              <span>{item.period}</span>
              {item.location ? <span>{item.location}</span> : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DetailPage({
  entry,
  backHref,
  backLabel,
}: {
  entry: DetailEntry;
  backHref: string;
  backLabel: string;
}) {
  return (
    <SiteShell title={entry.title} intro={entry.summary}>
      <section className="detailSection">
        <div className="detailMeta">
          <p>{entry.subtitle}</p>
          <div className="detailMetaRow">
            <span>{entry.period}</span>
            {entry.location ? <span>{entry.location}</span> : null}
          </div>
          {entry.tags?.length ? (
            <div className="tagRow">
              {entry.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="rule" aria-hidden="true" />
        <div className="detailBody">
          {entry.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>
        <div className="rule" aria-hidden="true" />
        <Link href={backHref} className="backLink">
          Back to {backLabel}
        </Link>
      </section>
    </SiteShell>
  );
}
