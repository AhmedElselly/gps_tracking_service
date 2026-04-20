import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LocationRepository } from "./location.interface";
import { Model } from "mongoose";
import { Location } from "../schemas/location.schema";

@Injectable()
export class MongoLocationRepository implements LocationRepository {
	// Implement the methods defined in LocationRepository interface
	constructor(@InjectModel(Location.name) private locationModel: Model<Location>) { }

	async insertMany(docs: any[]): Promise<void> {
		await this.locationModel.insertMany(docs);
	}

	async findLatestLocationByDriver(driverId: string): Promise<Location | null> {
		return this.locationModel.findOne({ driverId }).sort({ timestamp: -1 }).exec();
	}
}