import { Observable } from 'rxjs';
import { PatientDomainModel } from '../../../../../../domain/models';

export interface IPatientRepository {
  findByDocument(document: string): Observable<PatientDomainModel>;
}
