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
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';
import { PatientDto } from '../dto/patient.dto';
import { PatientService } from '../services/patient.service';
import { PatientDelegate } from 'src/application/delegate/patient-delegate';

@Controller('patient')
export class PatientController {
  private readonly useCase: PatientDelegate;

  constructor(private readonly patientService: PatientService) {
    this.useCase = new PatientDelegate(patientService);
  }
  @Post()
  create(@Body() patient: PatientDto): Observable<PatientDomainModel> {
    this.useCase.toCreatePatient();
    return this.useCase.execute(patient);
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<PatientDomainModel> {
    this.useCase.toGetPatient();
    return this.useCase.execute(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<PatientDomainModel> {
    this.useCase.toDeletePatient();
    return this.useCase.execute(id);
  }

  @Put(':id')
  updatePatient(
    @Param('id') id: string,
    @Body() patientUpdates: Partial<PatientDto>,
  ): Observable<PatientDomainModel> {
    this.useCase.toUpdatePatient();
    return this.useCase.execute(id, patientUpdates);
  }
}
