import { IHealthcareProviderDomainService } from 'src/domain/services/healthcare-provider-domain.service';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { Observable } from 'rxjs';
import { CreateHealthcareProviderUseCase } from '../use-case/healthcare-provider/create-healthcare-provider.case';
import { GetHealthcareProviderUseCase } from '../use-case/healthcare-provider/get-healthcare-provider.case';
import { UpdateHealthcareProviderUseCase } from '../use-case/healthcare-provider/update-healthcare-provider.case';
import { DeleteHealthcareProviderUseCase } from '../use-case/healthcare-provider/delete-healthcare-provuder.case';

export class HealthcareProviderDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly healthcareproviderService: IHealthcareProviderDomainService,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateHealthcareProviderUseCase() {
    this.delegate = new CreateHealthcareProviderUseCase(
      this.healthcareproviderService,
    );
  }

  toGetHealthcareProviderUseCase() {
    this.delegate = new GetHealthcareProviderUseCase(
      this.healthcareproviderService,
    );
  }
  toUpdateHealthcareProviderUseCase() {
    this.delegate = new UpdateHealthcareProviderUseCase(
      this.healthcareproviderService,
    );
  }
  toDeleteHealthcareProviderUseCase() {
    this.delegate = new DeleteHealthcareProviderUseCase(
      this.healthcareproviderService,
    );
  }
}
