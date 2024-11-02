import { type Document, Schema, model } from 'mongoose';

interface IAuditLog extends Document {
	userId: string;
	action: string;
	timestamp: Date;
	details?: string;
	ipAddress?: string;
	userAgent?: string;
}

const auditLogSchema = new Schema<IAuditLog>({
	userId: { type: String, required: true },
	action: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	details: { type: String },
	ipAddress: { type: String },
	userAgent: { type: String }
});

// Export the model
export const AuditLog = model<IAuditLog>('Audit_log', auditLogSchema);
