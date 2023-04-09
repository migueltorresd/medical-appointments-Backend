import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';
import { HydratedDocument, Schema as newSchema } from 'mongoose';
import { PatientDomainModel } from '../../../../../domain/models/patient-domain.models';

@Schema({ collection: 'PatientMongo', versionKey: false })
export class PatientSchemaMongo extends PatientDomainModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  state: string;

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'AppointmentSchemaMongo'
  })
  appointment?: AppointmentSchemaMongo['_id'][]=[];
}

export const PatientSchema = SchemaFactory.createForClass(PatientSchemaMongo);
export type patientDocument = HydratedDocument<PatientSchemaMongo>;
