import { IsString, IsDate, IsArray } from 'class-validator';
import { PatientDto } from './patient.dto';
import { HealthcareProviderDto } from './healthcare-provider.dto';

export class AppointmentDto {
  @IsDate()
  appointmentDate: Date;

  @IsString()
  hour: string;
  @IsString()
  raeson: string;

  @IsString()
  status: string;

  @IsArray()
  patient: PatientDto[];

  @IsArray()
  healthcareProvider: HealthcareProviderDto[];
}
