<script lang="ts">
	let { searchShow = $bindable() }: { searchShow: string } = $props();
</script>

<div class="mb-15 flex justify-center gap-2">
	<input
		type="text"
		placeholder="digite o nome do programa"
		class="rounded-md border border-[#ff5820] p-0.5"
		bind:value={searchShow}
	/>
	<button class="rounded-md bg-[#ff5820] px-3 py-1">Buscar</button>
</div>
