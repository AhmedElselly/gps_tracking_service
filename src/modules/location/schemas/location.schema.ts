import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Location extends Document {
	@Prop()
	driverId!: string;

	@Prop({
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point',
		},
		coordinates: [Number],
	})
	location!: {
		type: string;
		coordinates: number[];
	};

	@Prop()
	timestamp!: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

// indexes
LocationSchema.index({ location: '2dsphere' });
LocationSchema.index({ driverId: 1, timestamp: -1 });