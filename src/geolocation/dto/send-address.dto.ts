import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SendAddressDto {
  @ApiProperty({
    description: 'Array of Addresses ',
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsString({ each: true })
  public addresses: string[];
}
