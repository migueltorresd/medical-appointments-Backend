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
  static findByEmail: any;
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
    return from(
      this.healthcareProviderRepository
        .findOneAndUpdate(
          { _id },
          { appointments: entity.appointments },
          { new: true },
        )
        .exec(),
    );
  }
  updateHealthcareProvider(
    _id: string,
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
    return from(
      this.healthcareProviderRepository.findByIdAndUpdate(_id, entity, {
        new: true,
      }),
    );
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
    const query = this.healthcareProviderRepository.where({ email: email });
    return from(query.findOne().exec());
  }

  login(
    email: string,
    password: string,
  ): Observable<HealthcareProviderSchemaMongo> {
    const query = this.healthcareProviderRepository
      .find({ email })
      .where({ password });
    return from(query.findOne().exec());
  }
}
