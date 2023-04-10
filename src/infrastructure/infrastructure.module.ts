import { Module } from '@nestjs/common';
import { HealthcareProviderController } from './controllers/healthcare-provider.controllers';
import { PatientController } from './controllers/patient.controllers';
import { AppointmentController } from './controllers/appointment.controllers';
import { APP_FILTER } from '@nestjs/core';
import { MongoServerErrorExceptionFilter } from './utils/exception-filters/mongo-server-error.exception-filter';
import { AppointmentService } from './services/appointment.service';
import { HealthcareProviderService } from './services/healthcare-provider.service';
import { PatientService } from './services/patient.service';
import { MongoModule } from './persistence/database/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [
    HealthcareProviderController,
    PatientController,
    AppointmentController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoServerErrorExceptionFilter,
    },
    AppointmentService,
    HealthcareProviderService,
    PatientService,
  ],
  exports: [AppointmentService, HealthcareProviderService, PatientService],
})
export class InfrastructureModule {}
