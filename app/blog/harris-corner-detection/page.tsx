import Link from "next/link";
import type { Metadata } from "next";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogLearnMore } from "../../blog-learn-more";
import { CodeBlock } from "../../code-block";
import { SiteShell } from "../../components";

export const metadata: Metadata = {
  title: "Understanding edges: Canny Edge Detector",
};

const pythonCode = `# Recall the first step is performing a Gaussian Blur
smooth_window_size = 7
blur = cv2.GaussianBlur(img, (smooth_window_size, smooth_window_size), 0)

# We can now create a Kernal and pass it through the image
kernel = np.array([-1, 0, 1], dtype=np.float32) / 2.0
Ix = ndimage.convolve1d(blur, kernel, axis=1, mode='constant')
Iy = ndimage.convolve1d(blur, kernel, axis=0, mode='constant')`;

export default function HarrisCornerDetectionPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>
          Understanding edges:
          <br />
          Canny Edge Detector
        </h1>
        <div className="blogPostMetaRow">
          <p className="blogByline">By: Aryan Jain</p>
          <a
            href="https://github.com/aryanj112/computer-vision/blob/main/notebooks/canny-edge-detection.ipynb"
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
        </div>
        <p>
          Hey! In this blog, I want to dive into what features (such as edges and corners) are and how we can detect edges in
          an image. In a later blog we will look at not only how to detect corners but also how to track them however understanding
          edges is the first step.
        </p>
        <p>
          For context as to why this is important, detecting corners is the first step in feature tracking which has
          millions of applications that range from video stabilization to self-driving cars all the way to AR/VR
          headsets like the Oculus Quest.
        </p>
        <p>I will be diving into the pivital algorithm John F. Canny designed all the way back in 1986: the Canny Edge Detector</p>
        <div className="rule" aria-hidden="true" />
        <p>
          Ok to start off, what even is an <strong>edge</strong>? An edge for our purposes (and generally described as) is a{" "}
          <strong>sharp contrast in pixel intensity</strong>. As shown in the two images below, the left is a regular patch of
          pixels whereas the right is an edge.
        </p>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/patch-vs-edge.png"
          alt="Comparison of a regular pixel patch and an edge"
          width={900}
          height={640}
        />
        <p>
          Given that edges are <strong> rapid changes in intensity </strong> if we look at the intesity values along a
          left to right strip of pixels we should find large changes where the edges are located.
        </p>
        <i>
          Now before we do that I want to preface that we will be gray scaling the image during this lesson. The reason for that
          (and I want you to internalize this) is because we <strong> only care about intensity!</strong>
        </i>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/intensity.png"
          alt="Intensity values along a line of pixels"
          width={900}
          height={640}
        />
        <p>
          If you look at the yellow star in both images it is clear that there is an edge there not just by looking at the
          image but also by looking at the change in pixel intensity on the right graph.
        </p>
        <p>
          I've been saying "change in intensity" a lot, hoping it would trigger the <strong> calculus side </strong> of your brain to start thinking about derivatives
          (if you don't know what derivatives are, watch{" "}
          <a href="https://www.youtube.com/watch?v=9vKqVkMQHKk" className="paintLink" target="_blank" rel="noreferrer">
            this video
          </a>{" "}
          or check out this{" "}
          <Link href="/blog" className="paintLink">
            blog post abt calc incoming 👀
          </Link>
          ). If we create a discrete derivative of the intensities,
          all we have to do is <strong> look for large derivatives. </strong>
        </p>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/gradient.png"
          alt="Derivative profile showing where intensity changes sharply"
          width={900}
          height={640}
        />

        <i>
          <br />
          Note that these are discrete derivatives, meaning that you take the pixel to the right and subtract it from the
          pixel on the left to get a deriative. For example, if three pixels have intensities [50, 60, 80], the derivative at the
          middle pixel would be (80 − 50) / 2 = (30) / 2 = 15. We are dividing by two because that is the true definite deriative formula.
        </i>

        <p>
          Now, most images aren't perfect and some tend to be on the grainier/noisier side. Here is what happens to our gradient
          after we add a little bit of gaussian noise.
        </p>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/noisy-gradient.png"
          alt="Noisy gradient example"
          width={900}
          height={640}
        />

        <p>
          The solution here is simply to use a Gaussian blur to elimiate the noise. Here is the gradient with a gaussian blur applied.
          It is important to note that we can apply the blur to the image and then take the derivative as well because it is a linear
          operation.
        </p>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/gaussian_gradient_smoothing.png"
          alt="Gaussian smoothing on a noisy gradient"
          width={900}
          height={640}
        />
        <p>
          Due to linearity we can simply take the derivative of the gaussian <strong>(DoG)</strong> w.r.t the x and y directions
          (this splitting of the filter is called a seperable filter which is computationally cheaper and mathematically equivelant).
          The <strong>(DoG)</strong> is able to <strong>reduce noise</strong> and do <strong>edge detection</strong> at the same time.
        </p>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/dog.png"
          alt="Dog example image"
          width={900}
          height={640}
        />

        <p>
          The <strong>(DoG)</strong> is the first of 3 step in the Canny Edge detection algorithm. After applying this filter we get back ∂I/∂x and ∂I/∂y (I is intensity so we are
          taking the partial derivative of intensity w.r.t the x direction as well the y). Also, you may hear "sobel filter" a lot when looking into the canny edge detector and that is another
          filter used to compute gradients, we did not use that here.
        </p>

        <CodeBlock code={pythonCode} lang="python" />
        <BlogLearnMore />
        <BlogImageLightbox
          src="/blog/canny-edge-detection/ix_iy.png"
          alt="Ix and Iy output images"
          width={900}
          height={640}
        />
        <i>
          <strong>NOTE:</strong> even though it says Ix is a horizontal gradient it measures vertical edges (Iy is a vertical gradient that
          measures horizontal edges). Spend some time thinking about this, why that makes sense, and trying to find that in the image.
        </i>

        <p>
          The next step is combining these images by squaring both of them, adding them, and then taking the square root. This is called the gradient magnitude,
          which allows us to amplify strong signals and get rid of weaker ones while also combining the x and y gradients (the reason
          this amplifies strong signals and weakens smaller ones is because a small value squared gets smaller while a large value
          squared gets larger).
        </p>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/gradient_magnitude.png"
          alt="Gradient magnitude output"
          width={900}
          height={640}
        />
        <CodeBlock code={`# We now can combine them and this will give us all the edges in the image
grad_mag = np.sqrt(np.square(Ix) + np.square(Iy))`} lang="python" />
        <p>
          Ok so now we have a filter that can help us find where edges are and is invariant to noise. But before we move on, I want to
          pose the 2 things we want in a good edge detector. These will help lead us to the next two steps of the algorithm
        </p>
        <ol>
          <li>Good detection of edges</li>
          <li>
            Good localization of edges. This means that if we have detected edges, we want to make sure that they are close to the
            actual ground truth edge.
          </li>
        </ol>
        <p>If you look closely at the gradient magnitude then you can see that the edges are pretty thick and in reality we only need
          one pixel to classify an edge. The technique we will use to get rid of this is <strong>Non-Max Suppresson (NHS) </strong>
        </p>

        <p>
          <strong>Non-Max Suppresson (NHS): </strong> the goal is to keep only the local maxima along a gradient direction. What does that mean?
          That means that if we have say a 45 degree edge and a bunch of pixels decribing that edge, we want to only keep the edges that
          have the <strong>largest</strong> signal.
        </p>

        <p>
          Lets dive into what I mean by gradient direction. So recall that a x gradient is measuring a vertical edge. If we go along the
          x gradient in a particular pixel patch and we keep only the maxima in a local region that means that we <strong>thinning out or shaving </strong>
          a vertical edge. I really want that to stick with you and why we are <strong>thinning out and shaving </strong> as opposed to erasing an edge.
        </p>
        <BlogImageLightbox
          src="/blog/canny-edge-detection/ix_thinning.png"
          alt="Ix thinning example"
          width={900}
          height={640}
        />
        <p>
          In this image, we can see how the x gradient is showing a vertical edge and by going along the axis of the gradient we can
          thin out the edge by only taking the maxima at this location. Once we have done our <strong>NMS</strong> we will come back to
          this spot and revist how the edge looks
        </p>

        <p>
          Now the big question is how do we figure out what orientation a certain pixel edge is representing? To understand how to
          solve this problem lets take a look at the two gradients of a sample pixel. If we combine the two gradients into a vector
          we now have a vector that represents the change in x and y of a pixel's intensity. If we take this vector and plot it we can see
          the direction and magnitude of the edge. So the next question is how do we seperate this into the direction. Watch the video below
          and you can see just how to do that (you will need a basic understanding of linear algebra and trigonometry).
        </p>
        <video className="blogInlineVideo" controls>
          <source src="/blog/canny-edge-detection/GradientVectorExplanation.mp4" type="video/mp4" />
        </video>

        <p>
          The arctan of the two gradient intensities is what gets us our angle. When you have a 0 Ix value, arctan is
          undefined. Also, when you have arctan(-1/-1) and arctan(1/1), they will point in the same direction. To
          solve this, NumPy has a function <code>np.arctan2()</code> that will give us a value between -π and π
          without these issues being a concern. Now what do we do with that angle? If we have a 45 degree angle, we
          can now thin out edges along a 45 degree axis.
        </p>

        <p>Here are general steps:</p>
        <ul className="ml-6 list-disc">
          <li>look at the pixels direction</li>
          <li>compare it to the 2 neighboring pixels along that direction</li>
          <li>keep it only if it is the largest</li>
        </ul>
        <video className="blogInlineVideo" controls>
          <source src="/blog/canny-edge-detection/NMSPatch45.mp4" type="video/mp4" />
        </video>


      </section>
    </SiteShell>
  );
}
