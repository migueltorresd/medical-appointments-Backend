import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PatientSchemaMongo } from './patient.schema';
import { HydratedDocument, SchemaType, SchemaTypeOptions, SchemaTypes, Schema as newSchema } from 'mongoose';
import { HealthcareProviderSchemaMongo } from './healthcare-provider.schema';
import { AppointmentDomainModel } from '../../../../../domain/models/appointment-domain.models';

@Schema({ collection: 'Appointment', versionKey: false })
export class AppointmentSchemaMongo extends AppointmentDomainModel {
  @Prop({
  type: SchemaTypes.ObjectId,
  auto: true
  })
  _id: string;

  @Prop({ required: true })
  appointmentDate: Date;

  @Prop({ required: true })
  hour: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  status: string;

  @Prop({
    type: newSchema.Types.String,
    ref: 'PatientSchemaMongo',
  })
  patient: PatientSchemaMongo['document'];

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'HealthcareProviderSchemaMongo',
  })
  healthcareProviderSchemaMongo: HealthcareProviderSchemaMongo['_id'];
}
export const AppointmentSchema = SchemaFactory.createForClass(
  AppointmentSchemaMongo,
);
export type appointmentDocument = HydratedDocument<PatientSchemaMongo>;
