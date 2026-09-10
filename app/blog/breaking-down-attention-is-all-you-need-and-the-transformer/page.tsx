import type { Metadata } from "next";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogViewCount } from "../../blog-view-count";
import { SiteShell } from "../../components";
import { PaintLink } from "../../paint-link";

const paperTitle = "Attention Is All You Need";
const nextTokenExample = "I just dropped my mechanical pencil I can't believe my lead ___";

export const metadata: Metadata = {
  title: `Breaking down "${paperTitle}" and the Transformer`,
};

export default function AttentionIsAllYouNeedPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>
          Breaking down {`"${paperTitle}"`}
          <br />
          and the Transformer
        </h1>
        <div className="blogPostMetaRow">
          <p className="blogByline">By: Aryan Jain</p>
          <span className="blogPostDateReveal" tabIndex={0}>
            <span className="blogPostDate">Sep 10, 2026</span>
            <span className="blogPostDateHover">Last updated: Sep 10, 2026</span>
          </span>
          <BlogViewCount slug="breaking-down-attention-is-all-you-need-and-the-transformer" />
        </div>

        <p>
          The transformer is a model architecture that essentially created the entire AI boom we are seeing now. Despite countless
          innovations in the field and model, all of it dates back to August 2nd 2023 in the heart of {"Google's"} DeepMind Lab.
        </p>

        <p>
          <PaintLink href="https://arxiv.org/abs/1706.03762" pad={false}>
            {paperTitle}
          </PaintLink>
        </p>

        <p>
          The way a transformer works is by predicting the next token. So for a simple example, imagine you have the sentence{" "}
          {`"${nextTokenExample}"`}
        </p>

        <p>
          The fill in the blank here is obviously {`"broke."`} and we can think of that as a token that the model is going to predict.
        </p>

        <p>
          With this slight introduction I want to spend the rest of this blog breaking down the self-attention mechanism and the encoder and decoder
          design. I assume basic familiarity with ChatGPT and the general idea of what a transformer is but not the math and exact implementation
          we will go into. For more preliminary information there are resources at the bottom.
        </p>

        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <BlogImageLightbox
            src="/blog/breaking-down-attention-is-all-you-need-and-the-transformer/transformer-architecture.webp"
            alt="Transformer architecture diagram"
            width={1320}
            height={1860}
          />
          <i>This is the transformer architecture</i>
        </div>

        <p>
          So before the transformer and self-attention we had a very sequential based approach (RNN, LSTM, etc). In this approach we would take each
          token (think of a token as a word in a sentence), feed it through a model, store some data in memory, and then keep doing that with every next token.
          Now this works and was a solid approach to this problem, however it wasn&apos;t scalable and was unable to handle large context windows. Imagine a 10 page essay.
          Training would all be sequential so it would take forever to train the model and also with this kind of an approach by the time you go to the end of the essay the model
          would have no clue what happened in the very start. As you might have seen the scale of LLM&apos;s has gone up an absurd amount in the past few years. What we are finding is that
          scale eventually trumps everything, even in adjacent fields such as robotics. This means that we needed a parallelizable approach. Luckily the attention mechanism was not only parallelizable
          but also tacked on the benefit of handling large context windows by relating every token to each other (I will explain this part more). Now with all of this said, this blog will hone in on that
          attention mechanism and how it works under the hood.
        </p>
      </section>
    </SiteShell>
  );
}
