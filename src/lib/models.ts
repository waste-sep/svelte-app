import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IPage {
	icon?: IconDefinition;
	url: string;
	key: string;
	requireLogin?: boolean;
}
