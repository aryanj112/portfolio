"use client";

import { useState } from "react";

const learnMoreItems = [
  "cv2.GaussianBlur()",
  "np.array()",
  "ndimage.convolve1d()",
] as const;

export function BlogLearnMore() {
  const [activeItem, setActiveItem] = useState<(typeof learnMoreItems)[number] | null>(null);

  return (
    <>
      <div className="blogLearnMore">
        <span className="blogLearnMoreLabel">Learn more:</span>
        <div className="blogLearnMoreButtons">
          {learnMoreItems.map((item) => (
            <button key={item} type="button" className="blogLearnMoreButton" onClick={() => setActiveItem(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {activeItem ? (
        <div className="workModalBackdrop" role="dialog" aria-modal="true" onClick={() => setActiveItem(null)}>
          <div className="workModalCard" onClick={(event) => event.stopPropagation()}>
            <div className="workModalTop">
              <div>
                <h3>{activeItem}</h3>
                <p>coming soon 👀</p>
              </div>
              <button type="button" className="resumeCloseButton" onClick={() => setActiveItem(null)}>
                Close
              </button>
            </div>
            <div className="workModalBody">
              <section className="workModalSection">
                <h4>Notes</h4>
                <p>coming soon 👀</p>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
