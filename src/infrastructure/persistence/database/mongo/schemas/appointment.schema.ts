import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PatientSchemaMongo } from './patient.schema';
import { HydratedDocument, Schema as newSchema } from 'mongoose';
import { HealthcareProviderSchemaMongo } from './healthcare-provider.schema';
import { AppointmentDomainModel } from 'src/domain/models';

@Schema({ collection: 'Appointment', versionKey: false })
export class AppointmentSchemaMongo extends AppointmentDomainModel {
  @Prop({ required: true })
  appointmentDate: Date;

  @Prop({ required: true })
  hour: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  status: string;

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'PatientSchemaMongo',
    default: [],
  })
  patient: PatientSchemaMongo[];

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'HealthcareProviderSchemaMongo',
    default: [],
  })
  healthcareProviderSchemaMongo: HealthcareProviderSchemaMongo[];
}
export const AppointmentSchema = SchemaFactory.createForClass(
  AppointmentSchemaMongo,
);
export type appointmentDocument = HydratedDocument<PatientSchemaMongo>;
