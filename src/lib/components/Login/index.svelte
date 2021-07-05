<script lang="ts">
	import Fa from '$lib/components/UserInterfaces/Fa/index.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { EModalSize } from '$lib/components/UserInterfaces/Modal/model';
	import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
	import { faGoogle } from '@fortawesome/free-brands-svg-icons';
	import {
		loginModalShown$,
		isLogin$,
		toggleLoginModal,
		setIsLogin,
		setUserProfile,
		setIsLoading
	} from '$lib/store';
	import LoginModal from '$lib/components/UserInterfaces/Modal/ConfirmModal/index.svelte';
	import { apiGetAuthentication, apiPostAuthentication } from '$lib/api/authentication';
	import { auth, provider } from '$lib/services/firebase';
	import { ROUTES } from '$lib/constants/routes';

	onMount(() => {
		auth.onAuthStateChanged(async (user) => {
			if (!user || $isLogin$) return;

			setIsLoading(true);
			const response = await apiGetAuthentication();
			setIsLogin(true);
			setIsLoading(false);

			if (response.new) {
				await apiPostAuthentication(user.displayName, user.phoneNumber, user.photoURL);
				setUserProfile(user.displayName, user.phoneNumber, user.photoURL);
				goto(ROUTES.SETTINGS);
				return;
			}

			setUserProfile(response.fullname, response.phonenumber, response.photourl);
		});
	});

	function handleLoginWithGoogle() {
		auth.signInWithPopup(provider);
		toggleLoginModal();
	}
</script>

{#if $loginModalShown$ && !$isLogin$}
	<LoginModal
		icon={faSignInAlt}
		heading="Login"
		size={EModalSize.LG}
		on:clickBg={() => toggleLoginModal()}
	>
		<button
			class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded"
			on:click={() => handleLoginWithGoogle()}
		>
			<div class="inline-flex space-x-2">
				<p>Login With</p>
				<Fa class="mt-1" icon={faGoogle} />
			</div>
		</button>
	</LoginModal>
{/if}
