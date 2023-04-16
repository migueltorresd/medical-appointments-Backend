import { Observable } from 'rxjs';
import { HealthcareProviderDomainModel } from '../models/healthcare-provider-domain.models';

export interface IHealthcareProviderDomainService<
  Entity extends HealthcareProviderDomainModel = HealthcareProviderDomainModel,
> {
  create(entity: Entity): Observable<Entity>;
  update(id: string, patient: Entity): Observable<Entity>;
  updateHealthcareProvider(id: string, patient: Entity): Observable<Entity>;
  delete(id: string): Observable<Entity>;
  findById(id: string): Observable<Entity>;
  findAll(): Observable<Entity[]>;
  findByEmail(email: string): Observable<Entity>;
  login(email: string, password: string): Observable<Entity>;
}
