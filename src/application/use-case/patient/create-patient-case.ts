import { Observable } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';
import { IPatientDomainService } from 'src/domain/services/patient-domain.service';
import { IUseCase } from '../interface/use-case.interface';

export class CreatePatientUseCase implements IUseCase {
  constructor(private readonly patientService: IPatientDomainService) {}

  execute(patientEntity: PatientDomainModel): Observable<PatientDomainModel> {
    return this.patientService.create(patientEntity);
  }
}
