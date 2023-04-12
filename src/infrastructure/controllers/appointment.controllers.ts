import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppointmentDelegate } from 'src/application/delegate/appointment.delegate';
import { AppointmentDomainModel } from 'src/domain/models';
import { AppointmentDto } from '../dto/appointments.dto';
import { AppointmentService } from '../services/appointment.service';
import { PatientService } from '../services/patient.service';
import { HealthcareProviderService } from '../services/healthcare-provider.service';

@Controller('Appointment')
export class AppointmentController {
  private readonly useCase: AppointmentDelegate;
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    private readonly healthCareProviderService: HealthcareProviderService,
  ) {
    this.useCase = new AppointmentDelegate(
      appointmentService,
      patientService,
      healthCareProviderService,
    );
  }
  @Post()
  create(
    @Body() appointment: AppointmentDto,
  ): Observable<AppointmentDomainModel> {
    this.useCase.toCreateAppointment();
    return this.useCase.execute(appointment, appointment.patient, appointment.healthcareProvider);
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<AppointmentDomainModel> {
    this.useCase.toGetAppointment();
    return this.useCase.execute(id);
  }


  @Delete(':id')
  delete(@Param('id') id: string): Observable<AppointmentDomainModel> {
    this.useCase.toDeleteAppointment();
    return this.useCase.execute(id);
  }

  @Put(':id')
  updateAppointment(
    @Param('id') id: string,
    @Body() appointmentUpdates: Partial<AppointmentDto>,
  ): Observable<AppointmentDomainModel> {
    this.useCase.toUpdateAppointment();
    return this.useCase.execute(id, appointmentUpdates);
  }

  @Get()
  findAll(): Observable<AppointmentDomainModel[]> {
    return this.appointmentService.findAll();
  }
}
