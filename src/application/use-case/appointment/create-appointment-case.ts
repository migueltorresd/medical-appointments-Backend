import { Observable, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import {
  AppointmentDomainModel,
  HealthcareProviderDomainModel,
  PatientDomainModel,
} from 'src/domain/models';
import { IAppointmentDomainService } from '../../../domain/services/appointment-domain.service';
import { IUseCase } from '../interface/use-case.interface';
import {
  IHealthcareProviderDomainService,
  IPatientDomainService,
} from '../../../domain/services';

export class CreateAppointmentUseCase implements IUseCase {
  constructor(
    private readonly appointmentService: IAppointmentDomainService,
    private readonly patientService: IPatientDomainService,
    private readonly healthcareProviderService: IHealthcareProviderDomainService,
  ) {}

  execute(
    appointmentEntity: AppointmentDomainModel,
    patientId: string,
    healthcareProviderId: string,
  ): Observable<AppointmentDomainModel> {
    const patient = this.patientService.findById(patientId);
    const healthcareProvider =
      this.healthcareProviderService.findById(healthcareProviderId);
    return forkJoin([patient, healthcareProvider]).pipe(
      switchMap(([patientEntity, healthcareProviderEntity]) => {
        appointmentEntity.Patient = patientEntity;

        // Crear la cita y guardar el id en la entidad de la cita
        return this.appointmentService.create(appointmentEntity).pipe(
          map((Entity) => {
            // Guardar la cita en la entidad del paciente
            console.log(
              '---------pendiente revisar crear el doctor con la peticion en el crear------',
            );
            patientEntity.appointments.push(Entity);
            this.patientService.update(patientId, patientEntity);
            //---------------------------------------------------------------------------------------------

            // Guardar la cita en la entidad del profesional de la salud
            healthcareProviderEntity.appointments.push(Entity);
            this.healthcareProviderService.update(
              healthcareProviderId,
              healthcareProviderEntity,
            );
            return Entity;
          }),
        );
      }),
    );
  }

}
