<script lang="ts">
	import ShowCard from '../components/ShowCard.svelte';
	import Search from '../components/Search.svelte';
	import type { Show, TVMazeSearchResult } from '$lib/types/show';

	// let showList = $state<Show[]>([]);
	let showList = $state<TVMazeSearchResult[]>([]);

	let search = $state('');
	// let filteredShows = $derived(
	// 	showList.filter((show) => show.title.toLowerCase().includes(search.toLowerCase()))
	// );

	import { getShows } from '$lib/api/tvmaze';
	import { onMount } from 'svelte';

	onMount(async () => {
		const data = await getShows();
		showList = data;

		console.log('Shows carregados:', showList); // Log para verificar os dados carregados
	});
</script>

<div class="min-h-screen p-6 text-gray-100 antialiased">
	<!-- Área de Busca -->
	<div class="mx-auto mb-10 max-w-7xl text-center">
		<h1 class="mb-4 text-3xl font-extrabold tracking-tight text-[#ff5820] md:text-4xl">
			Pipoca Flix
		</h1>
		<h3 class="mb-20 text-xl font-light tracking-tight text-neutral-200 md:text-xl">
			Veja sobre seus filmes e séries favoritos
		</h3>
		<Search bind:searchShow={search} />
	</div>

	<!-- GRID RESPONSIVO: 1 coluna no mobile, 2 em telas médias, 3 em grandes e 4 em extra grandes -->
	<main
		class="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
	>
		{#each showList as show (show.id)}
			<ShowCard {show} />
		{:else}
			<!-- Estado vazio caso a busca não encontre nada -->
			<div class="col-span-full py-20 text-center text-gray-500">
				<p class="text-xl">Nenhum resultado encontrado para "{search}"</p>
			</div>
		{/each}
	</main>
</div>
