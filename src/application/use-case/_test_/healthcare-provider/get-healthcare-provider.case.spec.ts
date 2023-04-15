import { Observable } from 'rxjs';
import { HealthcareProviderDomainModel } from 'src/domain/models/healthcare-provider-domain.models';
import { IHealthcareProviderDomainService } from 'src/domain/services';
import { GetHealthcareProviderUseCase } from '../../healthcare-provider/get-healthcare-provider.case';

describe('GetHealthcareProviderUseCase', () => {
  let getHealthcareProviderUseCase: GetHealthcareProviderUseCase;
  let healthcareProviderServiceMock: jest.Mocked<IHealthcareProviderDomainService>;
  const healthcareProviderId = '123';

  beforeEach(() => {
    healthcareProviderServiceMock = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateHealthcareProvider: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IHealthcareProviderDomainService>;

    getHealthcareProviderUseCase = new GetHealthcareProviderUseCase(
      healthcareProviderServiceMock,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(getHealthcareProviderUseCase).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should return a healthcare provider when given a valid ID', () => {
      // Arrange
      const expectedHealthcareProvider: HealthcareProviderDomainModel = {
        rol: 'healthcareProvider',
        name: 'Test Healthcare Provider',
        email: '@jefe.com',
        password: '123456',
        phone: '555-555-5555',
        specialty: 'Test',
      };
      healthcareProviderServiceMock.findById.mockReturnValueOnce(
        new Observable((subscriber) => {
          subscriber.next(expectedHealthcareProvider);
          subscriber.complete();
        }),
      );

      // Act
      const observable =
        getHealthcareProviderUseCase.execute(healthcareProviderId);

      // Assert
      return observable.toPromise().then((healthcareProvider) => {
        expect(healthcareProvider).toEqual(expectedHealthcareProvider);
        expect(healthcareProviderServiceMock.findById).toHaveBeenCalledWith(
          healthcareProviderId,
        );
      });
    });

    it('should throw an error when the healthcare provider is not found', () => {
      // Arrange
      healthcareProviderServiceMock.findById.mockReturnValueOnce(
        new Observable((subscriber) => {
          subscriber.next(undefined);
          subscriber.complete();
        }),
      );

      // Act
      const observable =
        getHealthcareProviderUseCase.execute(healthcareProviderId);

      // Assert
      return observable.toPromise().catch((error) => {
        expect(error.message).toBe(
          `Healthcare provider with ID ${healthcareProviderId} not found`,
        );
        expect(healthcareProviderServiceMock.findById).toHaveBeenCalledWith(
          healthcareProviderId,
        );
      });
    });
  });
});
