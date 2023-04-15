import { Observable } from "rxjs";
import { IUseCase } from "../interface/use-case.interface";
import { PatientDomainModel } from "src/domain/models";
import { IPatientDomainService } from "src/domain/services";


export class SearchByEmailUseCase implements IUseCase {
    constructor(private readonly patientService: IPatientDomainService) {}
  execute(email: string): Observable<PatientDomainModel> {
    return this.patientService.findByEmail(email);
  }
}
