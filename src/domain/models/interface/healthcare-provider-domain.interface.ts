import { AppointmentDomainModel } from '../appointment-domain.models';

export interface IHealthcareProviderDomain {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  appointments?: AppointmentDomainModel['_id'][];
}
