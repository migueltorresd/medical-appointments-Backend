import { Observable } from 'rxjs';

export interface IPatientDomainService<PatientDomainModel> {
  createPatient(
    patienModel: PatientDomainModel,
  ): Observable<PatientDomainModel>;
  updatePatient(
    patienModel: PatientDomainModel,
  ): Observable<PatientDomainModel>;
  deletePatient(
    patienModel: PatientDomainModel,
  ): Observable<PatientDomainModel>;
  getPatient(patienModel: PatientDomainModel): Observable<PatientDomainModel>;
}
