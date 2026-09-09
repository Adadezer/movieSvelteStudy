<script lang="ts">
	import SortAscendingIcon from 'phosphor-svelte/lib/SortAscendingIcon';
	let { sort = $bindable() }: { sort: string } = $props();
</script>

<div class="mb-15 flex justify-center">
	<div class="relative">
		<SortAscendingIcon
			size={20}
			color="#ff5820"
			class="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2"
		/>
		<select
			bind:value={sort}
			class="rounded-md border border-[#ff5820] py-1 pr-3 pl-8 text-left hover:bg-neutral-700 hover:text-white"
		>
			<option value="" disabled>Ordenar por</option>
			<option value="rating">Ordenar por avaliação</option>
			<option value="name">Ordenar por nome</option>
			<option value="none">Sem ordem</option>
		</select>
	</div>
</div>
