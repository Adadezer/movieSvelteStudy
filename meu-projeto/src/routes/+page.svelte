<script lang="ts">
	import ShowCard from '../components/ShowCard.svelte';
	import Search from '../components/Search.svelte';
	import { getShows, searchShows } from '$lib/api/tvmaze';
	import { createQuery } from '@tanstack/svelte-query';

	let search = $state('');

	let debouncedSearch = $state('');

	$effect(() => {
		const query = search; // leitura rastreada — NÃO remover
		const timer = setTimeout(() => (debouncedSearch = query), 350);
		return () => clearTimeout(timer);
	});

	const showsQuery = createQuery(() => ({
		queryKey: ['shows', debouncedSearch],
		queryFn: () => (debouncedSearch.trim() !== '' ? searchShows(debouncedSearch) : getShows())
	}));

	console.log('showsQuery: ', showsQuery);
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
		{#if showsQuery.isLoading}
			<div class="col-span-full py-20 text-center text-gray-500">
				<p class="text-xl">Carregando...</p>
			</div>
		{:else if showsQuery.isError}
			<div class="col-span-full py-20 text-center text-gray-500">
				<p class="text-xl">Erro ao carregar os dados. Tente novamente mais tarde.</p>
			</div>
		{:else}
			{#each showsQuery.data as show (show.id)}
				<ShowCard {show} />
			{:else}
				<!-- Estado vazio caso a busca não encontre nada -->
				<div class="col-span-full py-20 text-center text-gray-500">
					<p class="text-xl">Nenhum resultado encontrado para "{search}"</p>
				</div>
			{/each}
		{/if}
	</main>
</div>
