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
import { AppointmentDelegate } from '../../application/delegate/appointment.delegate';
import { AppointmentDomainModel } from '../../domain/models/appointment-domain.models';
import { AppointmentDto } from '../dto/appointments.dto';
import { AppointmentService } from '../services/appointment.service';
import { PatientService } from '../services/patient.service';
import { HealthcareProviderService } from '../services/healthcare-provider.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Appointment')
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
  @ApiOperation({ summary: 'Create appointment' })
  @Post()
  create(
    @Body() appointment: AppointmentDto,
  ): Observable<AppointmentDomainModel> {
    this.useCase.toCreateAppointment();
    return this.useCase.execute(appointment, appointment.patient, appointment.healthcareProvider);
  }

  @ApiOperation({ summary: 'Get appointment by id' })
  @Get(':id')
  findById(@Param('id') id: string): Observable<AppointmentDomainModel> {
    this.useCase.toGetAppointment();
    return this.useCase.execute(id);
  }

 @ApiOperation({ summary: 'Delete appointment by id' })
  @Delete(':id')
  delete(@Param('id') id: string): Observable<AppointmentDomainModel> {
    this.useCase.toDeleteAppointment();
    return this.useCase.execute(id);
  }

  @ApiOperation({ summary: 'Update appointment by id' })
  @Put(':id')
  updateAppointment(
    @Param('id') id: string,
    @Body() appointmentUpdates: Partial<AppointmentDto>,
  ): Observable<AppointmentDomainModel> {
    this.useCase.toUpdateAppointment();
    return this.useCase.execute(id, appointmentUpdates);
  }

  @ApiOperation({ summary: 'Get all appointments' })
  @Get()
  findAll(): Observable<AppointmentDomainModel[]> {
    return this.appointmentService.findAll();
  }
}
