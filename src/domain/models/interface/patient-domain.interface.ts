import { AppointmentDomainModel } from '../appointment-domain.models';

export interface IPatientDomain {
  rol: string;
  _id: string;
  name: string;
  document: string;
  birthDate: Date;
  gender: string;
  email: string;
  phone: string;
  state: string;
  appointments?: AppointmentDomainModel[];
}
