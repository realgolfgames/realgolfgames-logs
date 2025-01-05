import mongoose from 'mongoose';

const api_key_schema = new mongoose.Schema({
	key: { type: String },
	description: { type: String, default: '' },
	user_id: { type: String },
	created: { type: Date },
	enabled: { type: Boolean },
	last_used: { type: Date, default: null },
	internal: { type: Boolean, default: false },
	expires: { type: Date, default: null },
	revoked: { type: Boolean, default: false }
});

/**
 * Defines the Mongoose schema for the User model.
 * @remarks
 * This schema represents the structure of the User document in the MongoDB database.
 * It includes fields such as user information, achievements, games, and statistics.
 */
const user_schema = new mongoose.Schema({
	id: { type: String, require: true, unique: true },
	deleted: { type: Boolean, default: false },
	user: {
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true },
		name: { type: String, require: true },
		username: { type: String, require: true, unique: true },
		registration_date: { type: Date, require: true },
		verification_code: { type: Number, require: true },
		verified: { type: Boolean, require: true, default: false },
		last_login_date: { type: Date, require: true },
		measurement_units: {
			type: String,
			required: true,
			default: 'meters'
		},
		theme: { type: String, required: true, default: 'system' },
		rounded_corners: { type: Boolean, required: true, default: true },
		animation: { type: Boolean, required: true, default: true },
		handicap: { type: Number, required: true, default: 54 },
		handicap_updated: {
			type: Date,
			required: true,
			default: new Date()
		},
		bio: { type: String },
		email_public: { type: Boolean, required: true, default: false },
		pronoun: { type: String },
		custom_pronoun: { type: String },
		role: { type: String, required: true, default: 'User' },
		badges: [
			{
				title: { type: String },
				color: { type: String }
			}
		],
		socials: { type: Array, default: [] },
		status: {
			emoji: { type: String },
			text: { type: String },
			busy: { type: Boolean }
		},
		followers: {
			count: { type: Number, default: 0 },
			list: [
				{
					username: { type: String }
				}
			]
		},
		following: {
			count: { type: Number, default: 0 },
			list: [
				{
					username: { type: String }
				}
			]
		},
		two_factor_auth: {
			type: Boolean,
			required: true,
			default: false
		},
		two_factor_auth_codes: [
			{
				code: { type: String },
				date: { type: Date }
			}
		],
		profile_picture: { type: String },
		user_status: { type: String, default: 'alive' },
		language: { type: String, default: 'en' },
		phone_number: { type: String },
		address: {
			street: { type: String },
			zip: { type: String },
			city: { type: String },
			country: { type: String }
		},
		date_of_birth: { type: Date },
		date_of_death: { type: Date },
		internal: { type: Boolean, default: false }
	},
	achievements: [
		{
			title: { type: String },
			description: { type: String },
			first_unlocked: { type: Date },
			is_unlocked: {
				bronze_unlocked: { type: Boolean },
				silver_unlocked: { type: Boolean },
				gold_unlocked: { type: Boolean },
				platinum_unlocked: { type: Boolean }
			},
			history: {
				first_unlocked_date: { type: Date },
				first_unlocked_game: { type: String },
				bronze_unlocked_date: { type: Date },
				bronze_unlocked_game: { type: String },
				silver_unlocked_date: { type: Date },
				silver_unlocked_game: { type: String },
				gold_unlocked_date: { type: Date },
				gold_unlocked_game: { type: String },
				platinum_unlocked_date: { type: Date },
				platinum_unlocked_game: { type: String }
			}
		}
	],
	games: [
		{
			id: { type: String },
			type: { type: String },
			owner: { type: String },
			site: { type: String },
			name: { type: String },
			teams: { type: String },
			date: { type: String },
			data: { type: String },
			is_over: { type: Boolean, default: false },
			comments: [
				{
					id: { type: String },
					username: { type: String },
					date: { type: Date },
					content: { type: String },
					reactions: [
						{
							emoji: { type: String },
							username: { type: String }
						}
					],
					replies: [
						{
							id: { type: String },
							username: { type: String },
							date: { type: Date },
							content: { type: String },
							reactions: [
								{
									emoji: { type: String },
									username: { type: String }
								}
							]
						}
					],
					edited: { type: Boolean, default: false }
				}
			]
		}
	],
	total_games: { type: Number, default: 0 },
	one_player_precision_highscore: {
		daily: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		weekly: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		monthly: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		yearly: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		},
		all_time: {
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		}
	},
	one_player_precision_history: [
		{
			value: { type: Number, default: 0 },
			lastUpdated: { type: Date, default: null }
		}
	],
	golf_round: [
		{
			id: { type: String },
			course: {
				name: { type: String, required: true },
				location: { type: String },
				coursePar: { type: Number },
				parInfo: [{ holeNumber: Number, par: Number }],
				courseRating: { type: Number },
				slope: { type: Number }
			},
			roundInfo: {
				date: { type: Date, required: true },
				time: { type: String },
				weatherConditions: { type: String },
				playingPartners: [{ type: String }]
			},
			holeByHoleData: [
				{
					holeNumber: { type: Number, required: true },
					par: { type: Number, required: true },
					distance: { type: Number, required: true },
					hcp: { type: Number, required: true },
					strokes: { type: Number, required: true },
					putts: { type: Number, required: true },
					fairwaysHit: { type: Boolean },
					greensInRegulation: { type: Boolean },
					penaltyStrokes: { type: Number, default: 0 }
				}
			],
			overallStatistics: {
				totalStrokes: { type: Number },
				totalPutts: { type: Number },
				fairwaysHitPercentage: { type: String },
				greensInRegulationPercentage: { type: String }
			}
		}
	],
	handicap_history: [
		{
			handicap: { type: Number },
			date: { type: Date }
		}
	],
	planners: [
		{
			id: { type: String },
			title: { type: String },
			description: { type: String },
			dateOfCreation: { type: Date },
			dateOfLastEdit: { type: Date },
			due: { type: Date },
			comment: { type: String },
			visits: { type: Number, default: 0 },
			edits: { type: Number, default: 0 },
			stars: {
				count: { type: Number, default: 0 },
				list: [
					{
						username: { type: String }
					}
				]
			},
			done: { type: Boolean, default: false },
			todos: [
				{
					id: { type: String },
					task: { type: String },
					done: { type: Boolean, default: false },
					priority: { type: Number, default: 0 }
				}
			]
		}
	],
	clubs: [
		{
			name: { type: String },
			distance: { type: Number }
		}
	],
	clubs_history: [
		{
			clubs: [
				{
					name: { type: String },
					distance: { type: Number }
				}
			]
		}
	],
	api_keys: {
		plan: { type: String, default: 'free' },
		plan_expires: { type: Date, default: null },
		usage: {
			count: { type: Number, default: 0 },
			limit: { type: Number, default: 1000 },
			last_reset: { type: Date, default: null }
		}
	}
});

