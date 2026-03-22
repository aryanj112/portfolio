import type { Metadata } from "next";
import Link from "next/link";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogImageToggle } from "../../blog-image-toggle";
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
          difference in intensity when we move by a factor of u and v. If take that singular value we can plot it on a coordinate
          grid marked by u and v.</p>

        <BlogImageLightbox
          src="/blog/harris-corner-detection/goodnotes_shift.png"
          alt="GoodNotes shifted patch diagram"
          width={1200}
          height={900}
        />


      </section>
    </SiteShell>
  );
}
