"use client";

import { useRef } from "react";
import type { DetailEntry } from "./site-data";

export function HomeProjectCarousel({ projects }: { projects: DetailEntry[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    const container = scrollerRef.current;

    if (!container) {
      return;
    }

    const amount = Math.min(container.clientWidth * 0.9, 380);
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="projectCarouselSection">
      <div className="sectionHeaderRow">
        <h2 className="sectionSubhead">Projects</h2>
        <div className="carouselControls" aria-label="Project carousel controls">
          <button type="button" className="carouselButton" onClick={() => scrollCarousel("left")}>
            Left
          </button>
          <button type="button" className="carouselButton" onClick={() => scrollCarousel("right")}>
            Right
          </button>
        </div>
      </div>
      <div className="projectCarousel" ref={scrollerRef}>
        {projects.map((project, index) => (
          <details
            className="projectCard"
            key={project.slug}
            style={{ ["--project-rotation" as string]: index % 2 === 0 ? "-2.6deg" : "2.6deg" }}
          >
            <summary className="projectCardSummary">
              <div className="projectCardTop">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                </div>
                <span>{project.period}</span>
              </div>
              <div className="projectTechRow">
                {(project.tags ?? []).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p className="projectCardDescription">{project.summary}</p>
            </summary>
            <div className="projectCardExpanded">
              {project.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
