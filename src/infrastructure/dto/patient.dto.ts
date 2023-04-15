import { IsString, IsDate, IsArray, IsOptional } from 'class-validator';
import { AppointmentDto } from './appointments.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {
  @ApiProperty({
    example: 'paciente',
    description: 'this role defines that the user is a patient',
  })
  @IsString()
  rol: string;

  @ApiProperty({
    example: 'miguel',
    description: 'Name of patient',
  })
  @IsString()
  name: string;

 @ApiProperty({
    example: '12345678',
    description: 'patient document number'
  })
  @IsString()
  document: string;

  @ApiProperty({
    example: '2020-01-01',
    description: 'patients date of birth this field is optional',
  })
  @IsDate()
  birthDate?: Date;

  @ApiProperty({
    example: 'masculino',
    description: 'genero del paciente este campo es opcional',
  })
  @IsString()
  gender?: string;

  @ApiProperty({
    example: 'miguel@hotmail.co',
    description: 'patient gender this field is optional',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'patient password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '3197245775',
    description: 'patient phone number',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'activo',
    description: 'patients status',
  })
  @IsOptional()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'patient appointments this field will be filled when a patient is consulted',
  })
  @IsArray()
  appointments?: AppointmentDto[];
}
