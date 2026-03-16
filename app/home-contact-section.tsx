"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "./site-data";

export function HomeContactSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isRollSpinning, setIsRollSpinning] = useState(false);

  return (
    <>
      <section className="contactHomeSection" id="contact">
        <h2 className="sectionSubhead">Contact</h2>
        <div className="contactHomeGrid">
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
                <a href={profile.resume}>
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
          <button
            type="button"
            className={`footerRoll ${isRollSpinning ? "isSpinning" : ""}`}
            onClick={() => {
              setIsRollSpinning(false);
              window.requestAnimationFrame(() => setIsRollSpinning(true));
              window.setTimeout(() => setIsRollSpinning(false), 1200);
            }}
          >
            ROLL 🐢
          </button>
        </div>
      </footer>
    </>
  );
}
