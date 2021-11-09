import { ApiProperty } from '@nestjs/swagger';

export class SendAddressDto {
  @ApiProperty({
    description: 'Array of Addresses ',
  })
  readonly addresses: string[];
}
