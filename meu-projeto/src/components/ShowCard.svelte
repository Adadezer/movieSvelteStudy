<script lang="ts">
	import type { Show } from '$lib/types/show';

	let { show }: { show: Show } = $props();
</script>

<div
	class="mb-5 flex w-fit gap-2 rounded-md border border-[#ff5820] p-2 shadow-md shadow-[#393837]"
>
	<p>🎬 {show.title}</p>
	<p>⭐ {show.rating}</p>
	<p>ano: {show.year}</p>
</div>
