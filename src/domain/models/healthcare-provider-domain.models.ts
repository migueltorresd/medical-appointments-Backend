import { IHealthcareProviderDomain } from './interface';
import { AppointmentDomainModel } from './appointment-domain.models';

export class HealthcareProviderDomainModel
  implements IHealthcareProviderDomain
{
  appointments?: AppointmentDomainModel[];
  name: string;
  email: string;
  phone: string;
  specialty: string;
}
