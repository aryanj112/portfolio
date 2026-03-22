import type { Metadata } from "next";
import Link from "next/link";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogMathAnchorLink } from "../../blog-math-anchor-link";
import { BlogImageToggle } from "../../blog-image-toggle";
import { BlogMathPopup } from "../../blog-math-popup";
import { BlogViewCount } from "../../blog-view-count";
import { SiteShell } from "../../components";

export const metadata: Metadata = {
  title: "Understanding corners: Harris Corner Detection",
};

export default function HarrisCornersPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>Understanding corners: Harris Corner Detection</h1>
        <div className="blogPostMetaRow">
          <p className="blogByline">By: Aryan Jain</p>
          <a
            href="https://github.com/aryanj112/computer-vision/blob/main/notebooks/harris-corner-detection.ipynb"
            className="blogCodeLink"
            target="_blank"
            rel="noreferrer"
            aria-label="View code for this post"
          >
            <span className="blogCodeLinkIcon" aria-hidden="true">
              {"</>"}
            </span>
            <span>Code</span>
          </a>
          <BlogViewCount slug="harris-corner-detection" />
        </div>
        <div className="blogReadingRow">
          <span className="blogReadingLabel">Prerequisite</span>
          <Link href="/blog/canny-edge-detection" className="blogReadingButton">
            Understanding edges: Canny Edge Detector
          </Link>
        </div>
        <p>
          Hey everyone! In this blog we are going to be delving into the Harris Corner Detection algoirthm. Before we dive into this
          I really recommend reading the article about canny edge detection as some of the concepts bleed into this blog. With that said
          lets dive into it!
        </p>
        <p>
          So as you can tell from the title of this post we are looking at an algoirthm that can detect corners in an image. This is
          useful because when we want to start tracking features in a video the feature we use to track are corners. The reason we use
          corners as opposed to edges will become clear very soon.
        </p>

        <p>
          Take a look at this image. There are three seperate patches of pixels displayed here each of a different type: patch, edge,
          or corner.
        </p>

        <BlogImageToggle
          colorSrc="/blog/harris-corner-detection/color_patch_edge_corner.png"
          graySrc="/blog/harris-corner-detection/gray_patch_edge_corner.png"
          colorAlt="Color comparison of patch, edge, and corner"
          grayAlt="Grayscale comparison of patch, edge, and corner"
          width={1200}
          height={900}
        />

        <p>
          Now, these are the same patches, each moved around a little bit. What we see is that, among these three, the patch is nearly
          impossible to notice changes in, the edge is a little bit easier, and the corner is very easy to tell. Based on some of the math
          in this post and the intuition you have just gained, we see that corners are very easy to track and because of that they
          will prove to be pivotal in tracking features. As we discussed in the previous blog, tracking features has limitless possibilites.
        </p>

        <BlogImageToggle
          colorSrc="/blog/harris-corner-detection/color_shifted_patch_edge_corner.png"
          graySrc="/blog/harris-corner-detection/gray_shifted_patch_edge_corner.png"
          colorAlt="Color comparison of shifted patch, edge, and corner"
          grayAlt="Grayscale comparison of shifted patch, edge, and corner"
          width={1200}
          height={900}
        />

        <p>Now I want to take a look at some handwritten notes I had. Say we take the blue and green image and take an arbitrary
          window and shift that window by a factor of u and v (as we just did). Now if we take the difference of the two windows
          (subtracting the intensity values for corresponding pixels aka the change in intensity of the two windows) we now have the
          <strong> difference in intensity when we move by a factor of u and v</strong>. If take that singular value we can plot it on a coordinate
          grid marked by u and v (as shown below).</p>

        <BlogImageLightbox
          src="/blog/harris-corner-detection/goodnotes_shift.png"
          alt="GoodNotes shifted patch diagram"
          width={1200}
          height={900}
        />

        <p>
          This is the basis for the <strong>auto-correlation function</strong> also known as the SSD error function.
          This function <strong>measures how much a window of pixels in an image changes when shifted by (u,v)</strong>.
          Let's now take a look at our original three windows' auto-correlation function (notated with the character E)
        </p>

        <BlogImageLightbox
          src="/blog/harris-corner-detection/autocorrelation_surfaces.png"
          alt="Autocorrelation surfaces for patch, edge, and corner"
          width={1200}
          height={900}
        />

        <BlogMathPopup
          anchorId="autocorrelation-equation"
          label="Auto-correlation equation"
          math={"E(u,v) = \\sum_{x,y} \\left[I(x+u, y+v) - I(x,y)\\right]^2"}
          items={[
            { symbol: "E(u,v)", meaning: "the auto-correlation or SSD error after shifting by (u,v)" },
            { symbol: "I(x,y)", meaning: "the pixel intensity at location (x,y)" },
            { symbol: "I(x+u, y+v)", meaning: "the shifted pixel intensity" },
            { symbol: "(u,v)", meaning: "the amount we shift the window in the x and y directions" },
            { symbol: "\\sum_{x,y}", meaning: "sum this difference over all pixels in the window" },
          ]}
        />

        <p>
          So we have established that we want to track corners, the question now becomes how can we use this Auto-Correlation function
          to do so. We want to see <strong>high values</strong> (meaning there is a large pixel change so it is either an edge or corner)
          <strong> AND</strong> we want to see that the change in pixel intensity is happening in the
          <strong> left and right direction</strong>. This will tell us that we have a corner and not a patch or edge.
        </p>
        <i> Think about why that is the case and really let this intuition sink in because we will need it later! </i>
        <p>
          As a lot of time in computer vision, this solution is not efficient. It turns out that if we calculate the auto-correlation
          function for every pixel at some arbitrary window and step size it is <strong>VERY INEFFICIENT</strong>. We have to instead
          find some sort of an approximation for the{" "}
          <BlogMathAnchorLink anchorId="autocorrelation-equation">
            auto-correlation function
          </BlogMathAnchorLink>
          .
        </p>
      </section>
    </SiteShell>
  );
}
