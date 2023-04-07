import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongo/mongo.module';
import { AppointmentService } from '../services/appointment.service';
import { healthcareProviderService } from '../services/healthcare-provider.service';
import { PatientService } from '../services/patient.service';

@Module({
  imports: [MongoModule],
  controllers: [],
  exports: [AppointmentService, healthcareProviderService, PatientService],
  providers: [AppointmentService, healthcareProviderService, PatientService],
})
export class PersistenceModule {}
