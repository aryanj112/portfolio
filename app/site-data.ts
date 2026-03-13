export type DetailEntry = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  summary: string;
  details: string[];
  tags?: string[];
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
      "Worked on embedded software in a research-oriented engineering environment and built stronger instincts for systems, hardware-adjacent work, and low-level problem solving.",
    details: [
      "This entry is set up for your NIST experience and can hold the exact systems, devices, or embedded workflows you worked on.",
      "It is a good place to show your interest in low-level engineering and how that connects with your robotics goals.",
      "We can tighten this into real resume bullets once you want to replace the placeholder copy with the exact work you shipped.",
    ],
    tags: ["Embedded systems", "Low-level", "Research"],
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
    company: "Amazon",
    role: "SWE Student Developer",
    period: "Winter '26",
    href: "/work#amazon-student-developer",
    logoSrc: "/logos/amazon.png",
    logoAlt: "Amazon logo",
  },
  {
    company: "NIST",
    role: "Embedded SWE",
    period: "Summer '25",
    href: "/work#nist-embedded-swe",
    logoSrc: "/logos/nist.png",
    logoAlt: "NIST logo",
  },
  {
    company: "Pinterest",
    role: "SWE",
    period: "Incoming Summer '26",
    href: "/work#pinterest-software-engineering-intern",
    logoSrc: "/logos/pinterest.png",
    logoAlt: "Pinterest logo",
  },
];

export const projects: DetailEntry[] = [
  {
    slug: "project-lift",
    title: "Project LIFT",
    subtitle: "Founding team / campus initiative",
    period: "Ongoing",
    location: "University of Maryland",
    summary:
      "Helped found Project LIFT, a student initiative centered on ambitious, mission-driven building. It reflects the kind of collaborative work I want to keep doing.",
    details: [
      "This page can explain why you started it, what problem it was addressing, and what your role looked like day to day.",
      "If there is a technical system behind it, we can showcase the stack, milestones, and how the team operated.",
      "If it is more community-focused, we can still present it like a strong project with goals, execution, and outcomes.",
    ],
    tags: ["Leadership", "Community", "Initiative"],
  },
  {
    slug: "drone-vision-mapper",
    title: "Drone Vision Mapper",
    subtitle: "Computer vision pipeline for aerial environmental monitoring",
    period: "Feb '26",
    summary:
      "A drone imagery project focused on computer vision and environmental mapping. It combines robotics, sensing, and geospatial analysis in a way that matches my long-term interests.",
    details: [
      "This project could combine drone footage with vision models to identify terrain changes, vegetation patterns, or environmental anomalies.",
      "A strong full version could include your sensing pipeline, dataset strategy, model evaluation, and how results would be surfaced to a user.",
      "It also fits nicely with your long-term interest in combining robotics, AI, and environmental work.",
    ],
    tags: ["Python", "Computer Vision", "Robotics", "Geospatial"],
  },
  {
    slug: "embedded-flight-controller",
    title: "Embedded Flight Controller",
    subtitle: "Low-level systems project for robotics control",
    period: "Jan '26",
    summary:
      "A low-level robotics systems project around control loops, hardware interfaces, and real-time behavior. It is the kind of embedded work that connects directly to my interest in drones.",
    details: [
      "This is a good placeholder for a project that reflects your interest in low-level systems after CMSC 216.",
      "You could use it to talk about memory constraints, hardware communication, state estimation, or system debugging.",
      "It would also make the home page feel more aligned with the kinds of technical work you want to pursue.",
    ],
    tags: ["C/C++", "Embedded", "Controls", "Systems"],
  },
  {
    slug: "environmental-ai-explorations",
    title: "Environmental AI Explorations",
    subtitle: "Robotics, remote sensing, and climate-focused ideas",
    period: "Ongoing",
    summary:
      "A collection of ideas that connect AI, remote sensing, and environmental impact. It is a space for experiments that point toward the work I want to do long term.",
    details: [
      "This could become a collection page for prototypes around environmental monitoring, geospatial analysis, or robotics-enabled field systems.",
      "Even if some of these are early, the page can communicate your direction clearly and help recruiters understand what you want to build long term.",
      "We can later break this into multiple individual project pages if you want each concept to stand alone.",
    ],
    tags: ["AI", "Climate", "Robotics"],
  },
  {
    slug: "graphics-garden",
    title: "Graphics Garden",
    subtitle: "Interactive graphics experiment inspired by natural systems",
    period: "Dec '25",
    summary:
      "An interactive graphics concept inspired by natural growth and simulation. It gives me a way to explore computer graphics while staying close to the nature theme of the site.",
    details: [
      "This can represent your interest in computer graphics while still fitting the broader nature-focused tone of the site.",
      "It could involve shaders, procedural animation, or a browser-based visualization of plant or terrain behavior.",
      "Even as a concept, it helps signal that your interests span both systems-heavy engineering and visual computation.",
    ],
    tags: ["Graphics", "WebGL", "Simulation", "Creative Coding"],
  },
];

export const extracurriculars: DetailEntry[] = [
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
    slug: "project-lift-campus-initiative",
    title: "Project LIFT",
    subtitle: "Founding team / campus initiative",
    period: "Current",
    imageSrc: "/extracurriculars/projectlift.png",
    imageAlt: "Project LIFT logo",
    summary:
      "Helped found Project LIFT, a campus initiative that reflects my interest in building ambitious and mission-driven things with other students.",
    details: [
      "This page can explain how Project LIFT started, what the organization is building toward, and what your role has been in shaping it.",
      "It is also a strong place to show leadership, initiative, and the kinds of communities you want to build around big ideas.",
      "We can expand this with your exact responsibilities, milestones, and why the group matters to you.",
    ],
    tags: ["Leadership", "Initiative", "Campus"],
  },
];
