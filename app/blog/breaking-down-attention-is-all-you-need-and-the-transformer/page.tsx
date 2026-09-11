import type { Metadata } from "next";
import { InlineMath } from "react-katex";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogViewCount } from "../../blog-view-count";
import { SiteShell } from "../../components";
import { PaintLink } from "../../paint-link";
import { TokenAttentionTable } from "../../token-attention-table";
import { WordVectorGraph } from "../../word-vector-graph";

const paperTitle = "Attention Is All You Need";
const nextTokenExample = "I just dropped my mechanical pencil I can't believe my lead ___";
const simpleTokens = nextTokenExample.split(" ");
const exampleTokenVectors = [
  { token: "I", vector: String.raw`\begin{bmatrix}0\\0\\1\\0\\[-0.2em]\cdot\\[-0.2em]\cdot\\[-0.2em]\cdot\\0\end{bmatrix}` },
  { token: "dropped", vector: String.raw`\begin{bmatrix}0\\0\\0\\0\\[-0.2em]\cdot\\[-0.2em]\cdot\\[-0.2em]\cdot\\1\end{bmatrix}` },
  { token: "lead", vector: String.raw`\begin{bmatrix}0\\1\\0\\0\\[-0.2em]\cdot\\[-0.2em]\cdot\\[-0.2em]\cdot\\0\end{bmatrix}` },
];

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

        <p>
          Take the input example we had from before:{" "}
          {`"${nextTokenExample}"`}. The first step is to tokenize this (
          <PaintLink href="https://platform.openai.com/tokenizer" pad={false}>
            try an actual tokenizer
          </PaintLink>
          ).
        </p>

        <div
          aria-label="Simple word-level tokenization of the example sentence"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            margin: "20px 0 28px",
          }}
        >
          {simpleTokens.map((token, index) => (
            <span
              key={`${token}-${index}`}
              style={{
                border: "1px solid var(--rule)",
                borderRadius: "6px",
                background: "rgba(255, 251, 244, 0.82)",
                boxShadow: "0 8px 20px rgba(45, 37, 27, 0.08)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "54px",
                padding: "8px 12px",
                fontWeight: 700,
              }}
            >
              {token}
            </span>
          ))}
        </div>

        <p>
          The model can now take each of these tokens and look it up in a massive dictionary to get its vector representation.
          As a mental model, imagine each token starting as a giant sparse vector with around <strong>50,000 possible slots</strong>.
          Almost everything is 0, and one position lights up to say which token it is. Let&apos;s get some example vectors for our tokens.
        </p>

        <div
          aria-label="Example token vectors"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            margin: "20px 0 28px",
          }}
        >
          {exampleTokenVectors.map(({ token, vector }) => (
            <div
              key={token}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  border: "1px solid var(--rule)",
                  borderRadius: "6px",
                  background: "rgba(255, 251, 244, 0.82)",
                  boxShadow: "0 8px 20px rgba(45, 37, 27, 0.08)",
                  padding: "8px 12px",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                {token}
              </span>
              <InlineMath math={vector} />
            </div>
          ))}
        </div>

        <p>
          You can think of maybe the 43,403 slot to be pencil and if we have the word pencil in our sentence that slot would be 1 and everything else 0.
          In practice this is not how we represent tokens and it is more than just 1&apos;s and 0&apos;s but it is a good start. Now another aspect I want to break down
          is the intuition for how these vectors operate. Think of a toy 2D space where the x axis is gender-ish meaning and the y axis is occupation.
          Then similar words land near each other, and meaningful differences become directions you can move in.
        </p>

        <WordVectorGraph />

        <p>
          Now these are again just very basic representations of a much more complex system underneath but this should get you thinking about how
          these 50,000 dimention vectors can start to hold some value.
        </p>

        <p>
          Once every token has a vector, attention compares every token to every other token. The table below is a toy version of that idea:
          the same tokens go across the top and down the side, and each blob is the attention score between that pair.
        </p>

        <TokenAttentionTable />


      </section>
    </SiteShell>
  );
}
