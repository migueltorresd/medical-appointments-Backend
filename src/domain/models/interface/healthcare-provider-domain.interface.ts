import { AppointmentDomainModel } from '../appointment-domain.models';

export interface IHealthcareProviderDomain {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  appointments?: AppointmentDomainModel[];
}
