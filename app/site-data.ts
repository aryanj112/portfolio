export type DetailEntry = {
  slug: string;
  title: string;
  subtitle: string;
  subtitleHref?: string;
  period: string;
  location?: string;
  locationHref?: string;
  summary: string;
  details: string[];
  tags?: string[];
  links?: { label: string; href: string }[];
  attachments?: { label: string; href: string }[];
  imageSrc?: string;
  imageAlt?: string;
};

export type WorkTimelineEntry = {
  slug: string;
  company: string;
  role: string;
  period: string;
  logoSrc: string;
  logoAlt: string;
  summary: string;
  track: "Industry" | "Academia";
};

export const profile = {
  name: "Aryan Jain",
  headshot: "/headshot.JPG",
  email: "2006aryanj@gmail.com",
  linkedin: "https://www.linkedin.com/in/aryanjain06/",
  github: "https://github.com/aryanj112",
  resume: "/Aryan_Jain_Resume_2_26_26_Pinterest.pdf",
  major: "Computer Science",
  minors: "Robotics, Climate Change Fluency, and Remote Sensing for Environmental Change",
  school: "University of Maryland",
  schoolShort: "UMD",
  schoolUrl: "https://www.cs.umd.edu/",
  careerInterests:
    "Right now, I am especially interested in robotics, drones, computer vision, AI, and embedded systems. Long term, I want to combine AI, robotics, and my environmental minors to build technology that can help protect the environment.",
};

export const collegeCoursework = {
  computerScience: [
    "CMSC426 - Computer Vision",
    "CMSC389O - Cracking the Coding Interview",
    "CMSC351 - Algorithms",
    "CMSC330 - Organization of Programming Languages",
    "CMSC320 - Data Science",
    "CMSC250 - Discrete Structures",
    "CMSC216 - Introduction to Computer Systems",
    "CMSC132 - Object-Oriented Programming II",
    "CMSC131 - Introduction to Programming I (AP Credit)",
  ],
  math: [
    "STAT400 - Applied Probability and Statistics I",
    "MATH246 - Differential Equations",
    "MATH240 - Linear Algebra",
    "MATH141 - Calculus II (AP Credit)",
    "MATH140 - Calculus I (AP Credit)",
  ],
};

export const highSchoolCoursework = {
  school: "Poolesville High School",
  program: "Global Ecology Magnet Program",
  activities: [
    "First Tech Challenge",
    "The Basement PPL (Pop Band)",
    "Men's Volleyball",
    "Masti Bollywood Dance",
  ],
  courses: [
    "AP Computer Science Principles",
    "AP Capstone Seminar",
    "AP Computer Science A",
    "AP U.S. Government and Politics",
    "AP Psychology",
    "AP English Language and Composition",
    "AP World History",
    "AP Calculus BC",
    "AP Physics 1 and 2",
    "AP Environmental Science",
  ],
};

