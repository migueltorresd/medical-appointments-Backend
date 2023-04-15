import { IsString, IsDate, IsArray } from 'class-validator';
import { PatientDto } from './patient.dto';
import { HealthcareProviderDto } from './healthcare-provider.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentDto {
  @ApiProperty({
    example: '2020-01-01',
    description: 'appointment date',
  })
  @IsDate()
  appointmentDate: Date;

  @ApiProperty({
    example: '8:00',
    description: 'appointment time',
  })
  @IsString()
  hour: string;

  @ApiProperty({
    example: 'consulta general',
    description: 'reason for the appointment',
  })
  @IsString()
  reason: string;

  @ApiProperty({
    example: 'activa',
    description: 'appointment status',
  })
  @IsString()
  status: string;
  
@ApiProperty({
    example: 'e985851c-c3a5-4e57-930f-e7882d2af6fe',
    description: 'patient id',
  })
  @IsString()
  patient: string;

@ApiProperty({
    example: 'e985851c-c3a5-4e57-930f-e7882d2af6fe',
    description: 'health professional id',
  })
  @IsString()
  healthcareProvider: string;
}
