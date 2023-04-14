import { IHealthcareProviderDomain } from './interface';
import { AppointmentDomainModel } from './appointment-domain.models';

export class HealthcareProviderDomainModel
  implements IHealthcareProviderDomain
{
  rol: string;
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  appointments?: AppointmentDomainModel[];

  constructor(data: IHealthcareProviderDomain) {
    this.rol = data.rol;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.specialty = data.specialty;
    this.appointments = []
  }
}
