import { SiteShell } from "../components";

const blogSections = [
  {
    title: "Computer Vision",
    cards: [
      {
        title: "What Makes Vision Work in Practice",
        body: "Thoughts on moving from cool demos to systems that actually behave well on real data, real hardware, and real constraints.",
      },
      {
        title: "Seeing from the Air",
        body: "Notes on how drone imagery, environment sensing, and vision can come together in ways that feel genuinely useful.",
      },
    ],
  },
  {
    title: "Drone Research",
    cards: [
      {
        title: "Wind as a Systems Problem",
        body: "A place to write about how wind changes the way drones behave and why that matters for control, sensing, and field robotics.",
      },
      {
        title: "What I Am Curious About",
        body: "Questions I keep coming back to around stability, autonomy, and what it takes for robots to be dependable outside the lab.",
      },
    ],
  },
  {
    title: "Low Level",
    cards: [
      {
        title: "Why I Like Systems Work",
        body: "Short pieces on embedded software, hardware-adjacent thinking, and the parts of computing that feel closest to the machine.",
      },
      {
        title: "Building Close to the Metal",
        body: "Reflections on debugging, constraints, and why low-level work can be frustrating but also incredibly satisfying.",
      },
    ],
  },
  {
    title: "Guides to Life",
    cards: [
      {
        title: "Things I Want to Remember",
        body: "A section for practical notes on growth, career decisions, balance, and the kind of person I want to become while building all of this.",
      },
      {
        title: "Advice I’d Give My Younger Self",
        body: "Personal essays and small lessons on ambition, community, patience, and building a life that still feels human.",
      },
    ],
  },
];

export default function BlogPage() {
  return (
    <SiteShell title="Blog ⚙️" intro="A place for engineering notes, research thoughts, and things I want to write down as I keep learning.">
      <div className="blogSectionStack">
        {blogSections.map((section) => (
          <section className="storySection" key={section.title}>
            <h2 className="sectionSubhead">{section.title}</h2>
            <div className="rule" aria-hidden="true" />
            <div className="blogCardGrid">
              {section.cards.map((card, index) => (
                <article
                  className="blogCard"
                  key={card.title}
                  style={{ ["--story-tilt" as string]: `${index % 2 === 0 ? -1.1 : 1.1}deg` }}
                >
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}
