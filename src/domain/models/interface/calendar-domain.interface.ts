import { HealthcareProviderDomainModel } from '../healthcare-provider-domain.models';
import { AppointmentDomainModel } from '../appointment-domain.models';

export interface ICalendarDomain {
  calendarDate: Date;
  healthcareProvider: HealthcareProviderDomainModel;
  hour: string[];
  appointment: AppointmentDomainModel[];
}
