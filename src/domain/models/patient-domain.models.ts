import { AppointmentDomainModel } from './appointment-domain.models';
import { IPatientDomain } from './interface';

export class PatientDomainModel implements IPatientDomain {
  rol: string;
  _id: string;
  name: string;
  document: string;
  birthDate?: Date;
  gender?: string;
  email: string;
  password: string;
  phone: string;
  state?: string;
  appointments?: AppointmentDomainModel[];

  constructor(data: IPatientDomain) {
    this.name = data.name;
    this.document = data.document;
    this.birthDate = data.birthDate;
    this.gender = data.gender;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.state = data.state;
    this.appointments = [];
  }
}
