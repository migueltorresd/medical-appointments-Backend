import { Observable, switchMap } from 'rxjs';
import { IPatientDomainService } from '../../../domain/services/patient-domain.service';
import { IUseCase } from '../interface/use-case.interface';
import { PatientDomainModel } from '../../../domain/models/patient-domain.models';
import { AuthService } from '../../../infrastructure/utils/service/auth.service';

export class GetPatientUseCase implements IUseCase {
  constructor(
    private readonly patientService: IPatientDomainService,
    private readonly authService: AuthService,
  ) {}

  execute(id: string): Observable<{ data: PatientDomainModel; token: string }> {
    return this.patientService.findById(id).pipe(
      switchMap((patient) => {
        return this.authService.generateToken(patient);
      }),
    );
  }
}
