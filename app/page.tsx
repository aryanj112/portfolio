import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "./components";
import { HomeContactSection } from "./home-contact-section";
import { HomeProjectCarousel } from "./home-project-carousel";
import { HomeWorkSection } from "./home-work-section";
import { extracurriculars, profile, projects } from "./site-data";

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
      <HomeWorkSection />
      <div className="homeDivider rule" aria-hidden="true" />
      <div className="homeSection" id="projects">
        <HomeProjectCarousel projects={projects} />
      </div>
      <div className="homeDivider rule" aria-hidden="true" />
      <div className="homeSection" id="extracurriculars">
        <section className="extracurricularSection">
          <h2 className="sectionSubhead">Extracurriculars</h2>
          <div className="extracurricularList">
            {extracurriculars.map((item) => (
              <div className="extracurricularItem extracurricularStaticItem" key={item.slug}>
                <div className="extracurricularSummary extracurricularStaticSummary">
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
                    <div className="extracurricularTitleRow">
                      <h3>{item.title}</h3>
                      {item.links?.[0] ? (
                        <a href={item.links[0].href} target="_blank" rel="noreferrer" className="inlineActivityLink">
                          {item.links[0].label}
                        </a>
                      ) : null}
                    </div>
                    <p>{item.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="homeDivider rule" aria-hidden="true" />
      <div className="homeSection">
        <HomeContactSection />
      </div>
    </SiteShell>
  );
}
