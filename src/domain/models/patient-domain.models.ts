import { AppointmentDomainModel } from './appointment-domain.models';
import { IPatientDomain } from './interface';

export class PatientDomainModel implements IPatientDomain {
  _id: string;
  name: string;
  document: string;
  birthDate: Date;
  gender: string;
  email: string;
  phone: string;
  state: string;
  appointments?: AppointmentDomainModel['_id'][];

  constructor(data: IPatientDomain) {
    this.name = data.name;
    this.document = data.document;
    this.birthDate = data.birthDate;
    this.gender = data.gender;
    this.email = data.email;
    this.phone = data.phone;
    this.state = data.state;
  }
}
