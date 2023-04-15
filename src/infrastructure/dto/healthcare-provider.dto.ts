import { IsArray, IsString } from 'class-validator';
import { AppointmentDto } from './appointments.dto';
import { ApiProperty } from '@nestjs/swagger';

export class HealthcareProviderDto {
  @ApiProperty({
    example: 'doctor',
    description: 'this role defines that the user is a health professional',
  })
  @IsString()
  rol: string;
  @ApiProperty({
    example: 'miguel',
    description: 'health professional name',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'miguel@hotmail.com',
    description: 'Health professional email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'health professional password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '3197245775',
    description: 'Health professional phone number',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'medicina general',
    description: 'health professional specialty',
  })
  @IsString()
  specialty?: string;

  @ApiProperty({
    description:
      'patient appointments this field will be filled when a patient is consulted',
  })
  @IsArray()
  appointments: AppointmentDto[];
}
