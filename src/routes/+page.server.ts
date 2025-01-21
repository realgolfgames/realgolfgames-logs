import { PUBLIC_YOUR_DOMAIN } from '$env/static/public';
import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	throw redirect(307, PUBLIC_YOUR_DOMAIN);
};
