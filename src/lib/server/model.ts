import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema(
	{
		timestamp: {
			type: Date,
			default: Date.now,
			required: true
		},
		level: {
			type: String,
			enum: ['INFO', 'WARN', 'ERROR', 'DEBUG', 'FATAL'],
			required: true
		},
		message: {
			type: String,
			required: true
		},
		userId: {
			type: String,
			default: null
		},
		action: {
			type: String,
			required: true
		},
		details: {
			description: {
				type: String,
				default: null
			},
			ipAddress: {
				type: String,
				default: null
			},
			ipGeolocation: {
				type: mongoose.Schema.Types.Mixed, // Can store various geolocation details (e.g., city, country, lat, lon)
				default: null
			},
			userAgent: {
				type: String,
				default: null
			},
			durationMs: {
				type: Number,
				default: null
			},
			error: {
				type: mongoose.Schema.Types.Mixed, // Can store various error details (e.g., stack trace, error message)
				default: null
			}
		},
		service: {
			type: String,
			default: 'unknown-service'
		},
		statusCode: {
			type: Number,
			default: null
		},
		environment: {
			type: String,
			enum: ['development', 'staging', 'production'],
			required: true
		},
		correlationId: {
			type: String,
			default: null
		},
		tags: {
			type: [String],
			default: []
		}
	},
	{
		timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
		versionKey: false // Removes the `__v` field from documents
	}
);

export const Log = mongoose.model('Log', LogSchema);
export type LogDocument = mongoose.InferSchemaType<typeof LogSchema>;
