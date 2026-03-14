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
  attachments?: string[];
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
  linkedin: "https://www.linkedin.com",
  github: "https://github.com",
  resume: "/Aryan_Jain_Resume_2_26_26_Pinterest.pdf",
  major: "Computer Science",
  minors: "Robotics, Climate Change Fluency, and Remote Sensing for Environmental Change",
  school: "University of Maryland",
  schoolShort: "UMD",
  schoolUrl: "https://www.cs.umd.edu/",
  careerInterests:
    "Right now, I am especially interested in robotics, drones, computer vision, AI, embedded systems, and computer graphics. Long term, I want to combine AI, robotics, and my environmental minors to build technology that can help protect the environment.",
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
    slug: "kilobot-research",
    title: "UMD",
    subtitle: "Kilobot Researcher",
    period: "Summer '22",
    location: "University of Maryland",
    summary:
      "Conducted swarm robotics research and developed pathfinding software for kilobots inspired by Dijkstra's algorithm.",
    details: [
      "Worked on swarm robotics research at UMD and developed pathfinding software for kilobots.",
      "The modal is ready for you to add a fuller project scope, methods, or outcomes later.",
    ],
    tags: ["Robotics", "Research", "Kilobots", "Algorithms"],
    links: [],
    attachments: ["Add lab notes, paper links, or media here."],
  },
  {
    slug: "raas-lab-drone-research",
    title: "RAAS Lab",
    subtitle: "Drone Researcher",
    period: "Feb '26 - Now",
    location: "University of Maryland",
    summary:
      "Researching the effects of wind on drones in an academic lab setting and exploring the kind of robotics and autonomy problems I want to keep pursuing long term.",
    details: [
      "Studying how wind affects drone behavior in a robotics research setting.",
      "The modal is ready for you to add methods, experimental setup, or results later.",
    ],
    tags: ["Robotics", "Drones", "Research", "Flight dynamics"],
    links: [],
    attachments: ["Add experiment writeups, slides, or media here."],
  },
  {
    slug: "pinterest-software-engineering-intern",
    title: "Pinterest",
    subtitle: "Software Engineering Intern",
    period: "Summer '26",
    location: "San Francisco, CA",
    summary:
      "Joining Pinterest as a software engineering intern on the Mobile Platforms organization and excited to learn how large-scale mobile systems are built.",
    details: [
      "Incoming internship on the Mobile Platforms organization at Pinterest.",
      "The modal is ready for you to add team focus, stack, and impact once the internship starts.",
    ],
    tags: ["Mobile", "Platforms", "Consumer products", "Product engineering"],
    links: [],
    attachments: ["Add internship project notes or screenshots here later."],
  },
  {
    slug: "nist-research-intern",
    title: "NIST",
    subtitle: "Research Intern",
    period: "Summer '23 - Mar '24",
    location: "Gaithersburg, MD",
    summary:
      "Developed Python scripts and data visualizations to study how climate and weather influence dehumidifier behavior, contributing to a paper.",
    details: [
      "Built Python scripts and visualizations to analyze dehumidifier and weather data and study how climate influences dehumidifier behavior.",
      "Contributed to research work that fed into a paper.",
    ],
    tags: ["Python", "Research", "Data visualization", "Climate analysis"],
    links: [],
    attachments: ["Add paper citation or PDF here."],
  },
  {
    slug: "nist-embedded-swe",
    title: "NIST",
    subtitle: "Embedded Software Engineering Intern",
    period: "Summer '25",
    location: "Gaithersburg, MD",
    summary:
      "Built an embedded system for monitoring dehumidifier efficiency, including hardware design and code to measure and transmit appliance data.",
    details: [
      "Designed hardware and developed code to measure and transmit dehumidifier efficiency data.",
      "Worked across embedded software and physical system design in a lab environment.",
    ],
    tags: ["Python", "AWS IoT", "Raspberry Pi", "SolidWorks"],
    links: [],
    attachments: ["Add hardware photos, diagrams, or notes here."],
  },
  {
    slug: "amazon-student-developer",
    title: "Amazon",
    subtitle: "Software Engineering Student Developer",
    period: "Spring '25",
    location: "Student developer program",
    summary:
      "Worked on Project Leo in Amazon's student developer program and gained experience building software in a product-focused environment.",
    details: [
      "Worked on Project Leo during Amazon's student developer program.",
      "The modal is ready for you to add exact ownership, architecture, and impact later.",
    ],
    tags: ["React", "AWS", "FastAPI", "Docker", "PostGIS"],
    links: [],
    attachments: ["Add demo links or architecture notes here."],
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
    period: "Feb '26 - Now",
    logoSrc: "/logos/raas-lab.png",
    logoAlt: "RAAS Lab logo",
    summary: "Studying the effects of wind on drones",
    track: "Academia",
  },
  {
    slug: "nist-research-intern",
    company: "NIST",
    role: "Research Intern",
    period: "Summer '23 - Mar '24",
    logoSrc: "/logos/nist.png",
    logoAlt: "NIST logo",
    summary: "Built Python data visualizations studying dehumidifier behavior",
    track: "Academia",
  },
  {
    slug: "kilobot-research",
    company: "UMD",
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
    period: "2025",
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
    slug: "amazon-leo",
    title: "Amazon Leo",
    subtitle: "Built with App Development Club",
    period: "Ongoing",
    summary:
      "Developed a web app to visualize optimal Amazon Kuiper transmitter locations for low earth orbit satellites with machine learning insights.",
    details: [],
    tags: ["React", "Tailwind", "Docker", "AWS", "FastAPI", "PostGIS"],
  },
  {
    slug: "one-cut-above",
    title: "One Cut Above",
    subtitle: "Built through Project LIFT",
    period: "2025",
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
