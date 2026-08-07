<script lang="ts">
	import ShowCard from '../components/ShowCard.svelte';
	import Search from '../components/Search.svelte';
	import type { Show } from '$lib/types/show';
	import { getShows, searchShows } from '$lib/api/tvmaze';

	let showList = $state<Show[]>([]);

	let search = $state('');

	let timer: ReturnType<typeof setTimeout>;

	async function loadShows() {
		let data;
		if (search.trim() !== '') {
			data = await searchShows(search);
		} else {
			data = await getShows();
		}

		showList = data;
	}

	$effect(() => {
		search; // Dependência para re-executar o efeito quando a busca mudar
		timer = setTimeout(() => loadShows(), 500);
		return () => clearTimeout(timer);
	});
</script>

<div class="min-h-screen p-6 text-gray-100 antialiased">
	<!-- Área de Busca -->
	<div class="mx-auto mb-10 max-w-7xl text-center">
		<h1 class="mb-4 text-3xl font-extrabold tracking-tight text-[#ff5820] md:text-4xl">
			🍿 Pipoca Flix
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
