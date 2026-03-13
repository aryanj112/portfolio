import Image from "next/image";
import { SiteShell } from "../components";
import { profile } from "../site-data";

export default function ContactPage() {
  return (
    <SiteShell title="Contact">
      <section className="contactSection">
        <h2 className="sectionSubhead">Reach out</h2>
        <div className="rule" aria-hidden="true" />
        <div className="contactIcons">
          <a href={`mailto:${profile.email}`} className="contactIconLink" aria-label="Email Aryan Jain">
            <Image src="/social/gmail.png" alt="" width={58} height={58} className="contactIconImage" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contactIconLink" aria-label="LinkedIn">
            <Image src="/social/linkedin.png" alt="" width={58} height={58} className="contactIconImage" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="contactIconLink" aria-label="GitHub">
            <Image src="/social/github.png" alt="" width={58} height={58} className="contactIconImage" />
          </a>
        </div>
      </section>

      <section className="resumeSection">
        <h2 className="sectionSubhead">Resume</h2>
        <div className="rule" aria-hidden="true" />
        <div className="resumeActions">
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Open PDF
          </a>
          <a href={profile.resume} download>
            Download resume
          </a>
        </div>
        <iframe className="resumeFrame" src={profile.resume} title="Aryan Jain resume" />
      </section>
    </SiteShell>
  );
}
