import type { PortfolioData } from "$lib/types/portfolio";

const sharedPlaceholderLinks = {
  live: "",
  repo: "",
  caseStudy: "",
};

export const portfolio: PortfolioData = {
  brand: {
    name: "AbdulGafar",
    tag: "<VaryAble />",
    role: "Senior Frontend Engineer",
  },
  hero: {
    title: "Senior Frontend & Full-Stack Engineer",
    subtitle:
      "I build fast, scalable products with measurable business outcomes, strong frontend architecture, and practical developer experience improvements.",
    location: "Muscat, Oman",
    yearsExperience: "8+ years",
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
      github: "https://github.com",
      linkedin: "https://www.linkedin.com",
      stackoverflow: "https://stackoverflow.com",
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
      "Performance tuning and Core Web Vitals",
      "Component systems and design-token governance",
      "Accessibility-first UI architecture",
      "Cross-team frontend platform leadership",
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
    now: [
      "Launching WPS Generator publicly with stronger credibility surface",
      "Sharpening production-grade SvelteKit practices",
      "Keeping UX motion subtle, accessible, and outcome-driven",
    ],
  },
  experience: [
    {
      company: "Rb2",
      role: "Senior Full Stack Engineer",
      period: "Jan 2022 - Sep 2025",
      bullets: [
        "Built and maintained high-performance frontend systems across React, Vue, and Svelte products.",
        "Improved release velocity by 2x through CI/CD automation with zero-downtime deployment paths.",
        "Increased customer engagement through cross-functional UX and backend optimization initiatives.",
      ],
    },
    {
      company: "PodCreator UG",
      role: "Senior Frontend Engineer",
      period: "May 2024 - Jul 2024",
      bullets: [
        "Designed MVP architecture and UI patterns for Gistable, outperforming engagement expectations.",
        "Shipped 40+ reusable components that accelerated frontend delivery by roughly 40%.",
        "Elevated performance and accessibility metrics to improve product usability and retention.",
      ],
    },
    {
      company: "CodeVillage LLC",
      role: "Senior Mobile Engineer",
      period: "Feb 2024 - May 2024",
      bullets: [
        "Restructured application architecture to remove instability and improve maintainability.",
        "Integrated real-time observability with Sentry and reduced bug resolution time significantly.",
        "Implemented automated testing strategy targeting production reliability.",
      ],
    },
    {
      company: "Footprint Intelligence",
      role: "Software Engineering Manager",
      period: "Sep 2020 - Jan 2022",
      bullets: [
        "Led a cross-functional team delivering carbon-tracking products across web and mobile.",
        "Improved backend scalability and query performance while maintaining strong UX quality.",
        "Drove adoption through better gamification and data-visualization driven product experiences.",
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
        problem:
          "People need a reliable, low-friction way to generate and manage secure WPS workflows.",
        approach:
          "Built a clean UX with focused flows, dependable validation, and pragmatic architecture.",
        result:
          "Prepared a launch-ready product foundation to support public distribution and trust.",
        tech: ["SvelteKit", "TypeScript", "Tailwind CSS"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "europarcs-booking-optimization",
        name: "EuroParcs Booking Optimization",
        blurb:
          "Conversion-oriented frontend and UX improvements on booking critical paths.",
        problem:
          "High-friction booking experience reduced completed reservations.",
        approach:
          "Refined journey architecture, performance, and usability around key interaction points.",
        result: "Delivered measurable +30% booking uplift.",
        tech: ["React", "Next.js", "A/B Testing"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "wovar-checkout-performance",
        name: "Wovar Checkout Performance",
        blurb:
          "E-commerce performance and checkout-flow stabilization project.",
        problem:
          "Slow interactions and confusing checkout states increased abandonment.",
        approach:
          "Applied targeted performance optimizations and reduced UX friction in critical forms.",
        result: "Reduced cart abandonment by 15%.",
        tech: ["Vue", "Nuxt", "Performance Profiling"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "atomic-ui-platform",
        name: "Atomic UI Platform",
        blurb:
          "Design-system initiative powering consistent, reusable product interfaces.",
        problem:
          "Teams repeatedly rebuilt similar UI and shipped inconsistent experiences.",
        approach:
          "Created reusable atomic components, tokens, and usage patterns.",
        result:
          "Improved consistency and significantly reduced frontend development time.",
        tech: ["Tailwind CSS", "TypeScript", "Component Architecture"],
        links: { ...sharedPlaceholderLinks },
      },
    ],
    all: [
      {
        slug: "wps-generator",
        name: "WPS Generator",
        blurb: "Public-facing utility product with trust-centric presentation.",
        problem: "Lack of reliable and easy-to-use WPS workflow tooling.",
        approach:
          "Designed robust, user-focused flows with strong validation and clear feedback.",
        result:
          "Positioned for public launch with portfolio-backed credibility.",
        tech: ["SvelteKit", "TypeScript", "Tailwind CSS"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "atomic-ui-platform",
        name: "Atomic UI Platform",
        blurb:
          "Design-system initiative powering consistent, reusable product interfaces.",
        problem:
          "Teams repeatedly rebuilt similar UI and shipped inconsistent experiences.",
        approach:
          "Created reusable atomic components, tokens, and usage patterns.",
        result: "Improved consistency and reduced frontend development time.",
        tech: ["Tailwind CSS", "TypeScript", "Component Architecture"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "europarcs-booking-optimization",
        name: "EuroParcs Booking Optimization",
        blurb:
          "Conversion-oriented frontend and UX improvements on booking critical paths.",
        problem:
          "High-friction booking experience reduced completed reservations.",
        approach:
          "Refined journey architecture, performance, and usability around key interaction points.",
        result: "Delivered measurable +30% booking uplift.",
        tech: ["React", "Next.js", "A/B Testing"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "wovar-checkout-performance",
        name: "Wovar Checkout Performance",
        blurb:
          "E-commerce performance and checkout-flow stabilization project.",
        problem:
          "Slow interactions and confusing checkout states increased abandonment.",
        approach:
          "Applied targeted performance optimizations and reduced UX friction in critical forms.",
        result: "Reduced cart abandonment by 15%.",
        tech: ["Vue", "Nuxt", "Performance Profiling"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "core-connect-landing",
        name: "Core Connect Landing",
        blurb: "SaaS landing page with conversion-focused interaction design.",
        problem: "Lead acquisition performance was below growth targets.",
        approach:
          "Built clear value hierarchy, trust blocks, and optimized CTA structure.",
        result: "Increased lead conversions by 40%.",
        tech: ["React", "Tailwind CSS", "Analytics"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "de-bijenkorf-api-efficiency",
        name: "De Bijenkorf API Efficiency",
        blurb: "Backend and frontend query-path optimization effort.",
        problem:
          "Endpoint and query inefficiencies slowed customer-facing features.",
        approach:
          "Refactored endpoint patterns and improved API integration strategy.",
        result: "Improved query efficiency by roughly 30%.",
        tech: ["Node.js", "PostgreSQL", "GraphQL"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "gistable-mvp",
        name: "Gistable MVP",
        blurb:
          "MVP product architecture and UI system built for fast validation.",
        problem: "Need to launch quickly without sacrificing product quality.",
        approach:
          "Established scalable frontend architecture and reusable component system.",
        result: "User engagement exceeded initial estimates by around 30%.",
        tech: ["React", "Redux", "Vite", "Tailwind CSS"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "pif-mobile-app",
        name: "PIF Mobile App",
        blurb: "Cross-platform mobile engineering and stability modernization.",
        problem:
          "Legacy structure caused instability and poor runtime behavior.",
        approach:
          "Restructured app architecture and strengthened quality pipeline.",
        result: "Delivered performance gains and improved app reliability.",
        tech: ["React Native", "Sentry", "Automated Testing"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "zabira-web-platform",
        name: "Zabira Web Platform",
        blurb:
          "Crypto and gift-card trading platform with improved transaction UX.",
        problem: "Transaction flows and dashboards lacked clarity and speed.",
        approach:
          "Built focused interfaces and refined business-logic integrations.",
        result: "Drove stronger engagement and retention metrics.",
        tech: ["Angular", "Tailwind CSS", "Dashboard UX"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "carbon-tracking-web",
        name: "Carbon Tracking Web",
        blurb: "Web experience for emissions tracking and action planning.",
        problem:
          "Users needed practical visibility into footprint reduction opportunities.",
        approach:
          "Led product delivery across frontend UX and cloud-backed data pipelines.",
        result: "Improved user engagement and operational scalability.",
        tech: ["Vue", "Tailwind CSS", "Firebase", "MongoDB Realm"],
        links: { ...sharedPlaceholderLinks },
      },
      {
        slug: "payment-gateway-platform",
        name: "Payment Gateway Platform Integrations",
        blurb:
          "Transaction infrastructure and latency optimization initiative.",
        problem: "Slow payment flows reduced trust and conversion rates.",
        approach:
          "Integrated multiple gateways and optimized backend transaction paths.",
        result: "Reduced transaction latency by around 50%.",
        tech: ["Node.js", "Serverless", "API Integrations"],
        links: { ...sharedPlaceholderLinks },
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
      linkedin: "https://www.linkedin.com",
      github: "https://github.com",
      whatsapp: "",
      calendar: "",
    },
  },
  seo: {
    title: "AbdulGafar </VaryAble> | Senior Frontend & Full-Stack Engineer",
    description:
      "Portfolio of AbdulGafar showcasing production-grade frontend engineering, measurable business outcomes, and selected project case studies.",
    siteUrl: "https://varyable.vercel.app/",
    image: "https://varyable.vercel.app/og-image.svg",
  },
};
