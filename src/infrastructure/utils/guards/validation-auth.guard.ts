import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

/**
 *
 *
 * @export
 * @class DateGuard
 * @implements {CanActivate}
 */
@Injectable()
export class DateGuard implements CanActivate {
  /**
   * 
   *
   * @param {ExecutionContext} context
   * @returns {Observable<boolean>}
   */
  canActivate(context: ExecutionContext): Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const body = req.body;
    const loanDate = body.loanDate;
    const returnDate = body.returnDate;

    return of(returnDate >= loanDate).pipe(
      filter((isValid) => isValid),
      map(() => true),
      catchError(() =>
        throwError(
          new BadRequestException(
            'La fecha de cita no es valida.',
          ),
        ),
      ),
    );
  }
}
