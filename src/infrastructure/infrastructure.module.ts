import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { HealthcareProviderController } from './controllers/healthcare-provider.controllers';
import { PatientController } from './controllers/patient.controllers';
import { AppointmentController } from './controllers/appointment.controllers';
import { APP_FILTER } from '@nestjs/core';
import { MongoServerErrorExceptionFilter } from './utils/exception-filters/mongo-server-error.exception-filter';

@Module({
  imports: [PersistenceModule],
  controllers: [HealthcareProviderController, PatientController, AppointmentController],
  providers: [{
    provide: APP_FILTER,
    useClass: MongoServerErrorExceptionFilter,
  },],
})
export class InfrastructureModule {}
