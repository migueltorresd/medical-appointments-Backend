import { IsString, IsDate, IsArray } from 'class-validator';
import { PatientDto } from './patient.dto';
import { HealthcareProviderDto } from './healthcare-provider.dto';

export class AppointmentDto {
  @IsDate()
  appointmentDate: Date;

  @IsString()
  hour: string;
  @IsString()
  reason: string;

  @IsString()
  status: string;

  @IsString()
  patient: string;

  @IsString()
  healthcareProvider: string;
}
