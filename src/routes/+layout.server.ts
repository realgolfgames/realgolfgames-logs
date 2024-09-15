import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	throw redirect(307, 'https://realgolf.games');
};