export const workExperiences: DetailEntry[] = [
  {
    slug: "kilobot-research",
    title: "Otte Lab",
    subtitle: "Kilobot Researcher",
    period: "Summer '22",
    summary:
      "Conducted swarm robotics research and developed pathfinding software for kilobots inspired by Dijkstra's algorithm.",
    details: [],
    tags: ["C++"],
    links: [],
  },
  {
    slug: "raas-lab-drone-research",
    title: "RAAS Lab",
    subtitle: "Drone Researcher",
    period: "Feb '26 - Present",
    location: "University of Maryland",
    summary:
      "Researching the effects of wind on drones in an academic lab setting and exploring the kind of robotics and autonomy problems I want to keep pursuing long term.",
    details: [],
    tags: ["Python", "Linux", "Ubuntu", "Gazebo"],
    links: [{ label: "coming soon 👀", href: "#" }],
  },
  {
    slug: "pinterest-software-engineering-intern",
    title: "Pinterest",
    subtitle: "Software Engineering Intern",
    period: "Summer '26",
    location: "Remote",
    summary:
      "Joining Pinterest as a SWE intern on the Mobile Platforms org.",
    details: [],
    tags: ["???"],
  },
  {
    slug: "nist-research-intern",
    title: "NIST",
    subtitle: "Data Science Intern",
    period: "Summer '23 - Mar '24",
    location: "Gaithersburg, MD",
    summary:
      "Developed python scripts to generate data visualizations analyzing dehumidifier and weather data to study how climate influences dehumidifier behavior. worked on a paper too :)",
    details: [],
    tags: ["Python", "Research", "Data visualization", "Climate analysis"],
    links: [{ label: "GitHub", href: "https://github.com/aryanj112/DehumGraph" }],
    attachments: [
      { label: "Draft Research Paper", href: "/attachments/draft-research-paper.pdf" },
      { label: "Research Poster", href: "/attachments/aryan-jain-srp-poster.pdf" },
    ],
  },
  {
    slug: "nist-embedded-swe",
    title: "NIST",
    subtitle: "Embedded Software Engineering Intern",
    period: "Summer '25",
    location: "Gaithersburg, MD",
    summary:
      "Designed hardware and developed code to measure and transmit portable dehumidifier efficiency data.",
    details: [],
    tags: ["Python", "AWS IoT", "Raspberry Pi", "SolidWorks"],
    links: [{ label: "GitHub", href: "https://github.com/aryanj112/nist_dehum" }],
  },
  {
    slug: "amazon-student-developer",
    title: "Amazon",
    subtitle: "Software Engineering Student Developer",
    period: "Feb - May '25",
    location: "built with App Development Club",
    locationHref: "/#extracurriculars",
    summary:
      "Deployed a full stack web app to visualize optimal transmitter sites for Amazon's 3,000+ LEO satellites using ML insights.",
    details: [],
    tags: ["React", "FastAPI", "PostGIS", "AWS ECS/ECR", "Docker", "GitHub Actions", "Mapbox API", "AWS SES"],
    links: [{ label: "Demo", href: "https://m.youtube.com/watch?v=AQpo7HwY4lw" }],
  },
];

export const workTimeline: WorkTimelineEntry[] = [
  {
    slug: "pinterest-software-engineering-intern",
    company: "Pinterest",
    role: "SWE Intern",
    period: "Summer '26",
    logoSrc: "/logos/pinterest.png",
    logoAlt: "Pinterest logo",
    summary: "Joining the Mobile Platforms org",
    track: "Industry",
  },
  {
    slug: "nist-embedded-swe",
    company: "NIST",
    role: "Embedded SWE Intern",
    period: "Summer '25",
    logoSrc: "/logos/nist.png",
    logoAlt: "NIST logo",
    summary: "Built an embedded system for monitoring dehumidifier efficiency",
    track: "Industry",
  },
  {
    slug: "amazon-student-developer",
    company: "Amazon",
    role: "SWE Student Developer",
    period: "Spring '25",
    logoSrc: "/logos/amazon.png",
    logoAlt: "Amazon logo",
    summary: "Developed a web app to visualize ideal transmitter locations for LEO satellites",
    track: "Industry",
  },
  {
    slug: "raas-lab-drone-research",
    company: "RAAS Lab",
    role: "Drone Researcher",
    period: "Feb '26 - Present",
    logoSrc: "/logos/raas-lab.png",
    logoAlt: "RAAS Lab logo",
    summary: "Studying the effects of wind on drones",
    track: "Academia",
  },
  {
    slug: "nist-research-intern",
    company: "NIST",
    role: "Data Science Intern",
    period: "Summer '23 - Mar '24",
    logoSrc: "/logos/nist.png",
    logoAlt: "NIST logo",
    summary: "Built Python data visualizations studying dehumidifier behavior",
    track: "Academia",
  },
  {
    slug: "kilobot-research",
    company: "Otte Lab",
    role: "Kilobot Researcher",
    period: "Summer '22",
    logoSrc: "/logos/raas-lab.png",
    logoAlt: "UMD research logo",
    summary: "Conducted swarm robotics research and built kilobot pathfinding software inspired by Dijkstra's algorithm",
    track: "Academia",
  },
];

