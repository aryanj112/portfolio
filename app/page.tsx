import Image from "next/image";
import Link from "next/link";
import { SectionList, SiteShell } from "./components";
import { HomeProjectCarousel } from "./home-project-carousel";
import { extracurriculars, profile, projects, workTimeline } from "./site-data";

export default function Home() {
  return (
    <SiteShell>
      <section className="heroBlock">
        <h1>{profile.name}</h1>
        <div className="aboutBlock">
          <div className="aboutHeaderRow">
            <h2>About me</h2>
          </div>
          <div className="aboutSentenceBlock">
            <p>
              I am a {profile.major} major with minors in {profile.minors} at{" "}
              <a href={profile.schoolUrl} target="_blank" rel="noreferrer">
                {profile.schoolShort} 🐢
              </a>
              {" "}
              <Link href="/coursework" className="paintLink">
                (coursework)
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="rule" aria-hidden="true" />
        <div className="singleCopyBlock">
          <h2 className="sectionSubhead">My mission</h2>
          <p>{profile.careerInterests}</p>
        </div>
      </section>

      <div className="homeDivider rule" aria-hidden="true" />
      <section className="timelineSection homeSection">
        <h2 className="sectionSubhead">Work experience</h2>
        <div className="workTimeline">
          {workTimeline.map((item, index) => (
            <Link href={item.href} className="timelineCard" key={item.company}>
              <div className="timelineLogo">
                <Image
                  src={item.logoSrc}
                  alt={item.logoAlt}
                  width={72}
                  height={72}
                  className="timelineLogoImage"
                />
              </div>
              {index < workTimeline.length - 1 ? <div className="timelineConnector" aria-hidden="true" /> : null}
              <div className="timelineCopy">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
                <span>{item.period}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="homeDivider rule" aria-hidden="true" />
      <div className="homeSection">
        <HomeProjectCarousel projects={projects} />
      </div>
      <div className="homeDivider rule" aria-hidden="true" />
      <div className="homeSection">
        <section className="extracurricularSection">
          <h2 className="sectionSubhead">Extracurriculars</h2>
          <div className="extracurricularList">
            {extracurriculars.map((item) => (
              <details className="extracurricularItem" key={item.slug}>
                <summary className="extracurricularSummary">
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
                  <div className="extracurricularCopy">
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                </summary>
                <div className="extracurricularExpanded">
                  {item.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
