import { Observable } from 'rxjs';
import { HealthcareProviderDomainModel } from 'src/domain/models/healthcare-provider-domain.models';
import { IHealthcareProviderDomainService } from 'src/domain/services/healthcare-provider-domain.service';
import { IUseCase } from '../interface/use-case.interface';

export class DeleteHealthcareProviderUseCase implements IUseCase {
  constructor(
    private readonly healthcareProviderService: IHealthcareProviderDomainService,
  ) {}

  execute(
    _id: string,
    healthcareProvider: HealthcareProviderDomainModel,
  ): Observable<HealthcareProviderDomainModel> {
    return this.healthcareProviderService.delete(_id);
  }
}
