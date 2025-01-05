import type { VerifyApiKey } from '@realgolfgames/types';
import crypto from 'crypto';
import { connectToDB } from './db';
import { api_key_model, user_model } from './model';

export async function verifyApiKey(api_key: string, is_internal: boolean = true): VerifyApiKey {
	const connection = await connectToDB();
	const now = new Date();

	if (!connection) {
		return { status: 500, error: 'Failed to connect to database' };
	}

	if (!api_key) {
		return { status: 403, error: 'API key missing' };
	}

	const hashed_api_key = crypto.createHash('sha256').update(api_key).digest('hex');

	const verify_api_key = await api_key_model.findOne({ key: hashed_api_key });

	if (!verify_api_key) {
		return { status: 403, error: 'Invalid API key' };
	}

	if (!verify_api_key || !verify_api_key.enabled || !api_key.startsWith('realgolfgames-')) {
		return { status: 403, error: 'Invalid API key' };
	}

	const user = await user_model.findOne({ _id: verify_api_key.user_id });

	if (!user) {
		return { status: 404, error: 'User not found' };
	}

	if (is_internal && !verify_api_key.internal) {
		return { status: 403, error: 'Invalid API key' };
	}

	if (verify_api_key.last_used === null) {
		verify_api_key.last_used = now;
	}
	verify_api_key.last_used = now;

	if (verify_api_key.internal) {
		return { status: 200, message: 'Internal API key' };
	}

	if (verify_api_key.internal === false && user.api_keys?.usage) {
		if (user.api_keys?.usage.count >= user.api_keys?.usage.limit) {
			if (
				user.api_keys?.usage.last_reset === null ||
				now.getTime() - user.api_keys?.usage.last_reset.getTime() > 2_592_000_000
			) {
				user.api_keys.usage.last_reset = now;
				user.api_keys.usage.count = 0;
			}

			return {
				status: 403,
				error: 'API key limit reached'
			};
		}

		user.api_keys.usage.count++;
		verify_api_key.last_used = now;

		await user.save();
		await verify_api_key.save();
	}

	return { status: 200, message: 'API key verified' };
}
