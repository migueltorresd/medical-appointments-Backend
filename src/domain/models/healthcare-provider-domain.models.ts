import { IHealthcareProviderDomain } from './interface';
import { AppointmentDomainModel } from './appointment-domain.models';

export class HealthcareProviderDomainModel
  implements IHealthcareProviderDomain
{
  _id: string;
  appointments?: AppointmentDomainModel['_id'][];
  name: string;
  email: string;
  phone: string;
  specialty: string;

  constructor(data: IHealthcareProviderDomain) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.specialty = data.specialty;
    this.appointments = data.appointments['_id'];
  }
}
