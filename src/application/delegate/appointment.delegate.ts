import { Observable } from 'rxjs';
import { IAppointmentDomainService } from 'src/domain/services/appointment-domain.service';
import { UpdateAppointmentUseCase } from '../use-case/appointment/Update-appointment-case';
import { CreateAppointmentUseCase } from '../use-case/appointment/create-appointment-case';
import { DeleteAppointmentUseCase } from '../use-case/appointment/delete-appointmen-case';
import { GetAppointmentUseCase } from '../use-case/appointment/get-appointment-case';
import { IUseCase } from '../use-case/interface/use-case.interface';

export class AppointmentDelegate {
  private delegate: IUseCase;

  constructor(private readonly appointmentService: IAppointmentDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateAppointment() {
    this.delegate = new CreateAppointmentUseCase(this.appointmentService);
  }

  toUpdateAppointment() {
    this.delegate = new UpdateAppointmentUseCase(this.appointmentService);
  }

  toDeleteAppointment() {
    this.delegate = new DeleteAppointmentUseCase(this.appointmentService);
  }

  toGetAppointment() {
    this.delegate = new GetAppointmentUseCase(this.appointmentService);
  }
}
