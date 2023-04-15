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
import { PatientDomainModel } from '../../domain/models/patient-domain.models';
import { PatientDto } from '../dto/patient.dto';
import { PatientService } from '../services/patient.service';
import { PatientDelegate } from '../../application/delegate/patient-delegate';
import { AuthService } from '../utils/service/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  private readonly useCase: PatientDelegate;

  constructor(
    private readonly patientService: PatientService,
    private readonly authService: AuthService,
  ) {
    this.useCase = new PatientDelegate(patientService, authService);
  }

  @ApiOperation({ summary: 'Create patient' })
  @Post()
  create(@Body() patient: PatientDto): Observable<PatientDomainModel> {
    this.useCase.toCreatePatient();
    return this.useCase.execute(patient);
  }

  @ApiOperation({ summary: 'Get patient by id' })
  @Get(':id')
  findById(
    @Param('id') id: string,
  ): Observable<{ data: PatientDomainModel; token: string }> {
    this.useCase.toGetPatient();
    return this.useCase.execute(id);
  }

  @ApiOperation({ summary: 'Delete patient by id' })
  @Delete(':id')
  delete(@Param('id') id: string): Observable<PatientDomainModel> {
    return this.patientService.delete(id);
  }

  @ApiOperation({ summary: 'Update patient by id' })
  @Put(':id')
  updatePatient(
    @Param('id') id: string,
    @Body() patientUpdates: Partial<PatientDto>,
  ): Observable<PatientDomainModel> {
    this.useCase.toUpdatePatient();
    return this.useCase.execute(id, patientUpdates);
  }

  @Get('google/:email')
  findByEmail(@Param('email') email: string): Observable<PatientDomainModel> {
    return this.patientService.findByEmail(email);
  }

}
