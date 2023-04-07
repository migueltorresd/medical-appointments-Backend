import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';
import { HydratedDocument, Schema as newSchema } from 'mongoose';
import { HealthcareProviderDomainModel } from 'src/domain/models/healthcare-provider-domain.models';

@Schema({ collection: 'HealthcareProviderSchemaMongo', versionKey: false })
export class HealthcareProviderSchemaMongo extends HealthcareProviderDomainModel {
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
