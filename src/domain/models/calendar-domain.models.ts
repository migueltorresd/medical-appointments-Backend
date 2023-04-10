import { AppointmentDomainModel } from './appointment-domain.models';
import { HealthcareProviderDomainModel } from './healthcare-provider-domain.models';
import { ICalendarDomain } from './interface';

export class calendarDomainModel implements ICalendarDomain {
  calendarDate: Date;
  healthcareProvider: HealthcareProviderDomainModel;
  appointment: AppointmentDomainModel[];
}
