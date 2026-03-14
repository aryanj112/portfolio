"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { workExperiences, workTimeline } from "./site-data";

export function HomeWorkSection() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

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
        <div className="workModalBackdrop" role="dialog" aria-modal="true" aria-label={`${activeEntry.title} details`}>
          <div className="workModalCard">
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
                {activeEntry.location ? <span>{activeEntry.location}</span> : null}
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

              <section className="workModalSection">
                <h4>Links</h4>
                {activeEntry.links?.length ? (
                  <div className="projectPageLinkRow">
                    {activeEntry.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p>Add links here later.</p>
                )}
              </section>

              <section className="workModalSection">
                <h4>Attachments</h4>
                <div className="workAttachmentList">
                  {(activeEntry.attachments ?? ["Add attachments here later."]).map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
