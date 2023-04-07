import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HealthcareProviderSchemaMongo } from './healthcare-provider.schema';
import { HydratedDocument, Schema as newSchema } from 'mongoose';
import { AppointmentSchemaMongo } from './appointment.schema';

@Schema({ collection: 'Calendar', versionKey: false })
export class CalendarSchemaMongo {
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
export const CalendarSchema = SchemaFactory.createForClass(CalendarSchemaMongo);
export type assignmentDocument = HydratedDocument<CalendarSchemaMongo>;
