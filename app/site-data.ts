export type DetailEntry = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  summary: string;
  details: string[];
  tags?: string[];
  links?: { label: string; href: string }[];
  imageSrc?: string;
  imageAlt?: string;
};

export type WorkTimelineEntry = {
  company: string;
  role: string;
  period: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
  track: "Industry" | "Academia";
};

export const profile = {
  name: "Aryan Jain",
  headshot: "/headshot.JPG",
  email: "2006aryanj@gmail.com",
  linkedin: "https://www.linkedin.com",
  github: "https://github.com",
  resume: "/Aryan_Jain_Resume_2_26_26_Pinterest.pdf",
  major: "Computer Science",
  minors: "Robotics, Climate Change Fluency, and Remote Sensing for Environmental Change",
  school: "University of Maryland",
  schoolShort: "UMD",
  schoolUrl: "https://www.cs.umd.edu/",
  careerInterests:
    "Right now, I am especially interested in robotics, with drones being the area I am most excited to explore further. More broadly, I want to work at the intersection of robotics, computer vision, AI, and embedded systems, and I am also very interested in computer graphics. I have grown to really enjoy low-level systems work too, especially after CMSC 216, which made me appreciate how computers actually work under the hood. Long term, my ideal path is to combine AI, robotics, and my environmental minors to build technology that can help protect nature.",
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
    "Computer Science Principles",
    "AP Capstone Seminar",
    "Computer Science A",
    "U.S. Government and Politics",
    "Psychology",
    "English Language and Composition",
    "World History",
    "Calculus BC",
    "Physics 1 and 2 (Algebra-Based)",
    "Environmental Science",
  ],
};

export const workExperiences: DetailEntry[] = [
  {
    slug: "raas-lab-drone-research",
    title: "RAAS Lab",
    subtitle: "Drone Researcher",
    period: "Ongoing",
    location: "University of Maryland",
    summary:
      "Working on drone-focused research in an academic lab setting and exploring the kind of robotics and autonomy problems I want to keep pursuing long term.",
    details: [
      "This section is set up for your RAAS lab work and can hold the exact research direction, hardware stack, and autonomy or sensing problems you are tackling.",
      "It is also a strong place to connect drones, robotics, and computer vision to the broader environmental and field robotics work you want to grow into.",
      "Once you want, we can replace this with the real scope of your research, what you built, and the specific technical questions you worked on.",
    ],
    tags: ["Robotics", "Drones", "Research"],
  },
  {
    slug: "pinterest-software-engineering-intern",
    title: "Pinterest",
    subtitle: "Software Engineering Intern",
    period: "Incoming Summer '26",
    location: "San Francisco, CA",
    summary:
      "Joining Pinterest as a software engineering intern and excited to learn how large-scale consumer products are built with strong engineering craft.",
    details: [
      "This page is ready for your real internship description, team name, project scope, and impact once you want to swap in exact resume bullets.",
      "A strong version here could describe the product area, the systems you touched, and the specific outcome you owned.",
      "We can also add screenshots, architecture notes, or a short reflection once the internship is underway.",
    ],
    tags: ["Consumer products", "Frontend", "Product engineering"],
  },
  {
    slug: "nist-embedded-swe",
    title: "NIST",
    subtitle: "Embedded Software Engineering Intern",
    period: "Summer '25",
    location: "Gaithersburg, MD",
    summary:
      "Designed hardware and developed code to measure and transmit HVAC appliance efficiency data.",
    details: [],
    tags: ["💻 Python", "AWS IoT", "Raspberry Pi", "SolidWorks"],
  },
  {
    slug: "amazon-student-developer",
    title: "Amazon",
    subtitle: "Software Engineering Student Developer",
    period: "Winter '26",
    location: "Student developer program",
    summary:
      "Built software in a student developer setting and gained experience working with product-oriented engineering expectations at scale.",
    details: [
      "This page can describe the exact product area, stack, and ownership you had in the program.",
      "It can also help connect your broader software background with your growing focus on robotics, AI, and systems work.",
      "If you want, we can later make this read more technical or more resume-like depending on the audience.",
    ],
    tags: ["Software engineering", "Product", "Student developer"],
  },
];

