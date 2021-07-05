<script context="module" lang="ts">
	import { authGuard } from '$lib/guards';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ page, fetch, session, context }: LoadInput): Promise<LoadOutput> {
		return await authGuard({ page, fetch, session, context });
	}
</script>

<script lang="ts">
	import '../app.postcss';
	import { faHome, faSearch, faGlobe, faChartLine } from '@fortawesome/free-solid-svg-icons';
	import GlobalErrorHandler from '$lib/components/ErrorHandler/index.svelte';
	import Sidepanel from '$lib/components/Navigation/Sidepanel/index.svelte';
	import Bottombar from '$lib/components/Navigation/Bottombar/index.svelte';
	import LoginModal from '$lib/components/Login/index.svelte';
	import Loading from '$lib/components/Loading/index.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { onMount, setContext } from 'svelte';
	import { SCREENSIZE } from '$lib/constants/devices';
	import { Translate } from '$lib/services/translateService';
	import type { IPage } from '$lib/models';

	setContext('translate', new Translate());

	let screen: string;
	onMount(async () => {
		screen = window.innerWidth < 1024 ? SCREENSIZE.MOBILE : SCREENSIZE.WEB;
		window.onorientationchange = () => {
			screen = screen === SCREENSIZE.MOBILE ? SCREENSIZE.WEB : SCREENSIZE.MOBILE;
		};
	});

	const pages: IPage[] = [
		{ icon: faHome, url: ROUTES.HOME, key: 'home_page' },
		{ icon: faSearch, url: ROUTES.SEARCH, key: 'search_page' },
		{ icon: faGlobe, url: ROUTES.DISCOVER, key: 'discover_page' },
		{ icon: faChartLine, url: ROUTES.ANALYTICS, key: 'analytics_page' }
	];
</script>

<LoginModal />
<GlobalErrorHandler />
<Loading />
<div class="flex h-screen">
	{#if screen === SCREENSIZE.WEB}
		<Sidepanel {pages} />
	{/if}
	<section class="flex-auto overflow-auto">
		<main class="bg-gray-50 px-10 py-10 min-h-screen" style="transition: 1s">
			<slot />
		</main>
	</section>
	{#if screen === SCREENSIZE.MOBILE}
		<Bottombar {pages} />
	{/if}
</div>
