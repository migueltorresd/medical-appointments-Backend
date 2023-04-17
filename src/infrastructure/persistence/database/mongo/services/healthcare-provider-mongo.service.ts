import { Observable } from 'rxjs';
import { IHealthcareProviderDomainService } from '../../../../../domain/services/healthcare-provider-domain.service';
import { HealthcareProviderSchemaMongo } from '../schemas/healthcare-provider.schema';
import { HealthcareProviderRepository } from '../repositories/healthcare-provider-repository.mongo';
import { Injectable } from '@nestjs/common';
import { HealthcareProviderDomainModel } from 'src/domain/models';
@Injectable()
export class HealthcareProviderMongoService
  implements IHealthcareProviderDomainService
{
  static findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly healthcareProviderRepository: HealthcareProviderRepository,
  ) {}
  login(
    email: string,
    password: string,
  ): Observable<HealthcareProviderDomainModel> {
    return this.healthcareProviderRepository.login(email, password);
  }
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
