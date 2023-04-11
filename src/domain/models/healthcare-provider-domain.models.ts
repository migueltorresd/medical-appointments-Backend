import { IHealthcareProviderDomain } from './interface';
import { AppointmentDomainModel } from './appointment-domain.models';

export class HealthcareProviderDomainModel
  implements IHealthcareProviderDomain
{
  _id?: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  appointments?: AppointmentDomainModel[];

  constructor(data: IHealthcareProviderDomain) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.specialty = data.specialty;
    this.appointments = []
  }
}
