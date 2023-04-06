import { IAssignmentDomain } from './interface';

export class AssignmentDomainModel implements IAssignmentDomain {
  documentPatient: string;
  healthcareProviderId: string;
}
