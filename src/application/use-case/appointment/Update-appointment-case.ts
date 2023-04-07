import { Observable } from 'rxjs';
import { IUseCase } from '../interface/use-case.interface';
import { IAppointmentDomainService } from 'src/domain/services/appointment-domain.service';
import { AppointmentDomainModel } from 'src/domain/models';

export class UpdateAppointmentUseCase implements IUseCase {
  constructor(private readonly patientService: IAppointmentDomainService) {}

  execute(
    _id: string,
    patientEntity: AppointmentDomainModel,
  ): Observable<AppointmentDomainModel> {
    return this.patientService.update(_id, patientEntity);
  }
}
