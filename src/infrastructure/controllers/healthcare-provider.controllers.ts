import { Body, Controller, Post } from '@nestjs/common';
import { healthcareProviderDelegate } from 'src/application/delegate/healthcare-provider.delegate';
import { HealthcareProviderService } from '../services/healthcare-provider.service';
import { HealthcareProviderDto } from '../dto/healthcare-provider.dto';
import { Observable } from 'rxjs';
import { HealthcareProviderDomainModel } from 'src/domain/models/healthcare-provider-domain.models';

@Controller('Healthcare-Provider')
export class HealthcareProviderController {
  private readonly useCase: healthcareProviderDelegate;

  constructor(
    private readonly healthcareProviderService: HealthcareProviderService,
  ) {
    this.useCase = new healthcareProviderDelegate(healthcareProviderService);
  }

  @Post()
  create(
    @Body() healthcareProvider: HealthcareProviderDto,
  ): Observable<HealthcareProviderDomainModel> {
    this.useCase.toCreateHealthcareProviderUseCase();
    return this.useCase.execute(healthcareProvider);
  }
}
