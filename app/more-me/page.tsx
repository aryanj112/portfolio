import { SiteShell } from "../components";

const musicCards = [
  {
    title: "Artists in Rotation",
    body: "A little shelf for the artists and albums I keep returning to when I want to reset, lock in, or just feel more grounded.",
  },
  {
    title: "What I Like About Music",
    body: "I love music that feels textured, intentional, and atmospheric. A good song can build mood the same way a good interface builds feeling.",
  },
  {
    title: "Why It Matters",
    body: "Music is one of the easiest ways for me to recharge and stay connected to a more personal, creative side of life outside engineering.",
  },
];

const guitarCards = [
  {
    title: "Playing Guitar",
    body: "Guitar is one of my favorite hobbies because it lets me slow down, practice something tactile, and make progress in a way that feels different from coding.",
  },
  {
    title: "What I Practice",
    body: "I like learning riffs, getting more comfortable with rhythm, and slowly turning songs I like into something I can actually play well.",
  },
  {
    title: "How It Balances Everything",
    body: "It gives me another creative outlet and helps balance the more technical parts of my life with something expressive and personal.",
  },
];

export default function MoreMePage() {
  return (
    <SiteShell title="More Me">
      <section className="storyIntro">
        <p>
          This page is for the more personal side of me: the hobbies, interests, and little things that make me feel
          like a person outside of school, engineering, and recruiting.
        </p>
      </section>

      <section className="storySection">
        <h2 className="sectionSubhead">Music</h2>
        <div className="rule" aria-hidden="true" />
        <div className="storyCardGrid">
          {musicCards.map((card, index) => (
            <article
              className="storyCard musicCard"
              key={card.title}
              style={{ ["--story-tilt" as string]: `${index % 2 === 0 ? -1.4 : 1.4}deg` }}
            >
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="storySection">
        <h2 className="sectionSubhead">Guitar</h2>
        <div className="rule" aria-hidden="true" />
        <div className="storyCardGrid">
          {guitarCards.map((card, index) => (
            <article
              className="storyCard guitarCard"
              key={card.title}
              style={{ ["--story-tilt" as string]: `${index % 2 === 0 ? 1.2 : -1.2}deg` }}
            >
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
