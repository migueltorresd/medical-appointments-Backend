import { IHealthcareProviderDomain } from './interface';

export class HealthcareProviderDomainModel
  implements IHealthcareProviderDomain
{
  name: string;
  email: string;
  phone: string;
}
