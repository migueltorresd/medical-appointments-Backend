import { HealthcareProviderDomainModel } from '../healthcare-provider-domain.models';
import { PatientDomainModel } from '../patient-domain.models';

export interface IAppointmentDomain {
  _id: string;
  appointmentDate: Date;
  Patient: string;
  status: 'available' | 'pending' | 'canceled' | 'completed' | 'scheduled';
  reason: string;
  healthcareProvider: string;
}
