import { Observable } from 'rxjs';
import { IPatientDomainService } from 'src/domain/services/patient-domain.service';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { CreatePatientUseCase } from '../use-case/patient/create-patient-case';
import { DeletePatientUseCase } from '../use-case/patient/delete.patient-case';
import { UpdatePatientUseCase } from '../use-case/patient/update-patient-case';
import { GetPatienUseCase } from '../use-case/patient/get-patient-case';

export class PatiendtDelegate implements IUseCase {
  private delegate: IUseCase;
  constructor(private readonly patientService: IPatientDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreatepatient() {
    this.delegate = new CreatePatientUseCase(this.patientService);
  }

  toUpdatepatient() {
    this.delegate = new UpdatePatientUseCase(this.patientService);
  }

  toDeletepatient() {
    this.delegate = new DeletePatientUseCase(this.patientService);
  }

  toGetpatient() {
    this.delegate = new GetPatienUseCase(this.patientService);
  }
}
