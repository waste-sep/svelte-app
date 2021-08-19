<script>
	import { _ } from 'svelte-i18n';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';

	import Fa from '../../Fa/index.svelte';

	export let name;
	export let type;
	export let image;

	const wasteKeyType = {
		recycle: 'wastecard__btn_type_recycle',
		no_recycle: 'wastecard__btn_type_no_recycle'
	};
</script>

<div class="bg-white p-5 flex flex-col align-middle justify-around rounded-md shadow-md">
	<img src={image} alt="Waste" class="w-36 h-36 mx-auto rounded-full object-cover" />
	<h3 class="text-xl text-gray-800 text-center font-medium p-3 my-1">{$_(name)}</h3>
	<div class="flex justify-center bg-gradient-to-r from-green-700 to-green-400 p-2 rounded-sm">
		<div class="mr-3">
			<Fa icon={faTrash} color="#fff" size="1.1x" />
		</div>
		<p class="text-sm font-medium text-white">{$_(wasteKeyType[type])}</p>
	</div>
</div>
