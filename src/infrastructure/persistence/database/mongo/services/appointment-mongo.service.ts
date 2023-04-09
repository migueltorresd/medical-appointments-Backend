import { Observable } from 'rxjs';
import { IAppointmentDomainService } from '../../../../../domain/services/appointment-domain.service';
import { AppointmentRepository } from '../repositories/appointment-repository.mongo';
import { AppointmentSchemaMongo } from '../schemas/appointment.schema';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppointmentMongoService implements IAppointmentDomainService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}
  create(entity: AppointmentSchemaMongo): Observable<AppointmentSchemaMongo> {
    return this.appointmentRepository.create(entity);
  }
  update(
    id: string,
    entity: AppointmentSchemaMongo,
  ): Observable<AppointmentSchemaMongo> {
    return this.appointmentRepository.update(id, entity);
  }
  delete(id: string): Observable<AppointmentSchemaMongo> {
    return this.appointmentRepository.delete(id);
  }
  findById(id: string): Observable<AppointmentSchemaMongo> {
    return this.appointmentRepository.findById(id);
  }
  findAll(): Observable<AppointmentSchemaMongo[]> {
    return this.appointmentRepository.findAll();
  }
}
