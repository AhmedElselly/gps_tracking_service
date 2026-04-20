import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Location, LocationSchema } from "./schemas/location.schema";
import { LocationController } from "./controllers/location.controller";
import { LocationService } from "./services/location.service";
import { LocationGateway } from "./gateways/location.gateway";
import { RedisService } from "src/infrastructure/redis/redis.service";
import { MongoLocationRepository } from "./repositories/mongo-location.repository";

@Module({
	imports: [MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])],
	controllers: [LocationController],
	providers: [
		LocationService,
		LocationGateway,
		RedisService,
		// Database-agnostic design: We can easily swap out the MongoDB implementation for another database (PostgreSQL, etc.) in the future if needed, without changing the service layer
		{
			provide: "LocationRepository",
			useClass: MongoLocationRepository // This allows us to inject the repository using an interface token 
		},


	],
	// when we want to switch to another database, we just need to implement the LocationRepository interface for that database and update the provider here without changing the service or controller logic
	// 	providers: [
	//   {
	//     provide: 'LocationRepository',
	//     useClass: PostgresLocationRepository,
	//   },
	// ]
})
export class LocationModule { }