export interface LocationRepository {
	insertMany(docs: any[]): Promise<void>;

	// Optional method for fallback if Redis cache is missed (not required for task, but can be useful)
	findLatestLocationByDriver(driverId: string): Promise<any>;

	// Find nearby drivers based on latest location data (not required for task, but can be useful)
	findNearbyLocations(lng: number, lat: number): Promise<any[]>;
}