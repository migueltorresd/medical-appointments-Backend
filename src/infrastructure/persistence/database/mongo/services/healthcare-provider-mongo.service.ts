import { Observable } from 'rxjs';
import { IHealthcareProviderDomainService } from '../../../../../domain/services/healthcare-provider-domain.service';
import { HealthcareProviderSchemaMongo } from '../schemas/healthcare-provider.schema';
import { HealthcareProviderRepository } from '../repositories/healthcare-provider-repository.mongo';
import { Injectable } from '@nestjs/common';
@Injectable()
export class HealthcareProviderMongoService
  implements IHealthcareProviderDomainService
{
  constructor(
    private readonly healthcareProviderRepository: HealthcareProviderRepository,
  ) {}
  create(
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.create(entity);
  }
  update(
    id: string,
    entity: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.update(id, entity);
  }

  updateHealthcareProvider(
    id: string,
    healthcare: HealthcareProviderSchemaMongo,
  ): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.updateHealthcareProvider(
      id,
      healthcare,
    );
  }
  delete(id: string): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.delete(id);
  }
  findById(id: string): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.findById(id);
  }
  findAll(): Observable<HealthcareProviderSchemaMongo[]> {
    return this.healthcareProviderRepository.findAll();
  }
  findByEmail(email: string): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.findByEmail(email);
  }
}
