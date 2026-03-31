import type { Metadata } from "next";
import Link from "next/link";
import { BlogMathPopup } from "../../blog-math-popup";
import { BlogViewCount } from "../../blog-view-count";
import { SiteShell } from "../../components";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { PaintLink } from "../../paint-link";
import { BlockMath } from "react-katex";
import { LucasKanadeLineDemo } from "../../lucas-kanade-line-demo";
import { BlogInlineRevealTerm } from "../../blog-inline-reveal-term";

export const metadata: Metadata = {
  title: "Understanding tracking: Lucas-Kanade Corner Tracking",
};

export default function LucasKanadeCornerTrackingPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>Understanding tracking: Lucas-Kanade Corner Tracking</h1>
        <div className="blogPostMetaRow">
          <p className="blogByline">By: Aryan Jain</p>
          <span className="blogPostDateReveal" tabIndex={0}>
            <span className="blogPostDate">Coming soon 👀</span>
            <span className="blogPostDateHover">Last updated: 👀</span>
          </span>
          <BlogViewCount slug="lucas-kanade-corner-tracking" />
        </div>
        <div className="blogReadingRow">
          <span className="blogReadingLabel">Prerequisite</span>
          <Link href="/blog/harris-corner-detection" className="blogReadingButton">
            Understanding corners: Harris Corner Detection
          </Link>
        </div>

        <p>
          Hey guys! Welcome to this blog post about the Lucas-Kanade corner tracking algorithm. In the last blog we learned how to
          track corners and in this post we will learn how to track them! Why do we need to track features? We need to track features
          for various reasons:
        </p>
        <ul>
          <li>Video Stabaization</li>
          <li>SLAM (how a robot knows where it is, think Roombas!)</li>
          <li>Object tracking</li>
          <li>
            If you want to make a workout app that sees how good your form is you would need to track key body features
            and compare them to a picture perfect form
          </li>
        </ul>

        <p>
          Everything in the past two blogs have been building methods so we can now finally dive into the amazing feature tracking
          algorithm designed by Bruce Lucas and Takeo Kanade in 1981!
        </p>

        <div className="rule" aria-hidden="true" />

        <BlogImageLightbox
          src="/blog/lucas-kanade-corner-tracking/initial_frames.png"
          alt="Initial two frames"
          width={1200}
          height={900}
        />

        <p>
          These are the two frames we are going to be looking at in this blog (we have more that we will test our algorithm on).
        </p>


        <BlogImageLightbox
          src="/blog/lucas-kanade-corner-tracking/zoomed_patch_with_points.png"
          alt="Zoomed in region of the two frames"
          width={1200}
          height={900}
        />

        <p>
          Now zooming into these two regions we are going to try to track this feature across the frames. When we track features
          across frames we need to make a couple of assumptions.
        </p>

        <ol>
          <li>
            Brightness constancy - we can assume that the brightness of a feature will stay the same or relatively
            close when that image is moved. By doing this we are able to get an equation like this:
            <BlogMathPopup
              label="Brightness constancy"
              math={"I(x,y,t) = I(x+u, y+v, t+1)"}
              items={[
                { symbol: "I(x,y,t)", meaning: "the pixel intensity at location (x,y) in frame t" },
                { symbol: "I(x+u, y+v, t+1)", meaning: "the same point after moving by (u,v) in the next frame" },
                { symbol: "(u,v)", meaning: "the small motion of the feature between frames" },
                { symbol: "t+1", meaning: "the next frame in the video" },
              ]}
            />
            This equation is pretty much just saying that the illumination (the I function) stays the same at an (x, y) location
            if we shift it by some (u,v) and increase the time in the video. This is more simply just saying that things in the
            physical world will stay relatively the same if you move it around a little bit (try to develop the intuition here).
          </li>
          <br />

          <li>
            Small motion - the next thing we will assume to track features using the algorithm is that the motion (u, v) is small.
            If we assume the motion is small we can now change that equation above using a Taylor expansion. Why can we do that?
            Well given a small enough change we can use the derivative of pixel intensity (I) at (x, y) to take the (u, v) values
            out of the intensity function. We do that since we don't actually know what the (u, v) values are so we can now solve for
            them with this new equation. If you need a refresher on Taylor expansion, check out
            <PaintLink href="/blog/harris-corner-detection#taylor-expansion">the Harris corner detection blog</PaintLink>.
            <BlogMathPopup
              label="Taylor-expanded brightness constancy"
              math={"I(x,y,t) = I(x,y,t) + uI_x + vI_y + I_t"}
              items={[
                { symbol: "I(x,y,t)", meaning: "the original pixel intensity at location (x,y) in the current frame" },
                { symbol: "uI_x", meaning: "how much the intensity changes because the point moves in the x direction" },
                { symbol: "vI_y", meaning: "how much the intensity changes because the point moves in the y direction" },
                { symbol: "I_t", meaning: "the change in intensity over time itself, which appears because we are moving from one frame to the next" },
                { symbol: "u,v", meaning: "the small motion we are trying to solve for" },
              ]}
            />
            Now this equation is a lot easier to work:
            <BlockMath math={"I(x,y,t) = I(x,y,t) + uI_x + vI_y + I_t"} />
            <BlockMath math={"0 = uI_x + vI_y + I_t"} />
            <BlockMath math={"-I_t = uI_x + vI_y"} />

            If you look closely this is an equation for a line. Use this interactive diagram to look at what possible values of
            (u, v) could satisfy the line (for some chosen Ix, Iy, and It).

            <LucasKanadeLineDemo />

            As shown by this diagram, many (u, v) values can work for this equation and now the issue is we don't know which one is
            correct. How can we solve this? The reason we have this issue is because we have one equation and two unknowns. If you
            have taken linear algebra tha obvious answer is to get more equations and now we can solve a system of linear equations.
            The last assumption is how we solve this problem.
          </li>
          <br />
          <li>
            Spacial Coherence - This is the idea that pixels that are near each other tend to move together. If you think about it
            this makes a lot of sense. If you are tracking the corner of your iPhone, chances are if you move your phone the camera moves
            along with it.

            <BlogImageLightbox
              src="/blog/lucas-kanade-corner-tracking/zoomed_patch_grid_points.png"
              alt="Zoomed in grid region of the two frames"
              width={1200}
              height={900}
            />

            This is how the math looks like with this and now we are able to solve this
            <BlogInlineRevealTerm
              term="overdetermined system."
              reveal="An overdetermined system in linear algebra occurs when a system has more equations (m) than variables (n), 
            usually resulting in no exact solution. These systems are often inconsistent because the additional constraints 
            ontradict each other, but they can be solved for a best fit using least squares approximation."
              placement="above"
            />

            <BlogMathPopup
              label="Many pixels give many equations"
              math={String.raw`
\begin{aligned}
uI_x^{(1)} + vI_y^{(1)} &= -I_t^{(1)} \\
uI_x^{(2)} + vI_y^{(2)} &= -I_t^{(2)} \\
\vdots \\
uI_x^{(N)} + vI_y^{(N)} &= -I_t^{(N)}
\end{aligned}
`}
              items={[
                { symbol: "u, v", meaning: "the single motion we want to solve for" },
                { symbol: "I_x^{(i)}", meaning: "the x-direction intensity derivative at pixel i" },
                { symbol: "I_y^{(i)}", meaning: "the y-direction intensity derivative at pixel i" },
                { symbol: "I_t^{(i)}", meaning: "the change in intensity over time at pixel i" },
                { symbol: "i = 1,2,\\dots,N", meaning: "each tracked pixel gives us one equation" },
                { symbol: "N", meaning: "the number of pixels in the local window" },
              ]}
            />

            Now that we understand this we can transition it into a matrix (remember that linear algebra is a prereq for most
            things ML).

            <BlockMath
              math={String.raw`
\left[
\begin{array}{cc}
I_x^{(1)} & I_y^{(1)} \\
I_x^{(2)} & I_y^{(2)} \\
\multicolumn{2}{c}{\vdots} \\
I_x^{(N)} & I_y^{(N)}
\end{array}
\right]
\left[
\begin{array}{c}
u \\
v
\end{array}
\right]
=
-
\left[
\begin{array}{c}
I_t^{(1)} \\
I_t^{(2)} \\
\vdots \\
I_t^{(N)}
\end{array}
\right]
`}
            />
            <BlockMath math={"Ad = b"} />
          </li>
        </ol>



      </section>
    </SiteShell>
  );
}
