import { SiteShell } from "../components";
import { projects } from "../site-data";

export default function ProjectsPage() {
  return (
    <SiteShell title="Projects">
      <section className="workAccordionSection">
        <h2 className="sectionSubhead">Selected projects</h2>
        <div className="rule" aria-hidden="true" />
        <div className="workAccordionList">
          {projects.map((item) => (
            <details className="workAccordionItem" id={item.slug} key={item.slug}>
              <summary className="workAccordionSummary">
                <div className="workAccordionHeader">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                <div className="workAccordionMeta">
                  <span>{item.period}</span>
                  {item.location ? <span>{item.location}</span> : null}
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
