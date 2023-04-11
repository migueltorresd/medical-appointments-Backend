import { Module } from "@nestjs/common";
import { MongoModule } from "./database/mongo/mongo.module";
import { AppointmentService } from "../services/appointment.service";
import { HealthcareProviderService } from "../services/healthcare-provider.service";
import { PatientService } from "../services/patient.service";
import { AuthService } from "../utils/service/auth.service";

@Module
({
    imports: [MongoModule],
    controllers: [],
    providers: [ AppointmentService,
        HealthcareProviderService,
        PatientService,
        AuthService,],
    exports: [ AppointmentService,
        HealthcareProviderService,
        PatientService,
        AuthService,]
})
export class persistenceModule {}