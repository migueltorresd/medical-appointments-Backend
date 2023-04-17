import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Observable, switchMap, map } from "rxjs";
import { HealthcareProviderDomainModel } from "../../../domain/models";
import { IUseCase } from "../interface/use-case.interface";
import { IHealthcareProviderDomainService } from "../../../domain/services";

export class LoginHealthcareUseCase implements IUseCase {
    constructor(private readonly healthcareService: IHealthcareProviderDomainService) {}

    execute(email: string, password: string): Observable<HealthcareProviderDomainModel> {
        return this.healthcareService.findByEmail(email).pipe(
            switchMap((healthcare) => {
                if (!healthcare) {
                    throw new NotFoundException('Healthcare not found');
                }

                const loggedHealthcare = this.healthcareService.login(email, password).pipe(
                    map((healthcare) => {
                        if (!healthcare) {
                            throw new UnauthorizedException('Password incorrect');
                        }

                        return healthcare;
                    }),
                );

                return loggedHealthcare;
            }),
        );
    }
}