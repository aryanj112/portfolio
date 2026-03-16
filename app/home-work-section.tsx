"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { workExperiences, workTimeline } from "./site-data";

export function HomeWorkSection() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const isInternalHref = (href: string) => href.startsWith("/") || href.startsWith("#");

  const workBySlug = useMemo(
    () => Object.fromEntries(workExperiences.map((entry) => [entry.slug, entry])),
    [],
  );

  const industryWork = workTimeline.filter((item) => item.track === "Industry");
  const academiaWork = workTimeline.filter((item) => item.track === "Academia");
  const activeEntry = activeSlug ? workBySlug[activeSlug] : null;

  const renderLane = (items: typeof workTimeline) => (
    <div className="workLaneList">
      {items.map((item) => (
        <button
          type="button"
          className="timelineCard timelineCardVertical timelineCardButton"
          key={item.slug}
          onClick={() => setActiveSlug(item.slug)}
        >
          <div className="timelineLogo">
            <Image src={item.logoSrc} alt={item.logoAlt} width={72} height={72} className="timelineLogoImage" />
          </div>
          <div className="timelineCopy">
            <h3>{item.company}</h3>
            <p>{item.role}</p>
            <p className="timelineSummary">{item.summary}</p>
            <span>{item.period}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <section className="timelineSection homeSection" id="work">
        <h2 className="sectionSubhead">Work experience</h2>
        <div className="workSplitTimeline">
          <div className="workLane">
            <div className="workLaneHeader">Industry</div>
            {renderLane(industryWork)}
          </div>
          <div className="workLaneDivider" aria-hidden="true" />
          <div className="workLane">
            <div className="workLaneHeader">Academia</div>
            {renderLane(academiaWork)}
          </div>
        </div>
      </section>

      {activeEntry ? (
        <div
          className="workModalBackdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeEntry.title} details`}
          onClick={() => setActiveSlug(null)}
        >
          <div className="workModalCard" onClick={(event) => event.stopPropagation()}>
            <div className="workModalTop">
              <div>
                <h3>{activeEntry.title}</h3>
                <p>{activeEntry.subtitle}</p>
              </div>
              <button type="button" className="resumeCloseButton" onClick={() => setActiveSlug(null)}>
                Close
              </button>
            </div>

            <div className="workModalBody">
              <div className="workModalMeta">
                <span>{activeEntry.period}</span>
                {activeEntry.location ? (
                  activeEntry.locationHref ? (
                      <a
                        href={activeEntry.locationHref}
                        className="paintLink workMetaLink"
                        onClick={() => setActiveSlug(null)}
                        target={isInternalHref(activeEntry.locationHref) ? undefined : "_blank"}
                        rel={isInternalHref(activeEntry.locationHref) ? undefined : "noreferrer"}
                      >
                        {activeEntry.location}
                      </a>
                  ) : (
                    <span>{activeEntry.location}</span>
                  )
                ) : null}
              </div>

              <section className="workModalSection">
                <h4>Overview</h4>
                <p>{activeEntry.summary}</p>
                {activeEntry.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </section>

              <section className="workModalSection">
                <h4>Technologies</h4>
                {activeEntry.tags?.length ? (
                  <div className="techStackRow">
                    <span className="techStackEmoji" aria-hidden="true">
                      💻
                    </span>
                    <div className="tagRow">
                      {activeEntry.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>Add technologies here later.</p>
                )}
              </section>

              {activeEntry.links?.length ? (
                <section className="workModalSection">
                  <h4>Links</h4>
                  <div className="projectPageLinkRow">
                    {activeEntry.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="paintLink standardUnderlineLink"
                        target={isInternalHref(link.href) ? undefined : "_blank"}
                        rel={isInternalHref(link.href) ? undefined : "noreferrer"}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}

              {activeEntry.attachments?.length ? (
                <section className="workModalSection">
                  <h4>Attachments</h4>
                  <div className="workAttachmentList">
                    {activeEntry.attachments.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="paintLink"
                        target={isInternalHref(item.href) ? undefined : "_blank"}
                        rel={isInternalHref(item.href) ? undefined : "noreferrer"}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
