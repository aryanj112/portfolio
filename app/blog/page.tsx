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
          <Link href="/blog/harris-corner-detection" className="blogCard blogCardLink">
            <h3>Understanding Edge and Corner Features: Harris Corner Detection</h3>
            <p>Mar 16, 2026</p>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
