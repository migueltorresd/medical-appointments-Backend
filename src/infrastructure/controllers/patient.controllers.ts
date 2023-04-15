import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PatientDomainModel } from '../../domain/models/patient-domain.models';
import { PatientDto } from '../dto/patient.dto';
import { PatientService } from '../services/patient.service';
import { PatientDelegate } from '../../application/delegate/patient-delegate';
import { AuthService } from '../utils/service/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpBusinessExceptionFilter } from '../utils/exception-filters/business.exception-filter';

@ApiTags('Patient')
@Controller('patient')
@UseFilters(HttpBusinessExceptionFilter)
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
<<<<<<< HEAD

  @Get('google/:email')
  findByEmail(@Param('email') email: string): Observable<PatientDomainModel> {
    this.useCase.toGetEmailPatient();
    return this.useCase.execute(email);
  }

=======
>>>>>>> 3fab1ef96ce9cac9b4b873592763d773fa2c2c79
}
