export interface CtaLink {
	label: string;
	href: string;
}

export interface ExternalProfileLinks {
	github: string;
	linkedin: string;
	stackoverflow: string;
}

export interface BrandData {
	name: string;
	tag: string;
	role: string;
}

export interface HeroData {
	title: string;
	subtitle: string;
	location: string;
	yearsExperience: string;
	stack: string[];
	availability: string;
	primaryCta: CtaLink;
	secondaryCta: CtaLink;
	profiles: ExternalProfileLinks;
}

export interface ImpactMetric {
	value: string;
	label: string;
	context: string;
}

export interface HighlightsData {
	metrics: ImpactMetric[];
	strengths: string[];
	toolbox: string[];
	componentSystem: string[];
	now: string[];
}

export interface ExperienceItem {
	company: string;
	role: string;
	period: string;
	bullets: string[];
}

export interface ProjectLinks {
	live: string;
	repo: string;
	caseStudy: string;
}

export interface ProjectItem {
	slug: string;
	name: string;
	blurb: string;
	problem: string;
	approach: string;
	result: string;
	tech: string[];
	links: ProjectLinks;
}

export interface ProjectsData {
	featured: ProjectItem[];
	all: ProjectItem[];
}

export interface SkillsData {
	frontend: string[];
	backend: string[];
	tooling: string[];
}

export interface ContactData {
	headline: string;
	email: string;
	availabilityNote: string;
	links: {
		linkedin: string;
		github: string;
		whatsapp: string;
		calendar: string;
	};
}

export interface SeoData {
	title: string;
	description: string;
	siteUrl: string;
	image: string;
}

export interface PortfolioData {
	brand: BrandData;
	hero: HeroData;
	highlights: HighlightsData;
	experience: ExperienceItem[];
	projects: ProjectsData;
	skills: SkillsData;
	contact: ContactData;
	seo: SeoData;
}

export interface NavSection {
	id: string;
	label: string;
}
