import { HealthcareProviderDomainModel } from './healthcare-provider-domain.models';
import { IAppointmentDomain } from './interface/appointment-domain.interface';
import { PatientDomainModel } from './patient-domain.models';

export class AppointmentDomainModel implements IAppointmentDomain {
  appointmentDate: Date;
  hour: string;
  Patient: PatientDomainModel;
  reason: string;
  status: string;
  healthcareProvider: HealthcareProviderDomainModel;
}
