import { Observable, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { AppointmentDomainModel, HealthcareProviderDomainModel, PatientDomainModel } from 'src/domain/models';
import { IAppointmentDomainService } from 'src/domain/services/appointment-domain.service';
import { IUseCase } from '../interface/use-case.interface';
import {
  IHealthcareProviderDomainService,
  IPatientDomainService,
} from 'src/domain/services';

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
            const update = new PatientDomainModel({
              _id: patientEntity._id,
              name: patientEntity.name,
              birthDate : patientEntity.birthDate,
              document: patientEntity.document,
              email: patientEntity.email,
              gender: patientEntity.gender,
              phone: patientEntity.phone,
              state: patientEntity.state,
            });
            // Guardar la cita en la entidad del paciente
            update.appointments
              ? update.appointments.push(Entity._id)
              : (update.appointments = [Entity._id]);
            this.patientService.update(patientEntity._id, update);

            // console.log('---------------')
            // console.log('DOCTOR', healthcareProviderEntity._id, healthcareProviderEntity);
            // const update2 = new HealthcareProviderDomainModel({
            //   _id: healthcareProviderEntity._id,
            //   name: healthcareProviderEntity.name,
            //   email: healthcareProviderEntity.email,
            //   phone: healthcareProviderEntity.phone,
            //   specialty: healthcareProviderEntity.specialty,
            // });
            // update2.appointments
            //   ? update2.appointments.push(Entity._id)
            //   : (update2.appointments = [Entity._id]);
            // this.healthcareProviderService.update(
            //   healthcareProviderEntity._id,
            //   update2,);
            return Entity;
          }),
        );
      }),
    );
  }
}
