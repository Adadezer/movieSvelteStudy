<script lang="ts">
	import StarIcon from 'phosphor-svelte/lib/StarIcon';
	import CalendarIcon from 'phosphor-svelte/lib/CalendarIcon';
	import MonitorPlayIcon from 'phosphor-svelte/lib/MonitorPlayIcon';
	let { data } = $props();

	const show = $derived(data.show);

	const showInfo = $derived([
		{
			info: 'Nota',
			value: show.rating,
			icon: StarIcon
		},
		{
			info: 'Ano',
			value: show.year,
			icon: CalendarIcon
		},
		{
			info: 'Status',
			value: show.status,
			icon: MonitorPlayIcon
		}
	]);
</script>

<div class="min-h-screen p-6 text-gray-100">
	<div class="mx-auto max-w-6xl">
		<div class="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg">
			<div class="grid gap-8 p-8 md:grid-cols-[300px_1fr]">
				<!-- Poster -->
				<div>
					<img src={show.image} alt={show.title} class="w-full rounded-xl object-cover shadow-lg" />
				</div>

				<!-- Informações -->
				<div class="flex flex-col gap-6">
					<div>
						<h1 class="mb-2 text-4xl font-bold text-[#ff5820]">
							{show.title}
						</h1>

						<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-400">
							{#each showInfo as { info, value, icon: Icon } (info)}
								<div class="flex items-center gap-1.5">
									<Icon size={14} weight="fill" class="text-yellow-500" />
									<span class="font-semibold text-gray-200">{info}:</span>
									<span>{value}</span>
								</div>
							{/each}
						</div>
					</div>

					<div class="flex flex-wrap gap-2">
						{#each show.genres as genre}
							<span class="rounded-full bg-[#ff5820]/15 px-3 py-1 text-sm text-[#ff5820]">
								{genre}
							</span>
						{/each}
					</div>

					<div class="space-y-3">
						<h2 class="text-xl font-semibold">Sinopse</h2>

						<div class="leading-7 text-neutral-300">
							{@html show.summary}
						</div>
					</div>

					{#if show.officialSite}
						<div class="pt-4">
							<a
								href={show.officialSite}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex rounded-lg bg-[#ff5820] px-5 py-3 font-semibold text-white transition hover:brightness-110"
							>
								Site oficial
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
