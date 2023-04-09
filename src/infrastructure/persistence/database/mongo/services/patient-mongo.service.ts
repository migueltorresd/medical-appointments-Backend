import { Observable } from 'rxjs';
import { IPatientDomainService } from '../../../../../domain/services/patient-domain.service';
import { PatientSchemaMongo } from '../schemas/patient.schema';
import { PatientRepository } from '../repositories/patient-repository.mongo';
import { Injectable } from '@nestjs/common';
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
  delete(id: string): Observable<PatientSchemaMongo> {
    return this.patientRepository.delete(id);
  }
  findById(id: string): Observable<PatientSchemaMongo> {
    return this.patientRepository.findById(id);
  }
  findAll(): Observable<PatientSchemaMongo[]> {
    return this.patientRepository.findAll();
  }
}
