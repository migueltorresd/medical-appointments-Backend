import { HealthcareProviderDomainModel } from '../healthcare-provider-domain.models';
import { PatientDomainModel } from '../patient-domain.models';

export interface IAppointmentDomain {
  appointmentDate: Date;
  hour: string;
  Patient: PatientDomainModel;
  raeson: string;
  status: string;
  healthcareProvider: HealthcareProviderDomainModel;
}
