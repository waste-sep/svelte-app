<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Fa from '$lib/components/UserInterfaces/Fa/index.svelte';
	import {
		faSignInAlt,
		faChevronCircleLeft,
		faChevronCircleRight
	} from '@fortawesome/free-solid-svg-icons';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { isLogin$, toggleLoginModal, userProfile$ } from '$lib/store';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { page } from '$app/stores';
	import type { IPage } from '$lib/models';
	import type { Translate } from '$lib/services/translateService';

	export let pages: IPage[];

	const translate: Translate = getContext('translate');
	const subscription = [];
	let currentPage = '';
	let displayName = '';
	let photoUrl = '';
	let isHidden = false;

	onMount(() => {
		subscription.push(
			userProfile$.subscribe((userProfile) => {
				if (!userProfile) return;
				displayName =
					userProfile.displayName?.length > 20
						? `${userProfile.displayName.slice(0, 18)}...`
						: userProfile.displayName;
				photoUrl = userProfile.photoUrl;
			})
		);
	});

	subscription.push(page.subscribe((p) => (currentPage = p.path)));

	onDestroy(() => subscription.forEach((unsub) => unsub()));
</script>

<div class="min-h-screen bg-white relative">
	<nav class="h-screen flex flex-col bg-gray-100" class:w-64={!isHidden} class:w-full={isHidden}>
		<div class="p-4 text-xl self-center">
			{$_(isHidden ? 'project_name_shortname' : 'project_name_fullname')}
		</div>
		<div class="collapse-icon cursor-pointer" on:click={() => (isHidden = !isHidden)}>
			<Fa
				icon={!isHidden ? faChevronCircleLeft : faChevronCircleRight}
				color="#3c4043"
				size="1.1x"
			/>
		</div>
		<ul class="p-2 space-y-2 flex-1 overflow-auto" style="scrollbar-width: thin;">
			{#each pages as page, i}
				{#if !page.requireLogin || $isLogin$}
					<li>
						<a
							href={page.url}
							class="flex space-x-2 items-center text-gray-600 p-2 rounded-lg {currentPage ===
							page.url
								? 'bg-gray-200'
								: 'hover:text-gray-900 hover:bg-gray-200'}"
							on:click={() => (currentPage = page.url)}
						>
							<Fa class="my-2" icon={page.icon} />
							{#if !isHidden}
								<span class="text-gray-900">{$_(page.key)}</span>
							{/if}
						</a>
					</li>
				{/if}
			{/each}
		</ul>

		{#if !isHidden}
			<div class="p-2 flex items-center border-t-2 border-gray-300 space-x-4">
				{#if $isLogin$}
					<div class="relative inline-flex">
						<span
							class="inline-flex bg-green-500 w-2 h-2 absolute right-0 bottom-0 rounded-full ring-2 ring-white transform translate-x-1/3 translate-y-1/3"
						/>
						<img class="w-8 h-8 object-cover rounded-full" src={photoUrl} alt="pfp" />
					</div>
					<div class="cursor-pointer" on:click={() => goto(ROUTES.SETTINGS)}>
						<h3 class="font-semibold tracking-wide text-gray-800">{displayName}</h3>
						<p class="text-sm text-gray-700">{$_('edit_profile_button')}</p>
					</div>
				{:else}
					<button
						class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded"
						on:click={() => toggleLoginModal()}
					>
						<div class="inline-flex space-x-1">
							<Fa class="mt-1" icon={faSignInAlt} />
							<p>Login</p>
						</div>
					</button>
				{/if}
			</div>
		{/if}
	</nav>
</div>

<style>
	.collapse-icon {
		position: absolute;
		top: 2.5em;
		right: -0.5em;
	}
</style>
