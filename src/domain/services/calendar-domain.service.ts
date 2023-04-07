import { Observable } from 'rxjs';

export interface ICalendarDomainService<CalendarDomainModel> {
  createAssignment(
    assignment: CalendarDomainModel,
  ): Observable<CalendarDomainModel>;
}
