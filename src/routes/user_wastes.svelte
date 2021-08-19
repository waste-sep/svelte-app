<script lang="ts">
	import { _ } from 'svelte-i18n';
	import WasteCard from '$lib/components/UserInterfaces/Card/WasteCard/WasteCard.svelte';

	import { wastes } from '../lib/constants/mockedData';
</script>

<svelte:head>
	<title>Senior Project Extended: Waste</title>
</svelte:head>

<div class="p-4">
	<!-- Dropdown section -->
	<div class="bg-red-200">
		<p>Selecting waste type section (dropdown)</p>
	</div>

	<!-- Wastes section -->
	<div class="mt-3 grid grid-cols-6 gap-4">
		{#each wastes as waste}
			<WasteCard name={waste.name} image={waste.image} type={waste.type} />
		{/each}
	</div>
</div>
