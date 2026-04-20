<h1>🚀 GPS Tracking Backend Service</h1>

<p>
A minimal backend service for ingesting, storing, and streaming GPS location updates.
</p>

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

<h3>POST /locations/batch</h3>
<pre>{
  "driverId": "driver-1",
  "locations": [
    { "lat": 30.0444, "lng": 31.2357, "timestamp": 1713350000 }
  ]
}</pre>

<ul>
  <li><strong>POST /locations/batch</strong> — (Post) Ingest batched location updates</li>
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
  <li>Nearby drivers (geo queries)</li>
  <li>Queue (Kafka / BullMQ)</li>
  <li>Rate limiting</li>
</ul>
