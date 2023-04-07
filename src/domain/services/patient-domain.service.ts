import { Observable } from 'rxjs';
import { PatientDomainModel } from '../models/patient-domain.models';

export interface IPatientDomainService<
  Entity extends PatientDomainModel = PatientDomainModel,
> {
  create(entity: Entity): Observable<Entity>;
  update(id: string, patient: Entity): Observable<Entity>;
  delete(id: string): Observable<Entity>;
  findById(id: string): Observable<Entity>;
  findAll(): Observable<Entity[]>;
}
