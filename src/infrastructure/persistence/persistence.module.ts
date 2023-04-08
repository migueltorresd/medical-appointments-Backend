import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongo/mongo.module';
import { AppointmentService } from '../services/appointment.service';
import { HealthcareProviderService } from '../services/healthcare-provider.service';
import { PatientService } from '../services/patient.service';

@Module({
  imports: [MongoModule],
  controllers: [],
  exports: [AppointmentService, HealthcareProviderService, PatientService],
  providers: [AppointmentService, HealthcareProviderService, PatientService],
})
export class PersistenceModule {}
