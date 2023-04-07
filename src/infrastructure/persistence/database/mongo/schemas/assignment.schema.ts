import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HealthcareProviderSchemaMongo } from './healthcare-provider.schema';
import { HydratedDocument, Schema as newSchema } from 'mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';

@Schema({ collection: 'Assignment', versionKey: false })
export class AssignmentSchemaMongo {
  @Prop({ required: true })
  calendarDate: Date;

  @Prop({ required: true })
  hour: string;

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'HealthcareProviderSchemaMongo',
    default: [],
  })
  healthcareProviderSchemaMongo: HealthcareProviderSchemaMongo[];

  @Prop({
    type: newSchema.Types.ObjectId,
    ref: 'AppointmentSchemaMongo',
    default: [],
  })
  appointment: AppointmentSchemaMongo[];
}
export const AssignmentSchema = SchemaFactory.createForClass(
  AssignmentSchemaMongo,
);
export type assignmentDocument = HydratedDocument<AssignmentSchemaMongo>;
