import { PatientDomainModel } from '../../../../../domain/models/patient-domain.models';
import { PatientSchemaMongo } from '../schemas/patient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, map, of } from 'rxjs';
import { IBase } from './interface/base.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { patientDocument } from '../schemas/patient.schema';

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
    return from(
      this.patientRepository.findOneAndUpdate({_id}, {appointments: entity.appointments}, {new: true})
      .exec(),
    );
  }

  updatepatient(
    _id: string,
    entity: PatientDomainModel,
  ): Observable<PatientSchemaMongo> {
    return from(this.patientRepository.findByIdAndUpdate({_id}, entity, {new: true}))
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

  findByEmail(email: string): Observable<PatientSchemaMongo> {
    const query = this.patientRepository.where({ email: email });
    return from(query.findOne().exec());
  }
}
