import { Observable } from 'rxjs';

export interface IAppointmentDomainService<AppointmentDomainModel> {
  createAppointment(
    appointment: AppointmentDomainModel,
  ): Observable<AppointmentDomainModel>;
  updateAppointment(
    appointment: AppointmentDomainModel,
  ): Observable<AppointmentDomainModel>;
  deleteAppointment(
    appointment: AppointmentDomainModel,
  ): Observable<AppointmentDomainModel>;
  getAppointment(
    appointment: AppointmentDomainModel,
  ): Observable<AppointmentDomainModel>;
}