const profile_picture_schema = new mongoose.Schema({
	user_id: { type: String, require: true, unique: true },
	profile_picture: { type: String, require: true }
});

const game_schema = new mongoose.Schema({
	id: { type: String, require: true, unique: true },
	type: { type: String },
	owner: { type: String },
	site: { type: String },
	name: { type: String },
	teams: { type: String },
	date: { type: String },
	data: { type: String },
	is_over: { type: Boolean, default: false },
	comments: [
		{
			id: { type: String },
			username: { type: String },
			date: { type: Date },
			content: { type: String },
			reactions: [
				{
					emoji: { type: String },
					username: { type: String }
				}
			],
			replies: [
				{
					id: { type: String },
					username: { type: String },
					date: { type: Date },
					content: { type: String },
					reactions: [
						{
							emoji: { type: String },
							username: { type: String }
						}
					]
				}
			],
			edited: { type: Boolean, default: false }
		}
	]
});

const blog_schema = new mongoose.Schema({
	title: { type: String, required: true },
	published: { type: String, required: true },
	updated: { type: String, required: true },
	author: { type: String, required: true },
	description: { type: String, required: true },
	content: { type: String, required: true },
	toc: [
		{
			text: { type: String, required: true },
			id: { type: String, required: true }
		}
	]
});

