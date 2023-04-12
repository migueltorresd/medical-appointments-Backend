import { Observable } from 'rxjs';
import { IUseCase } from '../interface/use-case.interface';
import { IAppointmentDomainService } from '../../../domain/services/appointment-domain.service';
import { AppointmentDomainModel } from '../../../domain/models';

export class UpdateAppointmentUseCase implements IUseCase {
  constructor(private readonly appointmentService: IAppointmentDomainService) {}

  execute(
    _id: string,
    patientEntity: AppointmentDomainModel,
  ): Observable<AppointmentDomainModel> {
    return this.appointmentService.update(_id, patientEntity);
  }
}
