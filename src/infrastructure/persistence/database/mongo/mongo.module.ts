import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './configs/mongo.config';
import { PatientSchema, PatientSchemaMongo } from './schemas/patient.schema';
import {
  AppointmentSchema,
  AppointmentSchemaMongo,
} from './schemas/appointment.schema';
import {
  HealthcareProviderSchema,
  HealthcareProviderSchemaMongo,
} from './schemas/healthcare-provider.schema';
import { CalendarSchema, CalendarSchemaMongo } from './schemas/calendar.schema';
import { PatientMongoService } from './services/patient-mongo.service';
import { PatientRepository } from './repositories/patient-repository.mongo';
import { AppointmentRepository } from './repositories/appointment-repository.mongo';
import { AppointmentMongoService } from './services/appointment-mongo.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      { schema: PatientSchema, name: PatientSchemaMongo.name },
      { schema: AppointmentSchema, name: AppointmentSchemaMongo.name },
      {
        schema: HealthcareProviderSchema,
        name: HealthcareProviderSchemaMongo.name,
      },
      {
        schema: CalendarSchema,
        name: CalendarSchemaMongo.name,
      },
    ]),
  ],
  controllers: [],
  providers: [
    MongooseConfigService,
    PatientMongoService,
    AppointmentMongoService,
    PatientRepository,
    AppointmentRepository,
  ],
  exports: [
    PatientMongoService,
    AppointmentMongoService,
    PatientRepository,
    AppointmentRepository,
  ],
})
export class MongoModule {}