const course_schema = new mongoose.Schema({
	id: { type: String, require: true, unique: true },
	name: { type: String, require: true, unique: true },
	location: { type: String, require: true },
	geolocation: {
		latitude: { type: Number, require: true },
		longitude: { type: Number, require: true }
	},
	in_par: { type: Number, require: true },
	out_par: { type: Number, require: true },
	total_par: { type: Number, require: true },
	tees: [
		{
			color: { type: String, require: true },
			holes: [
				{
					number: { type: Number, require: true },
					par: { type: Number, require: true },
					distance: { type: Number, require: true },
					hcp: { type: Number, require: true }
				}
			],
			in_distance: { type: Number, require: true },
			out_distance: { type: Number, require: true },
			total_distance: { type: Number, require: true }
		}
	],
	rating: [
		{
			men: [
				{
					tee: { type: String },
					course: { type: Number },
					slope: { type: Number }
				}
			],
			ladies: [
				{
					tee: { type: String },
					course: { type: Number },
					slope: { type: Number }
				}
			]
		}
	]
});

const rule_schema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	toc: {
		h2: [
			{
				id: { type: String, required: true },
				text: { type: String, required: true },
				h3: [
					{
						id: { type: String, required: true },
						text: { type: String, required: true }
					}
				]
			}
		]
	}
});

const feature_flags_schema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	enabled: { type: Boolean, required: true, default: false },
	description: { type: String, required: true },
	rollout_percentage: { type: Number, required: true },
	user_criteria: {
		paid_service: { type: Boolean, required: true, default: false },
		min_subscription_level: { type: String, required: true }
	}
});

/**
 * Represents the Mongoose model for the 'Rule' schema.
 * This model is used to interact with the 'Rule' collection in the database.
 */
export const rule_model = mongoose.model('Rule', rule_schema);

/**
 * Represents the Mongoose model for the 'User' schema.
 * This model is used to interact with the 'User' collection in the database.
 */
export const user_model = mongoose.model('User', user_schema);

/**
 * Represents the Mongoose model for the 'Profile_Picture' schema.
 * This model is used to interact with the 'Profile_Picture' collection in the database.
 */
export const profile_picture_model = mongoose.model('Profile_Picture', profile_picture_schema);

/**
 * Represents the Mongoose model for the 'Game' schema.
 * This model is used to interact with the 'Game' collection in the database.
 */
export const game_model = mongoose.model('Game', game_schema);

/**
 * Represents the Mongoose model for the 'Blog' schema.
 * This model is used to interact with the 'Blog' collection in the database.
 */
export const blog_model = mongoose.model('Blog', blog_schema);

/**
 * Represents the Mongoose model for the 'Course' schema.
 * This model is used to interact with the 'Course' collection in the database.
 */
export const course_model = mongoose.model('Course', course_schema);

/**
 * Represents the Mongoose model for the 'Feature_Flag' schema.
 * This model is used to interact with the 'Feature_Flag' collection in the database.
 */
export const feature_flags_model = mongoose.model('Feature_Flag', feature_flags_schema);

/**
 * Represents the Mongoose model for the 'API_Key' schema.
 * This model is used to interact with the 'API_Key' collection in the database.
 */

export const api_key_model = mongoose.model('API_Key', api_key_schema);

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

const Log = mongoose.model('Log', LogSchema);
export type LogDocument = mongoose.InferSchemaType<typeof LogSchema>;

export default Log;
