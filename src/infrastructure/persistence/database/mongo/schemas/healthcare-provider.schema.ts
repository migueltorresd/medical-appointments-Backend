import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';
import { HydratedDocument, SchemaTypes, Schema as newSchema } from 'mongoose';
import { HealthcareProviderDomainModel } from '../../../../../domain/models/healthcare-provider-domain.models';

@Schema({
  collection: 'HealthcareProviderSchemaMongo',
  versionKey: false,
  strict: false,
})
export class HealthcareProviderSchemaMongo extends HealthcareProviderDomainModel {
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
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({
    type: [{ type: newSchema.Types.ObjectId, ref: 'AppointmentSchemaMongo' }],
  })
  appointments?: AppointmentSchemaMongo[];
}
export const HealthcareProviderSchema = SchemaFactory.createForClass(
  HealthcareProviderSchemaMongo,
);
export type healthcareProviderDocument =
  HydratedDocument<HealthcareProviderSchemaMongo>;
