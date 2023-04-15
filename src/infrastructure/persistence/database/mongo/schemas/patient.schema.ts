import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';
import { HydratedDocument, SchemaTypes, Schema as newSchema } from 'mongoose';
import { PatientDomainModel } from '../../../../../domain/models/patient-domain.models';

@Schema({ collection: 'PatientMongo', versionKey: false, strict: false })
export class PatientSchemaMongo extends PatientDomainModel {
  @Prop({ required: true })
  rol: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true,
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: false })
  birthDate?: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  state?: string;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'AppointmentSchemaMongo' }],
  })
  appointments?: AppointmentSchemaMongo[];
}

export const PatientSchema = SchemaFactory.createForClass(PatientSchemaMongo);
export type patientDocument = HydratedDocument<PatientSchemaMongo>;
