import { Observable } from 'rxjs';

export interface IAssignmentDomainService<AssignmentDomainModel> {
  createAssignment(
    assignment: AssignmentDomainModel,
  ): Observable<AssignmentDomainModel>;
}
