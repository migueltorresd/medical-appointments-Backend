import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { AppointmentDomainModel } from 'src/domain/models';
import { IAppointmentDomainService } from '../../../domain/services/appointment-domain.service';
import { IUseCase } from '../interface/use-case.interface';
import {
  IHealthcareProviderDomainService,
  IPatientDomainService,
} from '../../../domain/services';
import { BadRequestException } from '@nestjs/common';

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
    appointmentEntity.appointmentDate = new Date(appointmentEntity.appointmentDate);
    const patient = this.patientService.findById(patientId);
    const healthcareProvider =
      this.healthcareProviderService.findById(healthcareProviderId);
    return forkJoin([patient, healthcareProvider]).pipe(
      switchMap(([patientEntity, healthcareProviderEntity]) => {
        if (!patientEntity) throw new Error('Patient not found');

        if (!healthcareProviderEntity)
          throw new Error('Healthcare provider not found');

        appointmentEntity.Patient = patientEntity._id;
        appointmentEntity.healthcareProvider = healthcareProviderEntity._id;

        const endDate = new Date(appointmentEntity.appointmentDate);
        endDate.setHours(endDate.getHours() + 1);

        // TODO Mira la agenda del profesional de la salud para ver si está disponible (fecha y hora)
        const [isNotAvailable] = healthcareProviderEntity.appointments.map(
          (appointment) =>
            this.isDateInRange(
              appointment.appointmentDate,
              appointmentEntity.appointmentDate,
              endDate,
            ),
        );
        // TODO Si está disponible, asignar la cita al profesional de la salud 

        if (isNotAvailable)
          throw new BadRequestException('Healthcare provider not available');

        // Crear la cita y guardar el id en la entidad de la cita
        return this.appointmentService.create(appointmentEntity).pipe(
          map((Entity) => {
            // Guardar la cita en la entidad del paciente
            patientEntity.appointments.push(appointmentEntity);
            this.patientService.update(patientId, patientEntity);

            // Guardar la cita en la entidad del profesional de la salud
            healthcareProviderEntity.appointments.push(appointmentEntity);
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

  private isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    const dateInMillis = date.getTime();
    const startInMillis = startDate.getTime();
    const endInMillis = endDate.getTime();
    return dateInMillis >= startInMillis && dateInMillis <= endInMillis;
  }
}
