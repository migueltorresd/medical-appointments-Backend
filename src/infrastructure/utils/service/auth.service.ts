import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable, of } from "rxjs";
import { IPatientDomain } from "src/domain/models";
import { IAuthService } from "src/domain/services/auth.service";

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(patient: IPatientDomain): Observable<{
    data: IPatientDomain;
    token: string;
  }> {
    return of({
      data: patient,
      token: this.jwtService.sign({
        email: patient.email,
        name: patient.name,
      }),
    });
  }
}
