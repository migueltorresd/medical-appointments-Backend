import { PatientDomainModel } from 'src/domain/models/patient-domain.models';
import { PatientSchemaMongo } from '../schemas/patient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { IBase } from './interface/base.interface';

export class PatientRepository implements IBase<PatientSchemaMongo> {
  constructor(
    @InjectModel(PatientSchemaMongo.name)
    private readonly patientRepository: Model<PatientSchemaMongo>,
  ) {}

  create(patientModel: PatientDomainModel): Observable<PatientSchemaMongo> {
    return from(this.patientRepository.create(patientModel));
  }

  update(
    _id: string,
    entity: PatientDomainModel,
  ): Observable<PatientSchemaMongo> {
    return from(this.patientRepository.findByIdAndUpdate(_id, entity));
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
