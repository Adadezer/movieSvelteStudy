<script lang="ts">
	import ShowCard from '../components/ShowCard.svelte';
	import Search from '../components/Search.svelte';
	import { getTVMazeShows, searchShows } from '$lib/api/tvmaze';
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import SpinnerGapIcon from 'phosphor-svelte/lib/SpinnerGapIcon';
	import XCircleIcon from 'phosphor-svelte/lib/XCircleIcon';
	import ArrowLeftIcon from 'phosphor-svelte/lib/ArrowLeftIcon';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import { page as currentPage } from '$app/state';
	import { replaceState } from '$app/navigation';

	const initialSearch = currentPage.url.searchParams.get('q') ?? '';
	const initialPage = Number(currentPage.url.searchParams.get('page')) || 1;

	let search = $state(initialSearch);
	let debouncedSearch = $state(initialSearch);
	let page = $state(initialPage); // página atual

	let initialized = false;

	$effect(() => {
		const query = search;

		const timer = setTimeout(() => {
			debouncedSearch = query;

			// Ignora a execução inicial para não alterar a URL ao carregar a página.
			if (!initialized) {
				initialized = true;
				return;
			}

			// Toda nova pesquisa começa na primeira página.
			page = 1;

			// Cria uma cópia da URL atual para atualizar seus parâmetros.
			const url = new URL(window.location.href);

			if (query.trim()) {
				url.searchParams.set('q', query.trim());
			} else {
				url.searchParams.delete('q');
			}

			// Remove a página anterior, pois uma nova pesquisa começa na página 1.
			url.searchParams.delete('page');

			// Atualiza a URL sem criar uma nova entrada no histórico do navegador.
			replaceState(url, {});
		}, 350);

		return () => clearTimeout(timer);
	});

	function changePage(newPage: number) {
		page = newPage;

		const url = new URL(window.location.href);

		if (newPage === 1) {
			url.searchParams.delete('page');
		} else {
			url.searchParams.set('page', String(newPage));
		}

		replaceState(url, {});
	}

	const showsQuery = createInfiniteQuery(() => ({
		queryKey: ['shows', debouncedSearch],

		queryFn: ({ pageParam }) =>
			debouncedSearch.trim() !== '' ? searchShows(debouncedSearch) : getTVMazeShows(pageParam),

		initialPageParam: 0,

		getNextPageParam: (lastPage, allPages) => {
			if (debouncedSearch.trim() !== '') {
				return undefined;
			}

			if (lastPage.length === 0) {
				return undefined;
			}

			return allPages.length;
		}
	}));

	const allShows = $derived(showsQuery.data?.pages.flat() ?? []);

	const pageShows = $derived(allShows.slice((page - 1) * 20, page * 20));

	$effect(() => {
		const requiredShows = page * 20;

		if (
			requiredShows > allShows.length &&
			showsQuery.hasNextPage &&
			!showsQuery.isFetchingNextPage
		) {
			showsQuery.fetchNextPage();
		}
	});

	const hasNextPageUI = $derived(pageShows.length === 20);
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
			<div
				class="col-span-full flex flex-col items-center justify-center gap-2 py-20 text-center text-gray-500"
			>
				<SpinnerGapIcon size={30} class="animate-[spin_3s_linear_infinite]" />
				<p class="text-xl">Carregando</p>
			</div>
		{:else if showsQuery.isError}
			<div
				class="col-span-full flex flex-col items-center justify-center gap-2 py-20 text-center text-gray-500"
			>
				<XCircleIcon size={32} />
				<p class="text-xl">Erro ao carregar os dados.</p>
				<p class="text-md">Tente novamente mais tarde.</p>
			</div>
		{:else}
			{#each pageShows as show (show.id)}
				<ShowCard {show} />
			{:else}
				<div class="col-span-full py-20 text-center text-gray-500">
					<p class="text-xl">Nenhum resultado encontrado para "{search}"</p>
				</div>
			{/each}
		{/if}
	</main>

	<!-- Paginação fora do <main>: dentro dele, cada botão virava uma célula do grid -->
	<div class="mx-auto mt-10 flex max-w-7xl items-center justify-center gap-4">
		<button
			onclick={() => changePage(page - 1)}
			disabled={page === 1}
			class="flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-[#ff5820] hover:bg-[#ff5820] hover:text-white disabled:pointer-events-none disabled:opacity-40"
		>
			<ArrowLeftIcon size={14} weight="fill" />
			Anterior
		</button>

		<span class="min-w-10 text-center text-sm font-semibold text-neutral-200">{page}</span>

		<button
			onclick={() => changePage(page + 1)}
			disabled={!hasNextPageUI || showsQuery.isFetchingNextPage}
			class="flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-[#ff5820] hover:bg-[#ff5820] hover:text-white disabled:pointer-events-none disabled:opacity-40"
		>
			Próxima
			<ArrowRightIcon size={14} weight="fill" />
		</button>
	</div>
</div>
