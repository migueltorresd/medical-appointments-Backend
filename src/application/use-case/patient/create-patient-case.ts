import { Observable } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';
import { IPatientDomainService } from 'src/domain/services/patient-domain.service';

export class CreatePatientUseCase {
  constructor(private readonly patientService: IPatientDomainService) {}

  execute(patientEntity: PatientDomainModel): Observable<PatientDomainModel> {
    return this.patientService.create(patientEntity);
  }
}
