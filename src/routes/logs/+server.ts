import { logAction } from '$lib/server/logging';

export async function POST({ request }) {
	console.log(request);
	const body = await request.json();

	await logAction({
		userId: body.userId || 'anonymous',
		action: body.action,
		details: body.details,
		ipAddress:
			request.headers.get('x-forwarded-for') ?? request.headers.get('remote_addr') ?? undefined,
		userAgent: request.headers.get('user-agent') ?? undefined
	});

	return new Response(JSON.stringify({ message: 'Log entry created', body, request }), {
		status: 201
	});
}
