import type { Metadata } from "next";
import Link from "next/link";
import { InlineMath } from "react-katex";
import { BlogCodeLink } from "../../blog-code-link";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogMathAnchorLink } from "../../blog-math-anchor-link";
import { BlogImageToggle } from "../../blog-image-toggle";
import { BlogMathPopup } from "../../blog-math-popup";
import { PStrong } from "../../blog-strong-heading";
import { BlogViewCount } from "../../blog-view-count";
import { HarrisSurfaceDemo } from "../../harris-surface-demo";
import { HarrisResponseTable } from "../../harris-response-table";
import { SiteShell } from "../../components";
import { PaintLink } from "../../paint-link";
import { CodeBlock } from "../../code-block";
import { CodeOutputBlock } from "../../code-output-block";

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
          <span className="blogPostDateReveal" tabIndex={0}>
            <span className="blogPostDate">Mar 26, 2026</span>
            <span className="blogPostDateHover">Last updated: Mar 26, 2026</span>
          </span>
          <BlogCodeLink href="https://github.com/aryanj112/computer-vision/blob/main/notebooks/harris-corner-detection.ipynb" />
          <BlogViewCount slug="harris-corner-detection" />
        </div>
        <div className="blogReadingRow">
          <span className="blogReadingLabel">Prerequisite</span>
          <Link href="/blog/canny-edge-detection" className="blogReadingButton">
            Understanding edges: Canny Edge Detector
          </Link>
        </div>
        <p>
          Hey everyone! In this blog we are going to be delving into the Harris Corner Detection algorithm. Before we dive into this
          I really recommend reading the article about Canny edge detection as some of the concepts bleed into this blog. With that said
          let's dive into it!
        </p>
        <p>
          So as you can tell from the title of this post we are looking at an algorithm that can detect corners in an image. This is
          useful because when we want to start tracking features in a video the features we use to track are corners. The reason we use
          corners as opposed to edges will become clear very soon.
        </p>

        <p>
          Take a look at this image. There are three separate patches of pixels displayed here each of a different type: patch, edge,
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
          will prove to be pivotal in tracking features. As we discussed in the previous blog, tracking features has limitless possibilities.
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
          <strong> difference in intensity when we move by a factor of u and v</strong>. If we take that singular value we can plot it on a coordinate
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
          So we have established that we want to track corners, the question now becomes how can we use this auto-correlation function
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

        <div id="taylor-expansion">
        <p>
          We saw in the last blog post that finding the derivatives of the intensity in the x and y direction were very easy. With
          this tool in our bag we can now look at approximating this term with a Taylor expansion: I(x+u, y+v). If you don't know what
          a Taylor expansion is watch
          <PaintLink href="https://www.youtube.com/watch?v=3d6DsjIBzJ4">this video</PaintLink>
          and if you don't have a solid understanding of calculus just know that we can approximate I(x+u, y+v) for small changes
          in u and v using a Taylor expansion. <strong>With that said we can approximate </strong>
          <InlineMath math={"I(x+u, y+v) \\approx I(x,y) + uI_x(x,y) + vI_y(x,y)"} />
        </p>
        </div>

        <video className="blogInlineVideo" controls>
          <source src="/blog/harris-corner-detection/autocorrelation.mp4" type="video/mp4" />
        </video>
        <p>
          Ok, now I want you to build some intuition for the auto-correlation in a geometric view. So, for starters, what does the function output?
          We are computing the difference of the two regions and squaring them, so from a conceptual standpoint we are determining the difference.
          Two similar patches have a small auto-correlation value, and two different pixel windows have a large value. So if we have a patch, then if
          we move the window anywhere, chances are that it will not result in a large shift. If we have a corner, chances are if we move the window around
          and compute the difference, there will be a large difference. Now we have to start thinking about the auto-correlation function like a 3D parabola.
          The x and y values are the u and v values, and the z is the actual function output. So any point is the difference between the original window
          and the window we get when we shift by those specific u and v values.
          <strong>If we have a corner, then a small change results in a large change.</strong>
          That means that the parabola is very steep, so a small change jumps us up a lot. A patch would be the exact opposite, where only large changes result
          in changes. Small changes would not increase the auto-correlation output that much. Edges find themselves in the middle, where
          <strong> a small change in either the x or y direction would result in a large auto-correlation function output. </strong>
          If we take a top-down view of this parabola, ignoring the z axis, we can see that tight small circles represent corners, whereas ovals
          are indicative of edges and large circles represent patches. Now, a final note is that the M matrix from the video is what actually determines this shape,
          so if we make it a diagonal matrix (values on the top-left to bottom-right diagonal, but zeros everywhere else), then the eigenvalues (values on the diagonal) can tell
          us if it is a corner, edge, or patch, as shown by the λ view panel.
        </p>

        <HarrisSurfaceDemo />

        <p>
          We now have the equation and the formula and can start implementing. The only things that I will preface is that
          we have a box summation above but instead we will implement a guassian summation of the values in the window (the reason
          is related to signle processesing which I may make a blog about later). Finally, after we apply the equation to the image
          we then need to do a NMS to localize the corners (look at the previous blog for why we need to do that and how it works).
        </p>

        <p>
          We first need the
          {" "}<InlineMath math={"I_x"} />{" "}
          and the
          {" "}<InlineMath math={"I_y"} />{" "}
          values then we can calculate the M matrix.
        </p>

        <BlogImageLightbox
          src="/blog/harris-corner-detection/ix_iy.png"
          alt="Ix and Iy visualizations"
          width={1200}
          height={900}
        />


        <CodeBlock
          code={`# Recall the first step is performing a Gaussian Blur (recall from last blog)
smooth_window_size = 7
blur = cv2.GaussianBlur(gray_img, (smooth_window_size, smooth_window_size), 0)

# We can now create a Kernal and pass it through the image
kernel = np.array([-1, 0, 1], dtype=np.float32) / 2.0
Ix = ndimage.convolve1d(blur, kernel, axis=1, mode='reflect', output=np.float32)
Iy = ndimage.convolve1d(blur, kernel, axis=0, mode='reflect', output=np.float32)
`}
          language="python"
        />

        <p> Now we compute the values needed for the M matrix</p>

        <BlogImageLightbox
          src="/blog/harris-corner-detection/ix2_iy2_ixy.png"
          alt="Ix squared, Iy squared, and Ixy visualizations"
          width={1200}
          height={900}
        />

        <CodeBlock
          code={`# Now we want to compute the values needed for the M matrix
Ix2 = np.square(Ix)
Iy2 = np.square(Iy)
Ixy = Ix * Iy`}
          language="python"
        />

        <p>
          Now blur so that we can do the summation part of the M matrix (the gaussian blur does a weighted summation based on the
          guassian distribution)
        </p>

        <BlogImageLightbox
          src="/blog/harris-corner-detection/blurred_ix2_iy2_ixy.png"
          alt="Blurred Ix squared, Iy squared, and Ixy visualizations"
          width={1200}
          height={900}
        />

        <CodeBlock
          code={`# Blur the resultants with a Gaussian blur which provides us the weighted summations 
# for each window
smooth_window_size = 7
G_Ix2 = cv2.GaussianBlur(Ix2, (smooth_window_size, smooth_window_size), 0)
G_Iy2 = cv2.GaussianBlur(Iy2, (smooth_window_size, smooth_window_size), 0)
G_Ixy = cv2.GaussianBlur(Ixy, (smooth_window_size, smooth_window_size), 0)`}
          language="python"
        />
        <p>
          These three images tell us at each pixel location how much a shift in x and y changes the patch. Now how can we use that
          to tell us where there are corners. We can use those values to assign a cornerness score to each pixel. There are two ways
          I want to discuss how to do that.
        </p>

        <PStrong>Shi-Tomasi Corner Detection:</PStrong>
        <p>
          In this method, as we talked about eariler we can use the Eigenvalues to determine if a pixel is likely to be a corner.
          The trick is that we need two large Eigenvalues so in this method we take the M matrix for each pixel and computer the Eigenvalues
          of that matrix. We then look to see if the minimum between those two is above a certain threshold. If it is then BOOM we found a corner.
          Why this works is because if the smallest Eigenvalue is larger then a threshold then both of the values are sufficiently large.
        </p>

        <PStrong>Harris-Stephens Corner Detection:</PStrong>
        <p>
          It turns out however that calculating the Eigenvalues a couple thousand times is not efficient. Instead we can use this formula
          <InlineMath math={" R = \\det(M) - \\alpha\\,\\mathrm{trace}(M)^2 "} />
          which serves as a good approximation to the Shi-Tomasi Corner Detection (note that a lot of times we are using
          approximations in computer vision).
        </p>

        <HarrisResponseTable />

        <p>Let's take a look at the code!</p>
        <CodeBlock
          code={`alpha = 0.04
det = (G_Ix2 * G_Iy2) - np.square(G_Ixy)
trace = G_Ix2 + G_Iy2
R = det - alpha * np.square(trace)`}
          language="python"
        />
        <p>We now apply a NMS and threshold for the strong values.</p>
        <CodeOutputBlock
          code={`# NMS (look at the prev blog to see it done from scratch)
nms_window_size = 7 # size of 7 chosen empirically
max_filter = ndimage.maximum_filter(R, size = nms_window_size)

# This threshold is the value that we need to be larger than to get a corner
threshold = 0.01 * np.max(R)
mask = (R > threshold) & (R >= max_filter) & (R > 0)
print("Threshold:", threshold)
print(mask)`}
          output={`Threshold: 2.5500000000000003
[[False False False ... False False False]
 [False False False ... False False False]
 [False False False ... False False False]
 ...
 [False False False ... False False False]
 [ True  True False ... False False  True]
 [ True  True False ... False False  True]]`}
          language="python"
        />
        <p>Now simply apply the mask</p>

        <CodeBlock
          code={`y_vals, x_vals = np.where(mask)
key_pts = np.column_stack((x_vals,y_vals))`}
          language="python"
        />

        <p> Here is the final result! </p>

        <BlogImageLightbox
          src="/blog/harris-corner-detection/final.png"
          alt="Final Harris corner detection result"
          width={1200}
          height={900}
        />

        <div className="blogReadingRow">
          <span className="blogReadingLabel">Next reading</span>
          <Link href="/blog/lucas-kanade-corner-tracking" className="blogReadingButton">
            Understanding tracking: Lucas-Kanade Corner Tracking
          </Link>
        </div>


      </section>
    </SiteShell>
  );
}
