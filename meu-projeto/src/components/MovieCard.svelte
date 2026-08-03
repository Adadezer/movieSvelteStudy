<script lang="ts">
	type Movie = {
		id: number;
		title: string;
		rating: number;
		year: number;
	};

	let { movie }: { movie: Movie } = $props();
</script>

<div
	class="mb-5 flex w-fit gap-2 rounded-md border border-[#ff5820] p-2 shadow-md shadow-[#393837]"
>
	<p>🎬 {movie.title}</p>
	<p>⭐ {movie.rating}</p>
	<p>ano: {movie.year}</p>
</div>
