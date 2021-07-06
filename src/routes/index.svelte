<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import WarningModal from '$lib/components/UserInterfaces/Modal/DialogModal/index.svelte';
	import Card from '$lib/components/UserInterfaces/Card/index.svelte';
	import { EModalColorTone } from '$lib/components/UserInterfaces/Modal/model';
	import { faExclamation } from '@fortawesome/free-solid-svg-icons';

	let warningShown = false;
</script>

<svelte:head>
	<title>Senior Project Extended: Home</title>
</svelte:head>

<div class="container mx-auto">
	<Card heading="Heading Card" content="Content Card" tag="News" />

	<button
		on:click={() => (warningShown = !warningShown)}
		class="bg-yellow-100 hover:bg-yellow-200 text-gray-700 font-bold py-2 px-4 rounded"
	>
		Alert
	</button>
</div>

{#if warningShown}
	<WarningModal
		icon={faExclamation}
		colorTone={EModalColorTone.YELLOW}
		heading="Warning"
		confirmBtn="OK"
		on:confirm={() => (warningShown = !warningShown)}
	>
		<p>WARNING!!!</p>
	</WarningModal>
{/if}
