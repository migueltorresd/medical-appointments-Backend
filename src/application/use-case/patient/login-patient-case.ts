import { Observable, map, switchMap } from 'rxjs';
import { IUseCase } from '../interface/use-case.interface';
import { PatientDomainModel } from '../../../domain/models';
import { IPatientDomainService } from '../../../domain/services';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class LoginPatientUseCase implements IUseCase {
  constructor(private readonly patientService: IPatientDomainService) {}
  execute(email: string, password: string): Observable<PatientDomainModel> {
    return this.patientService.findByEmail(email).pipe(
      switchMap((patient) => {
        if (!patient) {
          throw new NotFoundException('Patient not found');
        }

        const loggedPatient = this.patientService.login(email, password).pipe(
          map((patient) => {
            if (!patient) {
              throw new UnauthorizedException('Password incorrect');
            }

            return patient;
          }),
        );

        return loggedPatient;
      }),
    );
  }
}
