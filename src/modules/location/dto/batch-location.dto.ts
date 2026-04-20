import { IsArray, IsString, ValidateNested, IsNumber, IsDate, Min, Max, } from 'class-validator';
import { Transform, Type } from 'class-transformer';

class LocationPoint {
	@IsNumber()
	@Min(-90)
	@Max(90)
	lat!: number;

	@IsNumber()
	@Min(-180)
	@Max(180)

	@Transform(({ value }) => new Date(value * 1000))
	@IsDate()
	timestamp!: Date;
}

export class BatchLocationDto {
	@IsString()
	driverId!: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => LocationPoint)
	locations!: LocationPoint[];
}