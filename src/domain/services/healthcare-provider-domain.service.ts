import { Observable } from 'rxjs';

export interface IHealthcareProviderDomainService<
  HealthcareProviderDomainModel,
> {
  createHealthcareProvider(
    HealthcareProviderModel: HealthcareProviderDomainModel,
  ): Observable<HealthcareProviderDomainModel>;
  updateHealthcareProvider(
    HealthcareProviderModel: HealthcareProviderDomainModel,
  ): Observable<HealthcareProviderDomainModel>;
  deleteHealthcareProvider(
    HealthcareProviderModel: HealthcareProviderDomainModel,
  ): Observable<HealthcareProviderDomainModel>;
  getHealthcareProvider(
    HealthcareProviderModel: HealthcareProviderDomainModel,
  ): Observable<HealthcareProviderDomainModel>;
}
