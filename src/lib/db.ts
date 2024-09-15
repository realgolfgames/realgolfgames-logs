import { MONGO_DB_CONNECTION_STRING } from '$env/static/private';
import mongoose from 'mongoose';

export async function connectToDatabase() {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(MONGO_DB_CONNECTION_STRING);
	}
}
