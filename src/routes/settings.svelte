<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { apiPostAuthentication } from '$lib/api/authentication';
	import { setUserProfile, userProfile$ } from '$lib/store';
	import { getContext, onMount } from 'svelte';
	import Toggle from '$lib/components/UserInterfaces/Toggle/index.svelte';
	import type { Translate } from '$lib/services/translateService';

	let ogName: string;
	let ogPhoneNo: string;
	let ogPhoto: string;
	let editableName: string;
	let editablePhoneNo: string;
	let editablePhoto: string;
	const translate: Translate = getContext('translate');
	const currentLang = translate.currentLang$;

	onMount(() => {
		userProfile$.subscribe((profile) => {
			ogName = profile?.displayName;
			ogPhoneNo = profile?.phoneNumber;
			ogPhoto = profile?.photoUrl;
			editableName = profile?.displayName;
			editablePhoneNo = profile?.phoneNumber;
			editablePhoto = profile?.photoUrl;
		});
	});

	async function changeUserProfile() {
		const response = await apiPostAuthentication(editableName, editablePhoneNo, editablePhoto);
		setUserProfile(response.fullname, response.phonenumber, response.photourl);
	}

	function resetValues() {
		editableName = ogName;
		editablePhoneNo = ogPhoneNo;
		editablePhoto = ogPhoto;
	}
</script>

<div class="text-4xl">{$_('setting_header')}</div>
<input type="text" bind:value={editableName} />
<input type="text" bind:value={editablePhoneNo} />
<button
	on:click={() => changeUserProfile()}
	class="bg-blue-400 hover:bg-yellow-700 text-gray-100 font-bold py-2 px-4 rounded"
>
	Submit
</button>
<button
	on:click={() => resetValues()}
	class="bg-red-400 hover:bg-yellow-700 text-gray-100 font-bold py-2 px-4 rounded"
>
	Reset
</button>

<Toggle onChangeFn={() => translate.changeLang()} placeholder={$currentLang} />
