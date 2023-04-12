import { Observable } from 'rxjs';
import { IAppointmentDomainService } from '../../../domain/services/appointment-domain.service';
import { IUseCase } from '../interface/use-case.interface';
import { AppointmentDomainModel } from '../../../domain/models/appointment-domain.models';

export class DeleteAppointmentUseCase implements IUseCase {
  constructor(private readonly appointmentService: IAppointmentDomainService) {}

  execute(_id: string): Observable<AppointmentDomainModel> {
    return this.appointmentService.delete(_id);
  }
}
