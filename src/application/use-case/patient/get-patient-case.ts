import { Observable } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';
import { IPatientDomainService } from 'src/domain/services/patient-domain.service';
import { IUseCase } from '../interface/use-case.interface';

export class GetPatienUseCase implements IUseCase {
  constructor(private readonly patientService: IPatientDomainService) {}

  execute(id: string): Observable<PatientDomainModel> {
    return this.patientService.findById(id);
  }
}
