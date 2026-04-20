import { BadRequestException, Inject, Injectable } from "@nestjs/common";
// import { MongoLocationRepository } from "../repositories/mongo-location.repository";
import { RedisService } from "src/infrastructure/redis/redis.service";
import { LocationGateway } from "../gateways/location.gateway";
import { BatchLocationDto } from "../dto/batch-location.dto";
import type { LocationRepository } from "../repositories/location.interface";

@Injectable()
export class LocationService {
	// This service can be expanded to include methods for handling location data,
	// such as saving to a database, processing location updates, etc. 
	constructor(
		@Inject("LocationRepository") private readonly locationRepo: LocationRepository,
		private redis: RedisService,
		private gateway: LocationGateway
	) { }

	async handleBatchLocationUpdate(dto: BatchLocationDto) {
		const { driverId, locations } = dto;

		if (!locations || locations.length === 0) {
			throw new BadRequestException("No location data provided");
		}

		const locationDocs = locations.map((loc: any) => ({
			driverId,
			location: {
				type: "Point",
				coordinates: [loc.lng, loc.lat] // GeoJSON format: [longitude, latitude]
			},
			timestamp: loc.timestamp
		}));

		// Save to MongoDB
		await this.locationRepo.insertMany(locationDocs);

		// last location for Redis
		const lastLocation = locationDocs[locationDocs.length - 1];
		await this.redis.set(`driver:${driverId}:location`, JSON.stringify(lastLocation));

		// Emit the last location update to WebSocket clients
		this.gateway.emitLocationUpdate(driverId, lastLocation);

		return { success: true, lastLocation };
	}

	async getLatestLocation(driverId: string) {
		// First, try to get the latest location from Redis cache O(1) fast read compared to DB query
		const cached = await this.redis.get(`driver:${driverId}:location`);
		if (cached) return cached;

		// fallback if not found in cache
		return this.locationRepo.findLatestLocationByDriver(driverId);
	}

	async findNearbyDrivers(lng: number, lat: number) {
		// This method can be implemented to find nearby drivers based on the latest location data stored in DB
		return this.locationRepo.findNearbyLocations(lng, lat);
	}
}