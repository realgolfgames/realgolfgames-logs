import { verifyApiKey } from '$lib/server/api_key_middleware';
import { connectToDB } from '$lib/server/db';
import Log from '$lib/server/model';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ url, request }) => {
	const api_key = url.searchParams.get('apiKey') ?? '';
	const connection = await connectToDB();
	const body = await request.json();

	if (!connection) {
		return new Response(JSON.stringify({ error: 'Failed to connect to database', status: 500 }), {
			status: 500
		});
	}

	if (!api_key) {
		return new Response(JSON.stringify({ error: 'No API key provided', status: 400 }), {
			status: 400
		});
	}

	const verify_api_key = await verifyApiKey(api_key);

	if (verify_api_key.status !== 200) {
		return new Response(
			JSON.stringify({ error: verify_api_key.error, status: verify_api_key.status }),
			{ status: verify_api_key.status }
		);
	}

	const {
		level,
		message,
		userId,
		action,
		details,
		service,
		statusCode,
		environment,
		correlationId,
		tags
	} = body;

	const { geolocation_data } = await getClientIP();

	details.ipAddress = geolocation_data.query;
	details.ipGeolocation = geolocation_data;

	const log = new Log({
		level,
		message,
		userId,
		action,
		details,
		service,
		statusCode,
		environment,
		correlationId,
		tags
	});

	await log.save();

	return new Response(JSON.stringify({ message: 'Log saved successfully', status: 200 }), {
		status: 200
	});
};

async function getClientIP() {
	const response = await fetch('https://api64.ipify.org?format=json');
	const data = await response.json();

	const geolocation_response = await fetch(`http://ip-api.com/json/${data.ip}?fields=60023103`);
	const geolocation_data = await geolocation_response.json();

	return { geolocation_data };
}
