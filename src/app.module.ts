import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './modules/location/location.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/gps-tracking'),
  ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 60000,
        limit: 10,
      },
    ],
  }),
    LocationModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
