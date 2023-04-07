import { Model } from 'mongoose';
import { AppointmentSchemaMongo } from '../schemas/appointment.schema';
import { IBase } from './interface/base.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, from } from 'rxjs';

export class AppointmentRepository implements IBase<AppointmentSchemaMongo> {
  constructor(
    @InjectModel(AppointmentSchemaMongo.name)
    private readonly appointmentRepository: Model<AppointmentSchemaMongo>,
  ) {}

  create(
    appointmentModel: AppointmentSchemaMongo,
  ): Observable<AppointmentSchemaMongo> {
    return from(this.appointmentRepository.create(appointmentModel));
  }

  update(
    _id: string,
    entity: AppointmentSchemaMongo,
  ): Observable<AppointmentSchemaMongo> {
    return from(this.appointmentRepository.findByIdAndUpdate(_id, entity));
  }

  delete(_id: string): Observable<AppointmentSchemaMongo> {
    return from(this.appointmentRepository.findByIdAndDelete(_id));
  }

  findById(_id: string): Observable<AppointmentSchemaMongo> {
    return from(this.appointmentRepository.findById(_id));
  }

  findAll(): Observable<AppointmentSchemaMongo[]> {
    return from(this.appointmentRepository.find().exec());
  }
}
