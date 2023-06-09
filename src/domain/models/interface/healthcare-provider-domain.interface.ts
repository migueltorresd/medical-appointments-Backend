import { AppointmentDomainModel } from '../appointment-domain.models';

export interface IHealthcareProviderDomain {
  rol: string;
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  appointments?: AppointmentDomainModel[];
}
