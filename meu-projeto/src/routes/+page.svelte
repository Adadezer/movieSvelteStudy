<script lang="ts">
	import MovieCard from '../components/MovieCard.svelte';
	import Search from '../components/Search.svelte';

	type Movie = {
		id: number;
		title: string;
		rating: number;
		year: number;
	};

	let movieList: Movie[] = [
		{
			id: 1,
			title: 'Vingadores: Ultimato',
			rating: 5,
			year: 2019
		},
		{
			id: 2,
			title: 'Vingadores: Guerra Infinita',
			rating: 4,
			year: 2018
		},
		{
			id: 3,
			title: 'Vingadores: Era de Ultron',
			rating: 3,
			year: 2015
		}
	];
</script>

<div class="p-2">
	<Search />
	{#each movieList as movie}
		<MovieCard {movie} />
	{/each}
</div>
