import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SendAddressDto {
  @ApiProperty({
    description: 'Array of Addresses ',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  public addresses: string[];
}
