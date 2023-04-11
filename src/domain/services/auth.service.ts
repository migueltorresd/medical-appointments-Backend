import { Observable } from "rxjs";
import { IPatientDomain } from "../models";

export interface IAuthService {
    generateToken(
      id: IPatientDomain,
    ): Observable<{ data: IPatientDomain; token: string }>;
  }