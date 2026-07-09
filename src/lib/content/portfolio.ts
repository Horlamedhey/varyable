import type { PortfolioData } from "$lib/types/portfolio";

const sharedPlaceholderLinks = {
  live: "",
  repo: "",
};

function liveOnlyLinks(live: string) {
  return { live, repo: "" };
}

export const portfolio: PortfolioData = {
  brand: {
    name: "Abdulgafar Ajao",
    tag: "<VaryAble />",
    role: "Senior Frontend Engineer",
  },
  hero: {
    title: "Senior Frontend & Full-Stack Engineer",
    subtitle:
      "I build fast, scalable products with measurable business outcomes, strong frontend architecture, and practical developer experience improvements.",
    location: "Muscat, Oman",
    yearsExperience: "9+ years",
    stack: [
      "SvelteKit",
      "React",
      "Vue",
      "Remix",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Tailwind CSS",
    ],
    availability: "Open to consulting and high-impact product roles",
    primaryCta: {
      label: "View Projects",
      href: "#projects",
    },
    secondaryCta: {
      label: "Download Resume",
      href: "/resume.pdf",
    },
    profiles: {
      github: "https://github.com/horlamedhey",
      linkedin: "https://www.linkedin.com/in/gafar-ajao-21399215b/",
      stackoverflow: "https://stackoverflow.com/users/10773017/abdulgafar-olamide-ajao",
    },
  },
  highlights: {
    metrics: [
      {
        value: "+30%",
        label: "Bookings",
        context: "EuroParcs conversion improvements",
      },
      {
        value: "-15%",
        label: "Cart Abandonment",
        context: "Wovar checkout and performance fixes",
      },
      {
        value: "+35%",
        label: "Engagement",
        context: "De Bijenkorf UX and frontend delivery wins",
      },
    ],
    strengths: [
      "Modern JavaScript and TypeScript ecosystem expertise across React, Vue, and Svelte",
      "Scalable frontend architecture and micro-frontends",
      "Design systems and reusable component libraries",
      "Performance optimization and accessibility",
      "Product-focused engineering with measurable outcomes",
    ],
    toolbox: [
      "SvelteKit / TypeScript",
      "React / Next.js / Remix",
      "Vue / Nuxt",
      "Node.js / GraphQL / REST",
      "CI/CD, Docker, GitHub Actions",
    ],
    componentSystem: [
      "Atomic design approach",
      "60+ reusable UI components",
      "Reusable primitives for forms, cards, and data presentation",
    ],
  },
  experience: [
    {
      company: "Noema",
      role: "Senior Frontend Engineer",
      period: "Feb 2025 - Present",
      bullets: [
        "Build and maintain enterprise-scale development banking applications using React, React Router, React Hook Form, and GraphQL.",
        "Collaborate with designers and backend engineers to deliver seamless experiences, improving dashboard usability by 60%.",
        "Work with two frontend engineers on an in-house library of 30+ reusable, performant components for consistent product UI and developer experience.",
      ],
    },
    {
      company: "Rb2",
      role: "Senior Frontend Engineer (Full-Stack Contributions)",
      period: "Jan 2022 - Sep 2025",
      bullets: [
        "Increased customer engagement by roughly 40% through high-performance React, Next.js, Remix, Vue, and Nuxt systems.",
        "Reduced cart abandonment by roughly 15% and improved booking conversions by roughly 30% across EuroParcs and Wovar.",
        "Halved deployment time and doubled release frequency through GitHub Actions and zero-downtime CI/CD.",
      ],
    },
    {
      company: "PodCreator UG",
      role: "Senior Frontend Engineer",
      period: "May 2024 - Jul 2024",
      bullets: [
        "Led Gistable's frontend architecture and delivery, driving engagement roughly 30% above projections.",
        "Built a reusable system of 40+ React, Vite, Vike, and Tailwind CSS components.",
        "Reduced frontend development time by roughly 40% while improving performance and accessibility.",
      ],
    },
    {
      company: "CodeVillage LLC",
      role: "Senior Mobile Engineer",
      period: "Feb 2024 - May 2024",
      bullets: [
        "Led the PIF React Native application, improving cross-platform performance and responsiveness by roughly 30%.",
        "Achieved roughly 95% test coverage through automated pipelines that reduced production regressions.",
        "Integrated Sentry and reduced bug resolution time by roughly 40%.",
      ],
    },
    {
      company: "Fluidangle LLC",
      role: "Lead Mobile Engineer",
      period: "Sep 2021 - Dec 2021",
      bullets: [
        "Led frontend architecture and UI delivery for cross-platform Flutter applications.",
        "Reduced crashes and increased task completion rates by roughly 35%.",
        "Improved responsive layouts, accessibility, and interactive mobile experiences.",
      ],
    },
    {
      company: "Aitechma",
      role: "Senior Frontend Engineer",
      period: "Jun 2021 - Sep 2021",
      bullets: [
        "Built Zabira's Angular and Tailwind CSS trading experience, increasing development speed by roughly 30%.",
        "Improved engagement by roughly 25% through optimized transaction flows, dashboards, and business logic.",
        "Boosted retention by roughly 15% through data-visualization and usability improvements.",
      ],
    },
    {
      company: "Footprint Intelligence",
      role: "Software Engineering Manager (Hands-on)",
      period: "Sep 2020 - Jan 2022",
      bullets: [
        "Led hands-on delivery of a Vue and Tailwind CSS carbon-emissions platform that helped users reduce environmental impact by roughly 20%.",
        "Increased daily interactions by roughly 35% through a gamified cross-platform Flutter application.",
        "Improved system performance and stability by roughly 35% while reducing database query times by roughly 25%.",
      ],
    },
    {
      company: "Anyskills Inc.",
      role: "Frontend Engineer",
      period: "Jul 2019 - Aug 2020",
      bullets: [
        "Improved frontend data-fetching efficiency by roughly 35% using a Vue.js BFF architecture with REST APIs.",
        "Developed 35+ reusable Vue.js components with Vuex and Vuetify.",
        "Contributed to a consistent design system and improved user experience.",
      ],
    },
    {
      company: "Override Digital Agency",
      role: "Mobile & Full Stack Developer",
      period: "Jul 2017 - Jun 2019",
      bullets: [
        "Integrated four payment gateways and crypto transfer endpoints using Ethers.js.",
        "Reduced transaction latency by roughly 50% through serverless performance improvements.",
        "Improved client conversion rates by roughly 35% through secure, accessible applications.",
      ],
    },
  ],
  projects: {
    featured: [
      {
        slug: "wps-generator",
        name: "WPS Generator",
        blurb:
          "A practical utility product planned for public launch with credibility-focused presentation.",
        impact:
          "Prepared a launch-ready product foundation to support public distribution and trust.",
        tech: [
          "SvelteKit",
          "TypeScript",
          "Tailwind CSS",
          "FastAPI",
          "Python",
          "OpenPyXL",
        ],
        links: {
          live: "https://wps-sif-generator-beryl.vercel.app/",
          repo: "https://github.com/Horlamedhey/wps-sif-generator",
        },
      },
      {
        slug: "europarcs-booking-optimization",
        name: "EuroParcs",
        blurb:
          "Conversion-oriented frontend and UX improvements on booking critical paths.",
        impact: "Delivered measurable +30% booking uplift.",
        tech: ["Vue", "Nuxt", "GraphQL", "Tailwind CSS"],
        links: liveOnlyLinks("https://www.europarcs.com/"),
      },
      {
        slug: "wovar-checkout-performance",
        name: "Wovar",
        blurb:
          "E-commerce performance and checkout-flow stabilization project.",
        impact: "Reduced cart abandonment by 15%.",
        tech: ["Remix", "GraphQL", "TypeScript", "C#"],
        links: liveOnlyLinks("https://www.wovar.com/"),
      },
      {
        slug: "de-bijenkorf-api-efficiency",
        name: "De Bijenkorf",
        blurb: "Backend and frontend query-path optimization effort.",
        impact: "Improved query efficiency by roughly 30%.",
        tech: ["Next.js", "Node.js", "PostgreSQL", "GraphQL"],
        links: liveOnlyLinks("https://www.debijenkorf.nl/"),
      },
    ],
    all: [
      {
        slug: "wps-generator",
        name: "WPS Generator",
        blurb: "Public-facing utility product with trust-centric presentation.",
        impact:
          "Positioned for public launch with portfolio-backed credibility.",
        tech: [
          "SvelteKit",
          "TypeScript",
          "Tailwind CSS",
          "FastAPI",
          "Python",
          "OpenPyXL",
        ],
        links: {
          live: "https://wps-sif-generator-beryl.vercel.app/",
          repo: "https://github.com/Horlamedhey/wps-sif-generator",
        },
      },
      {
        slug: "high-frequency-trading-terminal",
        name: "High-Frequency Trading Terminal",
        blurb:
          "A real-time Flutter terminal engineered for reliable high-frequency trade streams.",
        impact:
          "Handled 20-100 events per second with O(1) rolling analytics, bounded UI updates, and deterministic unit, integration, and golden tests.",
        tech: [
          "Flutter",
          "Dart",
          "Riverpod",
          "Clean Architecture",
          "Deterministic Testing",
        ],
        links: {
          live: "",
          repo: "https://github.com/Horlamedhey/trading",
        },
      },
      {
        slug: "atomic-ui-platform",
        name: "Atomic UI Library",
        blurb:
          "Design-system initiative powering consistent, reusable product interfaces.",
        impact: "Improved consistency and reduced frontend development time.",
        tech: [
          "Tailwind CSS",
          "TypeScript",
          "Storybook",
          "Component Architecture",
        ],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "europarcs-booking-optimization",
        name: "EuroParcs",
        blurb:
          "Conversion-oriented frontend and UX improvements on booking critical paths.",
        impact: "Delivered measurable +30% booking uplift.",
        tech: ["Vue", "Nuxt", "GraphQL", "Tailwind CSS"],
        links: liveOnlyLinks("https://www.europarcs.com/"),
      },
      {
        slug: "wovar-checkout-performance",
        name: "Wovar",
        blurb:
          "E-commerce performance and checkout-flow stabilization project.",
        impact: "Reduced cart abandonment by 15%.",
        tech: ["Remix", "GraphQL", "TypeScript", "C#"],
        links: liveOnlyLinks("https://www.wovar.com/"),
      },
      {
        slug: "core-connect-landing",
        name: "Core Connect",
        blurb: "SaaS landing page with conversion-focused interaction design.",
        impact: "Increased lead conversions by 40%.",
        tech: ["React", "Tailwind CSS", "Analytics"],
        links: liveOnlyLinks("https://coreconnect.com/"),
      },
      {
        slug: "de-bijenkorf-api-efficiency",
        name: "De Bijenkorf",
        blurb: "Backend and frontend query-path optimization effort.",
        impact: "Improved query efficiency by roughly 30%.",
        tech: ["Next.js", "Node.js", "PostgreSQL", "GraphQL"],
        links: liveOnlyLinks("https://www.debijenkorf.nl/"),
      },
      {
        slug: "gistable-mvp",
        name: "Gistable",
        blurb:
          "MVP product architecture and UI system built for fast validation.",
        impact: "User engagement exceeded initial estimates by around 30%.",
        tech: ["React", "Redux", "Vite", "Tailwind CSS"],
        links: {
          live: "",
          repo: "",
          liveComingSoon: true,
        },
      },
      {
        slug: "pif-mobile-app",
        name: "PIF Mobile App",
        blurb: "Cross-platform mobile engineering and stability modernization.",
        impact: "Delivered performance gains and improved app reliability.",
        tech: ["React Native", "Sentry", "Automated Testing"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "zabira-web-platform",
        name: "Zabira",
        blurb:
          "Crypto and gift-card trading platform with improved transaction UX.",
        impact: "Drove stronger engagement and retention metrics.",
        tech: ["Angular", "Tailwind CSS", "Dashboard UX"],
        links: liveOnlyLinks("https://www.zabira.com/"),
      },
      {
        slug: "carbon-tracking-web",
        name: "FootPrint",
        blurb: "Web experience for emissions tracking and action planning.",
        impact: "Improved user engagement and operational scalability.",
        tech: [
          "Vue",
          "Nuxt",
          "Flutter",
          "Tailwind CSS",
          "Firebase",
          "MongoDB Realm",
        ],
        links: liveOnlyLinks("https://www.footprint-intelligence.com/"),
      },
    ],
  },
  skills: {
    frontend: [
      "SvelteKit",
      "React",
      "Vue",
      "Angular",
      "Next.js",
      "Remix",
      "Nuxt",
    ],
    backend: [
      "Node.js",
      "NestJS",
      "GraphQL",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
    ],
    tooling: [
      "Tailwind CSS",
      "GitHub Actions",
      "Docker",
      "AWS",
      "Firebase",
      "Figma",
      "Zeplin",
    ],
  },
  contact: {
    headline: "Let's build something impactful and production-grade.",
    email: "hello@varyable.dev",
    availabilityNote: "Typical response window: within 24 hours.",
    links: {
      linkedin: "https://www.linkedin.com/in/gafar-ajao-21399215b/",
      github: "https://github.com/horlamedhey",
      whatsapp: "",
      calendar: "",
    },
  },
  seo: {
    title: "Abdulgafar Ajao ‹VaryAble/› | Senior Frontend & Full-Stack Engineer",
    description:
      "Portfolio of Abdulgafar Ajao showcasing production-grade frontend engineering, measurable business outcomes, and selected projects.",
    siteName: "VaryAble",
    siteUrl: "https://varyable.dev/",
    image: "https://varyable.dev/og-image.png",
  },
};