export const workTimeline: WorkTimelineEntry[] = [
  {
    company: "Pinterest",
    role: "SWE",
    period: "Incoming Summer '26",
    href: "/work#pinterest-software-engineering-intern",
    logoSrc: "/logos/pinterest.png",
    logoAlt: "Pinterest logo",
    track: "Industry",
  },
  {
    company: "Amazon",
    role: "SWE Student Developer",
    period: "Winter '26",
    href: "/work#amazon-student-developer",
    logoSrc: "/logos/amazon.png",
    logoAlt: "Amazon logo",
    track: "Industry",
  },
  {
    company: "NIST",
    role: "Embedded SWE",
    period: "Summer '25",
    href: "/work#nist-embedded-swe",
    logoSrc: "/logos/nist.png",
    logoAlt: "NIST logo",
    track: "Industry",
  },
  {
    company: "RAAS Lab",
    role: "Drone Researcher",
    period: "Ongoing",
    href: "/work#raas-lab-drone-research",
    logoSrc: "/logos/raas-lab.png",
    logoAlt: "RAAS Lab logo",
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
    period: "2025",
    summary:
      "Built and launched the website for Craving Hour Halal, a local food truck serving 3,000+ monthly users, and developed a companion mobile app for managing site content.",
    details: [],
    tags: [
      "💻 React",
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
    slug: "amazon-kuiper-demo",
    title: "Amazon Leo Dashboard",
    subtitle: "Built with App Development Club",
    period: "2025",
    summary:
      "A demo project built with App Development Club around an Amazon Kuiper concept.",
    details: [],
    tags: ["App Development", "Tech stack TBD"],
    links: [{ label: "Demo", href: "https://www.youtube.com/watch?v=AQpo7HwY4lw" }],
  },
  {
    slug: "amazon-leo",
    title: "Amazon Leo",
    subtitle: "Built with App Development Club",
    period: "Ongoing",
    summary:
      "Developed a web app to visualize optimal Amazon Kuiper transmitter locations for low earth orbit satellites with machine learning insights.",
    details: [],
    tags: ["💻 React", "Tailwind", "Docker", "AWS", "FastAPI", "PostGIS"],
  },
  {
    slug: "one-cut-above",
    title: "One Cut Above",
    subtitle: "Built through Project LIFT",
    period: "2025",
    summary:
      "Led a team building a mobile booking app for a local barber, translating client needs into a system that streamlined 30,000+ yearly appointments, saved $40,000+ annually, and reduced after-hours manual coordination.",
    details: [],
    tags: ["💻 React Native", "Supabase", "Square API"],
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
      "Helped found the club and now work on client sourcing and outreach, building Project LIFT into a campus organization around ambitious student-led work.",
    details: [
      "Helped found Project LIFT and supported its growth as a student organization focused on building for real clients and creating more ambitious opportunities on campus.",
      "My work has included client sourcing and outreach, helping connect the club with outside partners and shape the kind of projects the team can take on.",
      "Website: https://www.projectliftumd.com/",
    ],
    tags: ["Leadership", "Initiative", "Outreach"],
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
    details: [
      "This section can highlight any committees, events, recruiting work, or projects you helped drive.",
      "It is also a good place to show that you care about communication and teamwork, not just technical execution.",
      "If you want, we can make this page feel more reflective and personal than resume-like.",
    ],
    tags: ["Leadership", "Community"],
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
    details: [
      "Work with Fortune 500 companies to create tech solutions through a student engineering community focused on shipping real products.",
      "This is also where projects like Amazon Kuiper Demo and Amazon Leo connect back to campus work.",
      "Website: https://appdevclub.com/",
    ],
    tags: ["Product", "Engineering", "Club"],
    links: [{ label: "Website", href: "https://appdevclub.com/" }],
  },
];
