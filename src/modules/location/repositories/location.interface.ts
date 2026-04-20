export interface LocationRepository {
	insertMany(docs: any[]): Promise<void>;

	// Optional method for fallback if Redis cache is missed (not required for task, but can be useful)
	findLatestLocationByDriver(driverId: string): Promise<any>;
}