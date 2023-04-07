import { IPatientDomainService } from 'src/domain/services/patient-domain.service';
import { PatientSchemaMongo } from '../schemas/patient.schema';
import { PatientRepository } from '../repositories/patient-repository.mongo';
import { Observable } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';

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
  findById(id: string): Observable<PatientDomainModel> {
    return this.patientRepository.findById(id);
  }
  findAll(): Observable<PatientDomainModel[]> {
    return this.patientRepository.findAll();
  }
}
