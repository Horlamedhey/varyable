<script lang="ts">
	import type { HeroData } from '$lib/types/portfolio';

	let { hero } = $props<{ hero: HeroData }>();
</script>

<div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
	<div class="space-y-6">
		<h1 class="text-4xl font-black tracking-[-0.03em] text-(--text) sm:text-5xl lg:text-6xl">AbdulGafar</h1>
		<p class="annotation text-2xl text-(--accent)">{hero.title}</p>
		<p class="max-w-2xl text-lg text-(--muted)">{hero.subtitle}</p>
		<div class="flex flex-wrap items-center gap-3">
			<a class="btn-primary" href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
			<a class="btn-secondary" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<a
				class="social-link-subtle inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-(--text) hover:text-(--accent)"
				href={hero.profiles.github}
				rel="noreferrer"
				target="_blank"
			>
				<svg aria-hidden="true" class="h-4 w-4 text-(--accent)" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.3c-3.4.8-4.1-1.5-4.1-1.5-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 3 1.4 3.7 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.9.2 3.2.8.8 1.2 1.8 1.2 3.1 0 4.8-2.9 5.8-5.6 6.1.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
				</svg>
				GitHub
			</a>
			<a
				class="social-link-subtle inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-(--text) hover:text-(--accent)"
				href={hero.profiles.linkedin}
				rel="noreferrer"
				target="_blank"
			>
				<svg aria-hidden="true" class="h-4 w-4 text-(--accent)" fill="currentColor" viewBox="0 0 24 24">
					<path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.1 0 4.8 2.7 4.8 6.2V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
				</svg>
				LinkedIn
			</a>
			<a
				class="social-link-subtle inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-(--text) hover:text-(--accent)"
				href={hero.profiles.stackoverflow}
				rel="noreferrer"
				target="_blank"
			>
				<svg aria-hidden="true" class="h-4 w-4 text-(--accent)" fill="currentColor" viewBox="0 0 24 24">
					<path d="M17.5 20.5v-6h2v8H4v-8h2v6h11.5ZM8.8 18h6.8v-2H8.8v2Zm.3-3 6.6 1.4.4-2-6.6-1.4-.4 2Zm1.2-3 6.1 2.8.8-1.8-6.1-2.8-.8 1.8Zm1.8-2.8 5.2 4.2 1.3-1.5-5.2-4.2-1.3 1.5ZM15 5.2l-1.6 1.2 4 5.2 1.6-1.2-4-5.2Z" />
				</svg>
				Stack Overflow
			</a>
		</div>
	</div>

	<aside class="hand-card hand-tilt-a relative overflow-hidden p-6 sm:p-8">
		<div class="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-(--accent)/20 blur-3xl" aria-hidden="true"></div>
		<div class="absolute -bottom-10 -left-12 h-36 w-36 rounded-full bg-(--accent-2)/20 blur-3xl" aria-hidden="true"></div>
		<div class="relative space-y-4">
			<h2 class="text-xl font-extrabold text-(--text)">Identity Card</h2>
			<ul class="space-y-3 text-sm text-(--muted)">
				<li><span class="font-semibold text-(--text)">Location:</span> {hero.location}</li>
				<li><span class="font-semibold text-(--text)">Experience:</span> {hero.yearsExperience}</li>
				<li><span class="font-semibold text-(--text)">Availability:</span> {hero.availability}</li>
			</ul>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each hero.stack as skill (skill)}
					<span class="accent-chip">{skill}</span>
				{/each}
			</div>
		</div>
	</aside>
</div>
