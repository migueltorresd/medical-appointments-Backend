import { Observable } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';
import { IPatientDomainService } from 'src/domain/services/patient-domain.service';
import { IUseCase } from '../interface/use-case.interface';

export class UpdateAppointmentUseCase implements IUseCase {
  constructor(private readonly patientService: IPatientDomainService) {}

  execute(
    _id: string,
    patientEntity: PatientDomainModel,
  ): Observable<PatientDomainModel> {
    return this.patientService.update(_id, patientEntity);
  }
}
