<script lang="ts">
	import ShowCard from '../components/ShowCard.svelte';
	import Search from '../components/Search.svelte';
	import type { Show } from '$lib/types/show';

	let showList = $state<Show[]>([]);

	let search = $state('');
	let filteredShows = $derived(
		showList.filter((show) => show.title.toLowerCase().includes(search.toLowerCase()))
	);

	import { getShows } from '$lib/api/tvmaze';
	import { onMount } from 'svelte';

	onMount(async () => {
		const data = await getShows();
		console.log(data);
	});
</script>

<div class="p-2">
	<Search bind:searchShow={search} />
	{#each filteredShows as show}
		<ShowCard {show} />
	{/each}
</div>
