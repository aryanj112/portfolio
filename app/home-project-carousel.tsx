"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import type { DetailEntry } from "./site-data";

export function HomeProjectCarousel({ projects }: { projects: DetailEntry[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  const activeProject = projects[activeIndex];

  return (
    <section className="projectCarouselSection">
      <div className="sectionHeaderRow">
        <h2 className="sectionSubhead">Projects</h2>
        <div className="carouselControls" aria-label="Project carousel controls">
          <button type="button" className="carouselButton" onClick={goToPrevious}>
            Left
          </button>
          <button type="button" className="carouselButton" onClick={goToNext}>
            Right
          </button>
        </div>
      </div>

      <div className="projectCarouselStage" aria-live="polite">
        {projects.map((project, index) => {
          const offset = index - activeIndex;
          const wrappedOffset =
            offset > projects.length / 2
              ? offset - projects.length
              : offset < -projects.length / 2
                ? offset + projects.length
                : offset;
          const clampedOffset = Math.max(-3, Math.min(3, wrappedOffset));

          return (
            <details
              className="projectStageCard"
              key={project.slug}
              open={index === activeIndex}
              style={
                {
                  ["--project-offset" as string]: clampedOffset,
                  ["--project-tilt" as string]: `${clampedOffset * 3.5}deg`,
                  ["--project-depth" as string]: `${Math.abs(clampedOffset)}`,
                } as CSSProperties
              }
            >
              <summary
                className="projectStageSummary"
                onClick={(event) => {
                  event.preventDefault();
                  goToIndex(index);
                }}
              >
                <div className="projectCardTop">
                  <div>
                    <h3>{project.title}</h3>
                    {project.subtitle ? <p>{project.subtitle}</p> : null}
                  </div>
                  <span>{project.period}</span>
                </div>
                {project.tags?.length ? (
                  <div className="techStackRow">
                    <span className="techStackEmoji" aria-hidden="true">
                      💻
                    </span>
                    <div className="projectTechRow">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {project.links?.length ? (
                  <div className="projectLinkRow">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                <p className="projectCardDescription">{project.summary}</p>
              </summary>
              <div className="projectStageExpanded">
                {project.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      <div className="projectCarouselMeta">
        <div className="projectCarouselTitle">{activeProject.title}</div>
        <div className="projectCarouselSlider" aria-label="Project selector">
          <div className="projectCarouselTrack" aria-hidden="true" />
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className={`projectCarouselDot ${index === activeIndex ? "isActive" : ""}`}
              aria-label={`View ${project.title}`}
              aria-pressed={index === activeIndex}
              style={
                {
                  ["--dot-position" as string]: `${(index / Math.max(projects.length - 1, 1)) * 100}%`,
                } as CSSProperties
              }
              onClick={() => goToIndex(index)}
            />
          ))}
        </div>
        <div className="projectCarouselCount">
          {activeIndex + 1} of {projects.length}
        </div>
      </div>
    </section>
  );
}
