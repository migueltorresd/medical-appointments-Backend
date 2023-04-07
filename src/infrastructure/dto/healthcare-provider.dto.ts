import { IsArray, IsString } from 'class-validator';
import { AppointmentDto } from './appointments.dto';

export class HealthcareProviderDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
  @IsString()
  specialty: string;

  @IsArray()
  appointments: AppointmentDto[];
}
