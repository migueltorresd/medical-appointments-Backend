import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PatientSchemaMongo } from './patient.schema';
import { HydratedDocument, Schema as newSchema, SchemaTypes } from 'mongoose';
import { HealthcareProviderSchemaMongo } from './healthcare-provider.schema';
import { AppointmentDomainModel } from '../../../../../domain/models/appointment-domain.models';

@Schema({ collection: 'Appointments', versionKey: false })
export class AppointmentSchemaMongo extends AppointmentDomainModel {
  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true,
  })
  _id: string;

  @Prop({ required: true })
  appointmentDate: Date;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  status: 'available' | 'pending' | 'canceled' | 'completed' | 'scheduled';

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'PatientSchemaMongo',
  })
  patient: PatientSchemaMongo['_id'];

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
