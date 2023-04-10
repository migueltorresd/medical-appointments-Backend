import { AppointmentDomainModel } from '../appointment-domain.models';

export interface IPatientDomain {
  _id: string;
  name: string;
  document: string;
  birthDate: Date;
  gender: string;
  email: string;
  phone: string;
  state: string;
  appointments?: AppointmentDomainModel['_id'][];
}
