import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LocationService } from "../services/location.service";
import { BatchLocationDto } from "../dto/batch-location.dto";

@Controller('rider')
export class LocationController {
	// Implement the controller methods to handle incoming requests related to location updates
	// For example, you can create an endpoint to receive batch location updates from drivers
	constructor(private service: LocationService) { }

	@Post("batch-update")
	async handleBatchLocationUpdate(@Body() dto: BatchLocationDto) {
		console.log("Received batch location update request:", dto);
		return this.service.handleBatchLocationUpdate(dto);
	}

	@Get("latest/:driverId")
	async getLatestLocation(@Param("driverId") driverId: string) {
		return this.service.getLatestLocation(driverId);
	}
}