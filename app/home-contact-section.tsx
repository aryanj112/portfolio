"use client";

import { useState } from "react";
import { profile } from "./site-data";

export function HomeContactSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <section className="contactHomeSection" id="contact">
        <h2 className="sectionSubhead">Contact</h2>
        <div className="contactHomeGrid">
          <div className="contactHomeCopy">
            <p>
              Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedin}
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.github}
              </a>
            </p>
          </div>
          <div className="contactHomeActions">
            <button type="button" className="resumePopupButton" onClick={() => setIsResumeOpen(true)}>
              Open resume PDF
            </button>
          </div>
        </div>
      </section>

      {isResumeOpen ? (
        <div className="resumeModalBackdrop" role="dialog" aria-modal="true" aria-label="Resume PDF viewer">
          <div className="resumeModalCard">
            <div className="resumeModalTop">
              <h3>Resume</h3>
              <div className="resumeModalActions">
                <a href={profile.resume} target="_blank" rel="noreferrer">
                  Open in new tab
                </a>
                <button type="button" className="resumeCloseButton" onClick={() => setIsResumeOpen(false)}>
                  Close
                </button>
              </div>
            </div>
            <iframe className="resumeModalFrame" src={profile.resume} title="Aryan Jain resume" />
          </div>
        </div>
      ) : null}

      <footer className="siteFooter">
        <div className="rule" aria-hidden="true" />
        <div className="footerInner">
          <p>{profile.email}</p>
          <p>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              {profile.linkedin}
            </a>
          </p>
          <p>
            <a href={profile.github} target="_blank" rel="noreferrer">
              {profile.github}
            </a>
          </p>
          <p>This was made with ROLL 🐢s</p>
        </div>
      </footer>
    </>
  );
}
