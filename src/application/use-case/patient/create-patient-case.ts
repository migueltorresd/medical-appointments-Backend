import { Observable, switchMap } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models/patient-domain.models';
import { IPatientDomainService } from 'src/domain/services/patient-domain.service';
import { IUseCase } from '../interface/use-case.interface';
import { IAuthService } from 'src/domain/services/auth.service';
import { BadRequestException } from '@nestjs/common';

export class CreatePatientUseCase implements IUseCase {
  constructor(
    private readonly patientService: IPatientDomainService,
    private authService: IAuthService,
  ) {}

  execute(
    patientEntity: PatientDomainModel,
  ): Observable<{ data: PatientDomainModel; token: string }> {
    return this.patientService.findByDocument(patientEntity.document).pipe(
      switchMap((user) => {
        if (user) throw new BadRequestException('User already exists');

        return this.patientService.create(patientEntity).pipe(
          switchMap((user) => {
            return this.authService.generateToken(user);
          }),
        );
      }),
    );
  }
}
