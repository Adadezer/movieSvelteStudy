<script lang="ts">
	import type { Show } from '$lib/types/show';

	let { show }: { show: Show } = $props();
</script>

<article
	class="group relative flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff5820]/50 hover:shadow-xl hover:shadow-[#ff5820]/10"
>
	<!-- Container da Imagem com Aspect Ratio de Poster (2:3) -->
	<div class="relative aspect-2/3 overflow-hidden">
		<img
			src={show.image}
			alt={show.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>

		<!-- Badge de Nota flutuando no poster -->
		<div
			class="absolute top-3 right-3 flex items-center gap-1 rounded-md border border-gray-800 bg-gray-950/80 px-2 py-1 text-xs font-bold text-yellow-500 backdrop-blur-sm"
		>
			⭐ {show.rating}
		</div>
	</div>

	<!-- Conteúdo de Texto -->
	<div class="flex flex-1 flex-col p-4">
		<div class="mb-2 flex items-center justify-between text-xs font-medium text-gray-400">
			<span>{show.year}</span>
			<!-- 1. Verifica se a lista de gêneros existe e tem itens -->
			{#if show.genres && show.genres.length > 0}
				<div class="flex gap-1">
					<!-- 2. Usando o bloco {#each} correto do Svelte em vez do .map() do React -->
					{#each show.genres as genre}
						<span class="rounded bg-gray-800 px-1.5 py-0.5 text-[#ff5820]/90">
							{genre}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Título com limite de 2 linhas para não quebrar o layout se for muito longo -->
		<h3
			class="line-clamp-2 text-base font-bold text-gray-100 transition-colors duration-200 group-hover:text-[#ff5820]"
		>
			{show.title}
		</h3>

		<!-- Espaçador elástico para empurrar o botão sempre para o rodapé do card -->
		<div class="flex flex-1 items-end pt-4">
			<button
				class="w-full rounded-lg bg-gray-800 py-2 text-center text-sm font-semibold text-gray-200 transition-colors duration-200 hover:bg-[#ff5820] hover:text-white"
			>
				Ver detalhes
			</button>
		</div>
	</div>
</article>
