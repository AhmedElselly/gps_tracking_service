import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()

export class RedisService {
	private client = new Redis()

	async set(key: string, value: string): Promise<void> {
		await this.client.set(key, JSON.stringify(value));
	}

	async get(key: string): Promise<string | null> {
		const value = await this.client.get(key);
		return value ? JSON.parse(value) : null;
	}
}