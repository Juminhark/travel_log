import { model, Schema } from 'mongoose';

// * Title - Text
// * Description - Text
// * Comments - Text
// * Rating - scale of 1 - 10
// * Image - Text - URL
// * Latitude - Number
// * Longitude - Number
// * Created At - DateTime
// * Updated At - DateTime

const logEntrySchema = new Schema(
	{
		title: { type: String, required: true },
		description: String,
		comments: String,
		image: String,
		rating: {
			type: Number,
			min: 0,
			max: 10,
			default: 0,
		},
		latitude: {
			type: Number,
			required: true,
			min: -90,
			max: 90,
		},
		longitude: {
			type: Number,
			required: true,
			min: -180,
			max: 180,
		},
		createdAt: { type: Date, default: Date.now, required: true },
		updatedAt: { type: Date, default: Date.now, required: true },
		visitDate: {
			required: true,
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

export default model('LogEntry', logEntrySchema);
