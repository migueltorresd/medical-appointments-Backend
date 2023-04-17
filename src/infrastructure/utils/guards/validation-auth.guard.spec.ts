import { BadRequestException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DateGuard } from './validation-auth.guard';

describe('DateGuard', () => {
  let dateGuard: DateGuard;
  let context: ExecutionContext;

  beforeEach(() => {
    dateGuard = new DateGuard();
    context = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          body: {
            loanDate: new Date(2022, 0, 1),
            returnDate: new Date(2022, 0, 2),
          },
        })),
      })),
    } as unknown as ExecutionContext;
  });
  describe('is defined', () => {
    it('should be defined', () => {
      expect(dateGuard).toBeDefined();
    });
  });
  describe('canActivate', () => {
    it('should return true when returnDate is greater than or equal to loanDate', (done) => {
      // Arrange
      const expected = true;

      // Act
      const observable = dateGuard.canActivate(context);
      observable.subscribe((result) => {
        // Assert
        expect(result).toBe(expected);
        done();
      });
    });
  });
  it('should return true when returnDate is equal to loanDate', (done) => {
    // Arrange
    context.switchToHttp().getRequest().body.returnDate = new Date(2022, 0, 1);

    // Act
    const observable = dateGuard.canActivate(context);

    // Assert
    observable.subscribe({
      next: (result) => {
        expect(result).toBe(true);
        done();
      },
      error: (err) => {
        done.fail(err);
      },
    });
  });
});
