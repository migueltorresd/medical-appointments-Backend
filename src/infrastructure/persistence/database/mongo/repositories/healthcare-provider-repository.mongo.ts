import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { IBase } from './interface/base.interface';
import { HealthcareProviderSchemaMongo } from '../schemas/healthcare-provider.schema';
@Injectable()
export class HealthcareProviderRepository
  implements IBase<HealthcareProviderSchemaMongo>
{
  constructor(
    @InjectModel(HealthcareProviderSchemaMongo.name)
    private readonly appointmentRepository: Model<HealthcareProviderSchemaMongo>,
  ) {}
  create(
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
    return from(this.appointmentRepository.create(entity));
  }
  update(
    _id: string,
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
    return from(this.appointmentRepository.findOneAndUpdate({_id},{appointments: entity.appointments}, {new: true })
      .exec());
  }

  delete(_id: string): Observable<HealthcareProviderSchemaMongo> {
    return from(this.appointmentRepository.findByIdAndDelete(_id));
  }

  findById(_id: string): Observable<HealthcareProviderSchemaMongo> {
    return from(this.appointmentRepository.findById(_id));
  }

  findAll(): Observable<HealthcareProviderSchemaMongo[]> {
    return from(this.appointmentRepository.find().exec());
  }
}
