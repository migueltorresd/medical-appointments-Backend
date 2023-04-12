import { Observable } from 'rxjs';
import { PatientDomainModel } from '../../../domain/models/patient-domain.models';
import { IPatientDomainService } from '../../../domain/services/patient-domain.service';
import { IUseCase } from '../interface/use-case.interface';

export class DeletePatientUseCase implements IUseCase {
  constructor(private readonly patientService: IPatientDomainService) {}

  execute(_id: string): Observable<PatientDomainModel> {
    return this.patientService.delete(_id);
  }
}
