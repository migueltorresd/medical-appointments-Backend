import { PatientDomainModel } from '../../../../../domain/models/patient-domain.models';
import { patientDocument, PatientSchemaMongo } from '../schemas/patient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { IBase } from './interface/base.interface';
import { Injectable } from '@nestjs/common';
import { IPatientRepository } from './interface/patient-repository.interface';

@Injectable()
export class PatientRepository
  implements IBase<PatientSchemaMongo>, IPatientRepository
{
  constructor(
    @InjectModel(PatientSchemaMongo.name)
    private readonly patientRepository: Model<patientDocument>,
  ) {}

  findByDocument(document: string): Observable<PatientSchemaMongo> {
    return from(
      this.patientRepository.findOne({ document }).exec(),
    ) as Observable<PatientSchemaMongo>;
  }

  create(patientModel: PatientDomainModel): Observable<PatientSchemaMongo> {
    return from(this.patientRepository.create(patientModel));
  }

  update(
    _id: string,
    entity: PatientDomainModel,
  ): Observable<PatientSchemaMongo> {
    return from(
      this.patientRepository
        .findOneAndUpdate(
          { _id },
          { appointments: entity.appointments },
          { new: true },
        )
        .exec(),
    );
  }

  updatepatient(
    _id: string,
    entity: PatientDomainModel,
  ): Observable<PatientSchemaMongo> {
    return from(
      this.patientRepository.findByIdAndUpdate({ _id }, entity, { new: true }),
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
<<<<<<< HEAD

  findByEmail(email: string): Observable<PatientSchemaMongo> {
    const query = this.patientRepository.where({ email: email });
    return from(query.findOne().exec());
  }
=======
>>>>>>> 3fab1ef96ce9cac9b4b873592763d773fa2c2c79
}
