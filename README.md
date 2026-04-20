<h1>🚀 GPS Tracking Backend Service</h1>

<p>
A minimal backend service for ingesting, storing, and streaming GPS location updates.
</p>

<h2>🔌 Database Abstraction</h2>

<p>
The data access layer is designed to be database-agnostic using a repository abstraction.
Business logic depends on an interface (<code>LocationRepository</code>) rather than a concrete database implementation.
</p>

<p>
Currently, MongoDB is used due to its native geospatial support. However, the architecture allows replacing it with other databases (e.g., PostgreSQL with PostGIS) by implementing the same repository interface without changing service logic.
</p>

<p>
This approach ensures separation of concerns and keeps the system flexible for future scaling or technology changes.
</p>

<pre>
  gps-tracking-service\src\modules\location\location.module.ts
  @Module({
	imports: [MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])],
	controllers: [LocationController],
	providers: [
		LocationService,
		LocationGateway,
		RedisService,
		// Database-agnostic design: We can easily swap out the MongoDB implementation for another database (PostgreSQL, etc.)
    // in the future if needed, without changing the service layer
		{
			provide: "LocationRepository",
			useClass: MongoLocationRepository // This allows us to inject the repository using an interface token 
		}
	],

  // when we want to switch to another database, we just need to implement the LocationRepository interface for that database
  // and update the provider here without changing the service or controller logic
	// 	providers: [
	//   {
	//     provide: 'LocationRepository',
	//     useClass: PostgresLocationRepository,
	//   },
	// ]
})
</pre>

<hr>

<h2>📌 Features</h2>
<ul>
  <li>Batch location ingestion</li>
  <li>MongoDB for historical data</li>
  <li>Redis for latest location</li>
  <li>WebSocket real-time updates</li>
</ul>

<hr>

<h2>📡 API</h2>

<ul>
  <li><strong>POST /locations/batch</strong> — (Post) Ingest batched location updates</li>
  <pre>{
  "driverId": "driver-1",
  "locations": [
    { "lat": 30.0444, "lng": 31.2357, "timestamp": 1713350000 }
  ]
}</pre>
  <li><strong>GET /locations/latest/:driverId</strong> — Get latest location from Redis and if not found in redis it fallbacks to DB</li>
  <li><strong>GET /locations/history/:driverId</strong> — Get recent history (MongoDB)</li>
  <li><strong>GET /locations/nearby</strong> — Find nearby drivers (geo query)</li>
</ul>
<hr>

<h2>🧠 Architecture</h2>

<pre>
Client → API → MongoDB (history)
             → Redis (latest)
             → WebSocket (real-time)
</pre>

<hr>

<h2>⚙️ Tech Stack</h2>
<ul>
  <li>NestJS</li>
  <li>MongoDB</li>
  <li>Redis</li>
  <li>Socket.IO</li>
</ul>

<hr>

<h2>📈 Scalability</h2>
<ul>
  <li>Batch ingestion reduces load</li>
  <li>Redis for fast reads</li>
  <li>Horizontally scalable API</li>
</ul>

<hr>

<h2>🚀 Future Improvements</h2>
<ul>
  <li>Queue (Kafka / BullMQ)</li>
</ul>
