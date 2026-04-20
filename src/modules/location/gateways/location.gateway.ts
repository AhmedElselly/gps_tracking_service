import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: true })
export class LocationGateway {
	@WebSocketServer()
	server!: Server;

	emitLocationUpdate(driverId: string, location: any) {
		this.server.emit("location:update", { driverId, location });
	}
}