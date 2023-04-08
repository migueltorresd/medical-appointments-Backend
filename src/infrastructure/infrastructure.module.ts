import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { HealthcareProviderController } from './controllers/healthcare-provider.controllers';
import { PatientController } from './controllers/patient.controllers';
import { AppointmentController } from './controllers/appointment.controllers';

@Module({
  imports: [PersistenceModule],
  controllers: [HealthcareProviderController, PatientController, AppointmentController],
  providers: [],
})
export class InfrastructureModule {}
