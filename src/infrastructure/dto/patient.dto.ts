import { IsString, IsDate, IsArray } from 'class-validator';
import { AppointmentDto } from './appointments.dto';

export class PatientDto {
  @IsString()
  rol: string;
  
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  gender: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  state: string;

  @IsArray()
  appointments?: AppointmentDto[];
}
