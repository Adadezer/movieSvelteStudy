<script lang="ts">
	import StarIcon from 'phosphor-svelte/lib/StarIcon';
	import CalendarIcon from 'phosphor-svelte/lib/CalendarIcon';
	import MonitorPlayIcon from 'phosphor-svelte/lib/MonitorPlayIcon';
	import ArrowLeftIcon from 'phosphor-svelte/lib/ArrowLeftIcon';
	import UserIcon from 'phosphor-svelte/lib/UserIcon';
	import MicrophoneIcon from 'phosphor-svelte/lib/MicrophoneIcon';

	let { data } = $props();

	const show = $derived(data.show);

	const showInfo = $derived([
		{
			titleInfo: 'Nota',
			info: show.rating,
			icon: StarIcon
		},
		{
			titleInfo: 'Ano',
			info: show.year,
			icon: CalendarIcon
		},
		{
			titleInfo: 'Status',
			info: show.status,
			icon: MonitorPlayIcon
		}
	]);

	const cast = $derived(data.cast);
</script>

<div class="min-h-screen p-6 text-gray-100">
	<div class="mx-auto max-w-6xl">
		<div class="mx-auto mb-6 flex max-w-6xl">
			<button
				onclick={() => history.back()}
				class=" flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-[#ff5820] hover:bg-[#ff5820] hover:text-white"
			>
				<ArrowLeftIcon size={14} weight="fill" />
				Voltar
			</button>
		</div>
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
							{#each showInfo as { titleInfo, info, icon: Icon } (titleInfo)}
								<div class="flex items-center gap-1.5">
									<Icon size={14} weight="fill" class="text-yellow-500" />
									<span class="font-semibold text-gray-200">{titleInfo}:</span>
									<span>{info}</span>
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

			<!-- Elenco -->
			{#if cast.length > 0}
				<div class="border-t border-neutral-800 p-8">
					<h2 class="mb-4 text-2xl font-semibold text-[#ff5820]">Elenco</h2>
					<!-- Mesma grade da home: 1 coluna no mobile, 2 no tablet, 3 e 4 no desktop -->
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{#each cast as member (member.id)}
							<article class="group flex h-full items-center gap-3 overflow-hidden">
								<!-- shrink-0: a foto mantém o tamanho, quem cede espaço é o texto -->
								<div class="relative aspect-2/3 w-20 shrink-0 overflow-hidden rounded-lg">
									{#if member.image}
										<img
											src={member.image}
											alt={member.actor}
											class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											loading="lazy"
										/>
									{:else}
										<div
											class="flex h-full w-full items-center justify-center bg-neutral-800 text-neutral-600"
										>
											<UserIcon size={28} />
										</div>
									{/if}
								</div>

								<!-- min-w-0 deixa o texto encolher para o line-clamp poder agir -->
								<div class="flex min-w-0 flex-col gap-5">
									<div class="flex flex-col gap-1">
										{#if member.voice}
											<span
												class="inline-flex w-fit items-center gap-1 rounded-full bg-[#ff5820]/15 px-2 py-0.5 text-xs font-medium text-[#ff5820]"
											>
												<MicrophoneIcon size={12} weight="fill" />
												Voz
											</span>
										{:else}
											<h3 class="text-sm font-semibold text-[#ff5820]">Ator(a):</h3>
										{/if}
										<span class="line-clamp-2 font-semibold text-gray-100">
											{member.actor}
										</span>
									</div>
									<div class="flex flex-col gap-1">
										<h3 class="text-sm font-semibold text-[#ff5820]">Como:</h3>
										<span class="line-clamp-2 text-sm text-neutral-400">{member.character}</span>
									</div>
								</div>
							</article>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
