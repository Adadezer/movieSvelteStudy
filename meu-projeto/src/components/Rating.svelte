<script lang="ts">
	import { prefersReducedMotion, Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { nav } from '$lib/state/navigation.svelte';

	let { rating, size = 42 }: { rating: number; size?: number } = $props();

	// Espessura e raio derivam do tamanho, para o anel funcionar em qualquer escala.
	const stroke = $derived(Math.max(3, Math.round(size * 0.075)));
	const radius = $derived(size / 2 - stroke);
	const circumference = $derived(2 * Math.PI * radius);
	const fontSize = $derived(Math.max(11, Math.round(size * 0.26)));

	// Começa em 0 e persegue a nota real.
	const classification = new Tween(0, { duration: 900, easing: cubicOut });

	$effect(() => {
		// Durante uma view transition a tela fica congelada na foto antiga — animar
		// aqui seria invisível. Esperamos a flag baixar para o anel preencher à vista.
		if (nav.transitioning) return;

		classification.set(rating, {
			duration: prefersReducedMotion.current ? 0 : 900
		});
	});

	const color = $derived(
		rating === 0
			? '#9099a2' // sem avaliação: a API mandou null, não é nota zero
			: rating < 6.5
				? '#e0574d'
				: rating < 8
					? '#dda32c'
					: '#4fb477'
	);
</script>

<!-- Sem posicionamento próprio: quem usa decide onde o anel fica. -->
<div class="relative shrink-0" style="width: {size}px; height: {size}px">
	<svg width={size} height={size} viewBox="0 0 {size} {size}" class="-rotate-90">
		<!-- trilho: o anel de fundo, sempre completo -->
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="rgb(3 7 18 / 0.8)"
			stroke="rgb(31 41 55)"
			stroke-width={stroke}
		/>
		<!-- progresso: o anel que preenche -->
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="none"
			stroke={color}
			stroke-width={stroke}
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={circumference * (1 - classification.current / 10)}
		/>
	</svg>

	<!-- o número, centralizado por cima do SVG -->
	<span
		class="absolute inset-0 flex items-center justify-center font-bold"
		style="color: {color}; font-size: {fontSize}px"
	>
		{classification.current.toFixed(1)}
	</span>
</div>