export const projects: DetailEntry[] = [
  {
    slug: "faangfocus",
    title: "FaangFocus",
    subtitle: "",
    period: "Ongoing",
    summary:
      "Building a platform for tailored interview prep using AI.",
    details: [],
    tags: ["Next.js", "Supabase", "LangChain", "FastAPI"],
    links: [{ label: "GitHub", href: "https://github.com/aryanj112/faangfocus" }],
  },
  {
    slug: "craving-hour-halal",
    title: "Craving Hour Halal",
    subtitle: "Built through Project LIFT",
    subtitleHref: "/#extracurriculars",
    period: "Summer '25",
    summary:
      "Built and launched the website for Craving Hour Halal, a local food truck serving 3,000+ monthly users, and developed a companion mobile app for managing site content.",
    details: [],
    tags: [
      "React",
      "AWS CloudFront",
      "Google Maps API",
      "React Native",
      "FastAPI",
      "AWS Lambda",
      "AWS S3",
      "PostgreSQL",
    ],
    links: [{ label: "Live site", href: "https://www.cravinghourhalal.com/" }],
  },
  {
    slug: "one-cut-above",
    title: "One Cut Above",
    subtitle: "Built through Project LIFT",
    subtitleHref: "/#extracurriculars",
    period: "Sept '25 - Present",
    summary:
      "Led a team building a mobile booking app for a local barber, translating client needs into a system that streamlined 30,000+ yearly appointments, saved $40,000+ annually, and reduced after-hours manual coordination.",
    details: [],
    tags: ["React Native", "Supabase", "Square API"],
    links: [
      { label: "Demo", href: "https://www.youtube.com/watch?v=m8jBnT4MwH8" },
      { label: "GitHub", href: "https://github.com/aryanj112/cut-above-app" },
    ],
  },
  {
    slug: "fleetnet",
    title: "Tesla FleetNet Demo",
    subtitle: "",
    period: "2025",
    summary:
      "A Rails-based project tied to a Tesla-focused FleetNet demo and engineering exercise.",
    details: [],
    tags: ["Ruby on Rails"],
    links: [
      { label: "GitHub", href: "https://github.com/aryanj112/fleetnet-rails-test" },
      { label: "Demo", href: "https://github.com/aryanj112/fleetnet-rails-test/issues/3" },
    ],
  },
];

export const extracurriculars: DetailEntry[] = [
  {
    slug: "project-lift-campus-initiative",
    title: "Project LIFT",
    subtitle: "Founding team / campus initiative",
    period: "Current",
    imageSrc: "/extracurriculars/projectlift.png",
    imageAlt: "Project LIFT logo",
    summary:
      "Leading 40+ students to deliver software solutions for 8+ local small businesses, generating $50,000+ in value.",
    details: [],
    links: [{ label: "Website", href: "https://www.projectliftumd.com/" }],
  },
  {
    slug: "alpha-kappa-psi",
    title: "Alpha Kappa Psi",
    subtitle: "Professional business fraternity",
    period: "Current",
    imageSrc: "/extracurriculars/akpsi.jpeg",
    imageAlt: "Alpha Kappa Psi logo",
    summary:
      "Part of Alpha Kappa Psi, where I have developed professionally through a strong peer network, collaboration, and leadership opportunities.",
    details: [],
    links: [{ label: "Instagram", href: "https://www.instagram.com/akpsiot/" }],
  },
  {
    slug: "app-development-club",
    title: "App Development Club",
    subtitle: "Product and engineering club",
    period: "Current",
    imageSrc: "/extracurriculars/appdevclub.jpeg",
    imageAlt: "App Development Club logo",
    summary:
      "Work with Fortune 500 companies to create tech solutions through App Development Club.",
    details: [],
    links: [{ label: "Website", href: "https://appdevclub.com/" }],
  },
];
