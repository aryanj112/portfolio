import type { Metadata } from "next";
import { BlogInlineRevealTerm } from "../../blog-inline-reveal-term";
import { BlogViewCount } from "../../blog-view-count";
import { CodeBlock } from "../../code-block";
import { SiteShell } from "../../components";
import { PStrong } from "../../blog-strong-heading";

export const metadata: Metadata = {
  title: 'Breaking down "Attention Is All You Need" and the Transformer',
};

export default function AttentionIsAllYouNeedPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>
          Breaking down &quot;Attention Is All You Need&quot;
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
          The transformer is one of those ideas that sounds more mysterious than it actually is. The paper title,{" "}
          <strong>&quot;Attention Is All You Need&quot;</strong>, is basically the whole thesis: instead of reading a sentence one token at a
          time, let every token look at every other token and decide what matters.
        </p>

        <p>
          That sounds simple, but it is a pretty wild shift. Before transformers, a lot of language models leaned on
          <BlogInlineRevealTerm term="RNNs" reveal="recurrent neural networks" /> or
          <BlogInlineRevealTerm term="LSTMs" reveal="long short-term memory networks" />. Those models process text in order, which is intuitive, but
          it also means they are kind of stuck walking through the sentence step by step. Transformers make the sequence feel more like a
          table where all the words can talk to each other at once.
        </p>

        <PStrong>The core intuition</PStrong>

        <p>
          Imagine the sentence: <strong>&quot;The robot picked up the box because it was heavy.&quot;</strong> What does <strong>&quot;it&quot;</strong>
          refer to? Probably the box. A model needs a way to connect <strong>&quot;it&quot;</strong> back to the useful earlier word. Attention is
          the mechanism that lets a token ask: <strong>which other tokens should I care about right now?</strong>
        </p>

        <p>
          In a transformer, each token gets turned into three vectors:
        </p>

        <ul>
          <li><strong>Query:</strong> what this token is looking for</li>
          <li><strong>Key:</strong> what this token offers as a label</li>
          <li><strong>Value:</strong> the information this token can pass along</li>
        </ul>

        <p>
          The query compares itself against all the keys. Strong matches get higher weights. Then the model mixes together the values
          using those weights. That weighted mixture becomes the token&apos;s new context-aware representation.
        </p>

        <CodeBlock
          language="python"
          code={`# Scaled dot-product attention
scores = Q @ K.T / sqrt(d_k)
weights = softmax(scores)
output = weights @ V`}
        />

        <PStrong>Why the scaling?</PStrong>

        <p>
          The <code>/ sqrt(d_k)</code> part looks random at first, but it keeps the dot products from getting too large as the vectors get
          wider. If the scores get huge, the softmax turns into something very close to a one-hot choice, gradients get less useful, and
          training becomes annoying. Scaling keeps the attention distribution smoother.
        </p>

        <PStrong>Multi-head attention</PStrong>

        <p>
          One attention operation can learn one kind of relationship, but language has lots of relationships happening at the same time.
          A word might care about its subject, its verb, nearby punctuation, or a phrase from way earlier in the sentence. Multi-head
          attention just runs attention several times in parallel with different learned projections.
        </p>

        <p>
          I like thinking of each head as a different lens. One head might become good at local grammar, another might track references,
          and another might capture long-range dependencies. The model does not get told to do that explicitly; it discovers useful
          patterns because they help reduce the training loss.
        </p>

        <CodeBlock
          language="python"
          code={`head_1 = attention(Q1, K1, V1)
head_2 = attention(Q2, K2, V2)
head_3 = attention(Q3, K3, V3)

combined = linear(concat([head_1, head_2, head_3]))`}
        />

        <PStrong>But order still matters</PStrong>

        <p>
          There is one funny problem: attention by itself does not know word order. If every token can look at every other token, the model
          needs some extra signal that says token 3 came before token 4. That is what positional encoding is for.
        </p>

        <p>
          The original transformer paper used sine and cosine waves at different frequencies. The exact math is less important than the
          purpose: add a position-specific pattern to each token embedding so the model can reason about order and distance.
        </p>

        <PStrong>The encoder-decoder shape</PStrong>

        <p>
          The original transformer was built for translation, so it had two big halves:
        </p>

        <ul>
          <li><strong>Encoder:</strong> reads the input sentence and builds rich contextual representations</li>
          <li><strong>Decoder:</strong> generates the output sentence one token at a time while looking back at the encoder</li>
        </ul>

        <p>
          Each encoder block has self-attention followed by a feed-forward network. Each decoder block has masked self-attention, cross-attention
          over the encoder output, and then a feed-forward network. The masking part matters because, during generation, the model should not
          peek at future tokens.
        </p>

        <PStrong>Why this paper changed everything</PStrong>

        <p>
          The transformer was not just more accurate; it was easier to scale. Since tokens can be processed in parallel during training, the
          architecture plays really nicely with GPUs. That parallelism is a big reason transformer-based models kept getting larger and better.
        </p>

        <p>
          The bigger idea is that attention gives the model a flexible routing system. Instead of forcing information to squeeze through a
          left-to-right hidden state, the model can directly connect relevant pieces of context. That one design choice is the seed for a ton
          of modern AI: translation models, BERT-style encoders, GPT-style decoders, vision transformers, multimodal models, and more.
        </p>

        <PStrong>The short version</PStrong>

        <p>
          A transformer turns tokens into vectors, lets them attend to each other, adds position information, passes the result through
          feed-forward layers, and stacks that process many times. The magic is not one mysterious equation. It is the combination of
          <strong> parallelism</strong>, <strong>context mixing</strong>, and <strong>scale</strong>.
        </p>
      </section>
    </SiteShell>
  );
}
