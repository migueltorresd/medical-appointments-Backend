import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';
import { HydratedDocument, Schema as newSchema } from 'mongoose';
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';

@Schema({ collection: 'PatientMongo', versionKey: false })
export class PatientSchemaMongo extends PatientDomainModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  medicalhistory: string;

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'AppointmentSchemaMongo',
    default: [],
  })
  appointment: AppointmentSchemaMongo[];
}

export const PatientSchema = SchemaFactory.createForClass(PatientSchemaMongo);
export type patientDocument = HydratedDocument<PatientSchemaMongo>;
