import { Body, Controller, Post } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { SendAddressDto } from './dto/send-address.dto';

@Controller('/api/geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Post()
  async addNewAddress(@Body() sendAddressDto: SendAddressDto) {
    return await this.geolocationService.getLocation(sendAddressDto);
  }
}
