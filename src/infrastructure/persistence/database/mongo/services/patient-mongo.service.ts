import { Observable } from 'rxjs';
import { IPatientDomainService } from '../../../../../domain/services/patient-domain.service';
import { PatientSchemaMongo } from '../schemas/patient.schema';
import { PatientRepository } from '../repositories/patient-repository.mongo';
import { Injectable } from '@nestjs/common';
import { PatientDomainModel } from 'src/domain/models';
@Injectable()
export class PatientMongoService implements IPatientDomainService {
  constructor(private readonly patientRepository: PatientRepository) {}
  create(entity: PatientSchemaMongo): Observable<PatientSchemaMongo> {
    return this.patientRepository.create(entity);
  }
  update(
    id: string,
    entity: PatientSchemaMongo,
  ): Observable<PatientSchemaMongo> {
    return this.patientRepository.update(id, entity);
  }
updatepatient(id: string, patient: PatientDomainModel): Observable<PatientDomainModel> {
    return this.patientRepository.updatepatient(id, patient);
}
  
  delete(id: string): Observable<PatientSchemaMongo> {
    return this.patientRepository.delete(id);
  }
  findById(id: string): Observable<PatientSchemaMongo> {
    return this.patientRepository.findById(id);
  }
  findAll(): Observable<PatientSchemaMongo[]> {
    return this.patientRepository.findAll();
  }
  findByEmail(email: string): Observable<PatientSchemaMongo> {
    return this.patientRepository.findByEmail(email);
  }
}
