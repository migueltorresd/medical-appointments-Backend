import { Appointment } from 'src/infrastructure/persistence/database/mongo/schemas/appointment.schema';

export interface IPatientDomain {
  name: string;
  documentPatient: string;
  birthDate: Date;
  gender: string;
  email: string;
  phone: string;
  state: string;
  appointments?: Appointment[];
}
