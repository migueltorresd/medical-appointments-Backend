import { HealthcareProviderDomainModel } from './healthcare-provider-domain.models';
import { IAppointmentDomain } from './interface/appointment-domain.interface';
import { PatientDomainModel } from './patient-domain.models';

export class AppointmentDomainModel implements IAppointmentDomain {
  _id: string;
  appointmentDate: Date;
  Patient: PatientDomainModel;
  reason: string;
  status: 'available' | 'pending' | 'canceled' | 'completed' | 'scheduled';
  healthcareProvider: HealthcareProviderDomainModel;

  constructor(data: IAppointmentDomain) {
    this.appointmentDate = data.appointmentDate;
    this.Patient = data.Patient;
    this.reason = data.reason;
    this.status = data.status;
    this.healthcareProvider = data.healthcareProvider;
  }
}
