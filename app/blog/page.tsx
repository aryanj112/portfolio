import Link from "next/link";
import { SiteShell } from "../components";

export default function BlogPage() {
  return (
    <SiteShell
      title="Blog ⚙️"
      intro="I love learning new things, and even more than that, sharing them with others. I hope some of this is useful :)"
    >
      <section className="storySection blogLandingSection">
        <h2 className="sectionSubhead">Computer Vision</h2>
        <div className="rule" aria-hidden="true" />
        <div className="blogCardGrid">
          <Link href="/blog/canny-edge-detection" className="blogCard blogCardLink">
            <h3>Understanding edges: Canny Edge Detector</h3>
            <p>
              Mar 17, 2026
              <span className="blogCardUpdate">Last updated: Mar 23, 2026</span>
            </p>
          </Link>
          <Link href="/blog/harris-corner-detection?post=harris-corner-detection" className="blogCard blogCardLink">
            <h3>Understanding corners: Harris Corner Detection</h3>
            <p>
              Mar 26, 2026
              <span className="blogCardUpdate">Last updated: Mar 26, 2026</span>
            </p>
          </Link>
          <Link href="/blog/lucas-kanade-corner-tracking" className="blogCard blogCardLink">
            <h3>Understanding tracking: Lucas-Kanade Corner Tracking</h3>
            <p>
              Coming soon 👀
              <span className="blogCardUpdate">Last updated: 👀</span>
            </p>
          </Link>
        </div>
      </section>

      <section className="storySection blogLandingSection">
        <h2 className="sectionSubhead">Linux</h2>
        <div className="rule" aria-hidden="true" />
        <div className="blogCardGrid">
          <Link href="/blog/linux-basics" className="blogCard blogCardLink">
            <h3>Linux Basics</h3>
            <p>
              Mar 25, 2026
              <span className="blogCardUpdate">Last updated: Mar 25, 2026</span>
            </p>
          </Link>
          <Link href="/blog/linux-processes" className="blogCard blogCardLink">
            <h3>Linux Processes</h3>
            <p>
              Mar 29, 2026
              <span className="blogCardUpdate">Last updated: Mar 29, 2026</span>
            </p>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
