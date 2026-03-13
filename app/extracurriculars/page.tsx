import Image from "next/image";
import { SiteShell } from "../components";
import { extracurriculars } from "../site-data";

export default function ExtracurricularsPage() {
  return (
    <SiteShell title="Extracurriculars">
      <section className="workAccordionSection">
        <h2 className="sectionSubhead">Outside the classroom</h2>
        <div className="rule" aria-hidden="true" />
        <div className="workAccordionList">
          {extracurriculars.map((item) => (
            <details className="workAccordionItem" id={item.slug} key={item.slug}>
              <summary className="extracurricularPageSummary">
                <div className="extracurricularBadge" aria-hidden="true">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? ""}
                      width={60}
                      height={60}
                      className={`extracurricularBadgeImage ${
                        item.slug === "project-lift-campus-initiative" ? "extracurricularBadgeImageRounded" : ""
                      }`}
                    />
                  ) : (
                    item.title
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                  )}
                </div>
                <div className="workAccordionHeader">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                <div className="workAccordionMeta">
                  <span>{item.period}</span>
                </div>
              </summary>
              <div className="workAccordionContent">
                <p className="workAccordionIntro">{item.summary}</p>
                <div className="tagRow">
                  {item.tags?.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="workAccordionBody">
                  {item.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
