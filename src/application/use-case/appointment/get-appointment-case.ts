import { Observable } from 'rxjs';
import { AppointmentDomainModel } from 'src/domain/models';
import { IAppointmentDomainService } from '../../../domain/services/appointment-domain.service';
import { IUseCase } from '../interface/use-case.interface';

export class GetAppointmentUseCase implements IUseCase {
  constructor(private readonly appointmentService: IAppointmentDomainService) {}

  execute(_id: string): Observable<AppointmentDomainModel> {
    return this.appointmentService.findById(_id);
  }
}
