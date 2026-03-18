import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../../components";

export const metadata: Metadata = {
  title: "Understanding corners: Harris Corner Detection",
};

export default function HarrisCornersPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>Understanding corners: Harris Corner Detection</h1>
        <div className="blogReadingRow">
          <span className="blogReadingLabel">Prerequisite</span>
          <Link href="/blog/canny-edge-detection" className="blogReadingButton">
            Understanding edges: Canny Edge Detector
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
