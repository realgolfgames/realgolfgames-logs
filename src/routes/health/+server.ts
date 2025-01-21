import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({ message: 'Servive Healthy', status: 200 }), { status: 200 });
};
