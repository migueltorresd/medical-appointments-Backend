import { Observable } from 'rxjs';
import { AppointmentDomainModel } from 'src/domain/models';
import { IAppointmentDomainService } from 'src/domain/services/appointment-domain.service';
import { IUseCase } from '../interface/use-case.interface';

export class CreateAppointmentUseCase implements IUseCase {
  constructor(private readonly appointmentService: IAppointmentDomainService) {}

  execute(
    appointmentEntity: AppointmentDomainModel,
  ): Observable<AppointmentDomainModel> {
    return this.appointmentService.create(appointmentEntity);
  }
}
