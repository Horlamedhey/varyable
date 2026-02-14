<script lang="ts">
	let { year } = $props<{ year: number }>();
</script>

<footer class="mx-auto mt-16 max-w-6xl border-t border-(--border) px-4 pb-8 pt-6 text-xs text-(--muted) sm:px-6 lg:px-8">
	<div class="flex flex-wrap items-center justify-between gap-2">
		<p>© {year} AbdulGafar / VaryAble. Built with SvelteKit + Tailwind CSS.</p>
		<p>Production-minded frontend engineering.</p>
	</div>
</footer>
