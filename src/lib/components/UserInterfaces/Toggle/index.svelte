<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let placeholder = 'toggle_placeholder';
	export let checked = false;
	export let onChangeFn = (e: any) => {
		e;
	};
</script>

<div class="flex flex-grow-0">
	<label class="flex items-center cursor-pointer">
		<input
			bind:checked
			class="relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none cursor-pointer"
			type="checkbox"
			on:change={(e) => onChangeFn(e)}
		/>
		<span class="ml-2">{$_(placeholder)}</span>
	</label>
</div>

<style>
	input:before {
		content: '';
		position: absolute;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		top: 0;
		left: 0;
		transform: scale(1.1);
		box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.2);
		background-color: white;
		transition: 0.2s ease-in-out;
	}

	input:checked {
		background-color: #7f9cf5;
	}

	input:checked:before {
		left: 1.25rem;
	}
</style>
