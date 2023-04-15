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
    private readonly healthcareProviderRepository: Model<HealthcareProviderSchemaMongo>,
  ) {}
  create(
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
    return from(this.healthcareProviderRepository.create(entity));
  }
  update(
    _id: string,
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
<<<<<<< HEAD
    return from(this.healthcareProviderRepository.findOneAndUpdate({_id},{appointments: entity.appointments}, {new: true })
      .exec());
=======
    return from(
      this.appointmentRepository
        .findOneAndUpdate(
          { _id },
          { appointments: entity.appointments },
          { new: true },
        )
        .exec(),
    );
>>>>>>> 3fab1ef96ce9cac9b4b873592763d773fa2c2c79
  }
  updateHealthcareProvider(
    _id: string,
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
<<<<<<< HEAD
return from(this.healthcareProviderRepository.findByIdAndUpdate(_id, entity, {new: true }));
=======
    return from(
      this.appointmentRepository.findByIdAndUpdate(_id, entity, { new: true }),
    );
>>>>>>> 3fab1ef96ce9cac9b4b873592763d773fa2c2c79
  }

  delete(_id: string): Observable<HealthcareProviderSchemaMongo> {
    return from(this.healthcareProviderRepository.findByIdAndDelete(_id));
  }

  findById(_id: string): Observable<HealthcareProviderSchemaMongo> {
    return from(this.healthcareProviderRepository.findById(_id));
  }

  findAll(): Observable<HealthcareProviderSchemaMongo[]> {
    return from(this.healthcareProviderRepository.find().exec());
  }
  findByEmail(email: string): Observable<HealthcareProviderSchemaMongo> {
    const query = this.healthcareProviderRepository.where({email: email});
    return from(query.findOne().exec());
  }
}
