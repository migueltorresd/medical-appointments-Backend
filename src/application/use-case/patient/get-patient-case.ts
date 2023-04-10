import { Observable } from 'rxjs';
import { IPatientDomainService } from '../../../domain/services/patient-domain.service';
import { IUseCase } from '../interface/use-case.interface';
import { PatientDomainModel } from '../../../domain/models/patient-domain.models';

export class GetPatientUseCase implements IUseCase {
  constructor(private readonly patientService: IPatientDomainService) {}

  execute(id: string): Observable<PatientDomainModel> {
    return this.patientService.findById(id);
  }
}
