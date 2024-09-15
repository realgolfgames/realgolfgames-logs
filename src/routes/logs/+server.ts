import { logAction } from '$lib/logging';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const body = await request.json();

	await logAction({
		userId: body.userId || 'anonymous',
		action: body.action,
		details: body.details,
		ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('remote_addr'),
		userAgent: request.headers.get('user-agent')
	});

	return json({ message: 'Log entry created' });
}
