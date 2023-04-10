import { PatientDomainModel } from '../../../../../domain/models/patient-domain.models';
import { PatientSchemaMongo } from '../schemas/patient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, map } from 'rxjs';
import { IBase } from './interface/base.interface';
import { Injectable } from '@nestjs/common';
import { patientDocument } from '../schemas/patient.schema';
import { catchError } from 'rxjs/operators';
@Injectable()
export class PatientRepository implements IBase<PatientSchemaMongo> {
  constructor(
    @InjectModel(PatientSchemaMongo.name)
    private readonly patientRepository: Model<patientDocument>,
  ) {}

  create(patientModel: PatientDomainModel): Observable<PatientSchemaMongo> {
    return from(this.patientRepository.create(patientModel));
  }

  update(
    _id: string,
    entity: PatientDomainModel,
  ): Observable<PatientSchemaMongo> {
    console.log('updateddddddddd', _id, entity);
    return from(
      this.patientRepository.findOneAndUpdate({_id}, {appointments: entity.appointments}, {new: true})
      .exec(),
    );
  }

  delete(_id: string): Observable<PatientSchemaMongo> {
    return from(this.patientRepository.findByIdAndDelete(_id));
  }

  findById(_id: string): Observable<PatientSchemaMongo> {
    return from(this.patientRepository.findById(_id));
  }

  findAll(): Observable<PatientSchemaMongo[]> {
    return from(this.patientRepository.find().exec());
  }
}
