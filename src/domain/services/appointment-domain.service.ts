import { Observable } from 'rxjs';
import { AppointmentDomainModel } from '../models';

export interface IAppointmentDomainService<
  Entity extends AppointmentDomainModel = AppointmentDomainModel,
> {
  create(entity: Entity): Observable<Entity>;
  update(id: string, patient: Entity): Observable<Entity>;
  delete(id: string): Observable<Entity>;
  findById(id: string): Observable<Entity>;
  findAll(): Observable<Entity[]>;
}
