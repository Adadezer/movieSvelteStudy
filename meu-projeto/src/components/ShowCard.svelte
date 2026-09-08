<script lang="ts">
	import type { Show } from '$lib/types/show';
	import ImageIcon from 'phosphor-svelte/lib/ImageIcon';
	import StarIcon from 'phosphor-svelte/lib/StarIcon';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { nav } from '$lib/state/navigation.svelte';

	let { show, index = 0 }: { show: Show; index?: number } = $props();
</script>

<article
	in:fly|global={{
		y: 20,
		duration: prefersReducedMotion.current || nav.transitioning ? 0 : 500, // "Não anime se o usuário pediu para não animar, ou se o navegador já está animando. Caso contrário, 500ms."
		delay: prefersReducedMotion.current || nav.transitioning ? 0 : index * 50
		// Quando o navegador está animando, o Svelte cede.
		// prefersReducedMotion → acessibilidade. Alguém pode passar mal com movimento.
		//nav.transitioning → coordenação. Já tem outro animando; dois ao mesmo tempo estragam o resultado.
	}}
	class="group relative flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff5820]/50 hover:shadow-xl hover:shadow-[#ff5820]/10"
>
	<!-- Relative para o badge de rating -->
	<div class="relative aspect-2/3 overflow-hidden">
		{#if show.image}
			<img
				src={show.image}
				alt={show.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
				style="view-transition-name: poster-{show.id}"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-gray-800 text-gray-600">
				<ImageIcon size={48} />
			</div>
		{/if}

		<!-- Badge de Nota flutuando no poster -->
		<div
			class="absolute top-3 right-3 flex items-center gap-1 rounded-md border border-gray-800 bg-gray-950/80 px-2 py-1 text-xs font-bold text-yellow-500 backdrop-blur-sm"
		>
			<StarIcon size={14} weight="fill" class="text-yellow-300" />
			{show.rating}
		</div>
	</div>

	<!-- Conteúdo de Texto -->
	<div class="flex flex-1 flex-col p-4">
		<div class="mb-2 flex items-center justify-between text-xs font-medium text-gray-400">
			<span>{show.year}</span>
			{#if show.genres && show.genres.length > 0}
				<div class="flex gap-1">
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
			<a
				href={`/movie/${show.id}`}
				class="w-full rounded-lg bg-gray-800 py-2 text-center text-sm font-semibold text-gray-200 transition-colors duration-200 hover:bg-[#ff5820] hover:text-white"
			>
				Ver detalhes
			</a>
		</div>
	</div>
</article>
