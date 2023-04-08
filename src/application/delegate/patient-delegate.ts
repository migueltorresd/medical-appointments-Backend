import { Observable } from 'rxjs';
import { IPatientDomainService } from 'src/domain/services/patient-domain.service';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { CreatePatientUseCase } from '../use-case/patient/create-patient-case';
import { DeletePatientUseCase } from '../use-case/patient/delete.patient-case';
import { UpdatePatientUseCase } from '../use-case/patient/update-patient-case';
import { GetPatientUseCase } from '../use-case/patient/get-patient-case';

export class PatientDelegate implements IUseCase {
  private delegate: IUseCase;
  constructor(private readonly patientService: IPatientDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreatePatient() {
    this.delegate = new CreatePatientUseCase(this.patientService);
  }

  toUpdatePatient() {
    this.delegate = new UpdatePatientUseCase(this.patientService);
  }

  toDeletePatient() {
    this.delegate = new DeletePatientUseCase(this.patientService);
  }

  toGetPatient() {
    this.delegate = new GetPatientUseCase(this.patientService);
  }
}
