<script lang="ts">
	import MagnifyingGlassIcon from 'phosphor-svelte/lib/MagnifyingGlassIcon';
	let { searchShow = $bindable() }: { searchShow: string } = $props();
</script>

<div class="mb-15 flex justify-center">
	<div class="relative">
		<MagnifyingGlassIcon
			size={20}
			color="#ff5820"
			class="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2"
		/>
		<input
			type="text"
			placeholder="digite o nome para buscar"
			class="rounded-md border border-[#ff5820] py-1 pl-10 text-left"
			bind:value={searchShow}
		/>
	</div>
</div>
