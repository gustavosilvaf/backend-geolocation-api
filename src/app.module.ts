import { Module } from '@nestjs/common';
import { GeolocationModule } from './geolocation/geolocation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GeolocationModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
