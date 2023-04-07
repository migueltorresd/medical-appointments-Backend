import { AppointmentDomainModel } from './appointment-domain.models';
import { IPatientDomain } from './interface';

export class PatientDomainModel implements IPatientDomain {
  name: string;
  documentPatient: string;
  birthDate: Date;
  gender: string;
  email: string;
  phone: string;
  state: string;
  appointments?: AppointmentDomainModel[];
}
