<script lang="ts">
	import type { ContactData } from '$lib/types/portfolio';

	let { contact } = $props<{ contact: ContactData }>();
	let toastVisible = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(contact.email);
			toastVisible = true;
			setTimeout(() => {
				toastVisible = false;
			}, 2000);
		} catch {
			toastVisible = false;
		}
	}
</script>

<article class="hand-card hand-tilt-b relative p-6 sm:p-8">
	<h3 class="text-3xl font-black tracking-[-0.02em] text-(--text)">{contact.headline}</h3>
	<p class="mt-3 text-sm text-(--muted)">{contact.availabilityNote}</p>

	<div class="mt-6 flex flex-wrap gap-3">
		<button class="btn-primary" onclick={copyEmail} type="button">Copy Email</button>
		<a class="btn-secondary" href={`mailto:${contact.email}`}>Send Email</a>
		<a class="btn-secondary" href={contact.links.linkedin} rel="noreferrer" target="_blank">LinkedIn</a>
		<a class="btn-secondary" href={contact.links.github} rel="noreferrer" target="_blank">GitHub</a>
		{#if contact.links.whatsapp}
			<a class="btn-secondary" href={contact.links.whatsapp} rel="noreferrer" target="_blank">WhatsApp</a>
		{/if}
		{#if contact.links.calendar}
			<a class="btn-secondary" href={contact.links.calendar} rel="noreferrer" target="_blank">Schedule Call</a>
		{/if}
	</div>

	{#if toastVisible}
		<p class="absolute right-4 top-4 rounded-full border border-(--accent) bg-(--bg) px-3 py-1 text-xs font-semibold text-(--accent)" role="status">
			Email copied
		</p>
	{/if}
</article>
