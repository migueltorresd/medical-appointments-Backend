import { HealthcareProviderDomainModel } from '../healthcare-provider-domain.models';
import { PatientDomainModel } from '../patient-domain.models';

export interface IAppointmentDomain {
  _id: string;
  appointmentDate: Date;
  hour: string;
  Patient: PatientDomainModel;
  reason: string;
  status: string;
  healthcareProvider: HealthcareProviderDomainModel;
}
