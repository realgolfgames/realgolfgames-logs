import { connectToDatabase } from './db';
import { AuditLog } from './model';

interface LogData {
	userId: string;
	action: string;
	details?: string;
	ipAddress?: string;
	userAgent?: string;
}

export async function logAction(logData: LogData) {
	await connectToDatabase();

	const log = new AuditLog({
		userId: logData.userId,
		action: logData.action,
		details: logData.details,
		ipAddress: logData.ipAddress,
		userAgent: logData.userAgent
	});

	await log.save();
}
