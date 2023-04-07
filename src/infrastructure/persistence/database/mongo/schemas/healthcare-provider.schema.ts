import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';
import { HydratedDocument, Schema as newSchema } from 'mongoose';

@Schema({ collection: 'HealthcareProviderSchemaMongo', versionKey: false })
export class HealthcareProviderSchemaMongo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  specialty: string;
  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'AppointmentSchemaMongo',
    default: [],
  })
  appointment: AppointmentSchemaMongo[];
}
export const HealthcareProviderSchema = SchemaFactory.createForClass(
  HealthcareProviderSchemaMongo,
);
export type healthcareProviderDocument =
  HydratedDocument<HealthcareProviderSchemaMongo>;
