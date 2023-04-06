import { IAppointmentDomain } from './interface/appointment-domain.interface';

export class AppointmentDomainModel implements IAppointmentDomain {
  raeson: string;
  date: Date;
  time: string;
  documentPatient: string;
  reason: string;
  status: string;
  healthcareProviderId: string;
}
