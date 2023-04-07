import { Observable } from 'rxjs';
import { IHealthcareProviderDomainService } from 'src/domain/services/healthcare-provider-domain.service';
import { HealthcareProviderSchemaMongo } from '../schemas/healthcare-provider.schema';
import { HealthcareProviderRepository } from '../repositories/healthcare-provider-repository.mongo';

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
  delete(id: string): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.delete(id);
  }
  findById(id: string): Observable<HealthcareProviderSchemaMongo> {
    return this.healthcareProviderRepository.findById(id);
  }
  findAll(): Observable<HealthcareProviderSchemaMongo[]> {
    return this.healthcareProviderRepository.findAll();
  }
}
