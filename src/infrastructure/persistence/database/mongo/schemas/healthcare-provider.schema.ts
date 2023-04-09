import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';
import { HydratedDocument, SchemaTypes, Schema as newSchema } from 'mongoose';
import { HealthcareProviderDomainModel } from '../../../../../domain/models/healthcare-provider-domain.models';

@Schema({ collection: 'HealthcareProviderSchemaMongo', versionKey: false })
export class HealthcareProviderSchemaMongo extends HealthcareProviderDomainModel {
  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true
    })
    _id: string;

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
  })
  appointment?: AppointmentSchemaMongo['_id'];
}
export const HealthcareProviderSchema = SchemaFactory.createForClass(
  HealthcareProviderSchemaMongo,
);
export type healthcareProviderDocument =
  HydratedDocument<HealthcareProviderSchemaMongo>;
