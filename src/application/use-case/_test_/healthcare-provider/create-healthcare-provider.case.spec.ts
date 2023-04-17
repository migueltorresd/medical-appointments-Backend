import { of, throwError } from 'rxjs';
import { HealthcareProviderDomainModel } from 'src/domain/models';
import { IHealthcareProviderDomainService } from 'src/domain/services';
import { CreateHealthcareProviderUseCase } from '../../healthcare-provider/create-healthcare-provider.case';

describe('CreateHealthcareProviderUseCase', () => {
  let createHealthcareProviderUseCase: CreateHealthcareProviderUseCase;
  let healthcareProviderService: IHealthcareProviderDomainService;

  beforeEach(() => {
    healthcareProviderService = {
      create: jest.fn(),
      update: jest.fn(),
      updateHealthcareProvider: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      login: jest.fn(),
    };
    createHealthcareProviderUseCase = new CreateHealthcareProviderUseCase(
      healthcareProviderService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const healthcareProviderEntity: HealthcareProviderDomainModel = {
      rol: 'healthcareProvider',
      name: 'John Doe',
      specialty: 'cardiologist',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '555-555-5555',
      appointments: [],
    };

    const healthcareProviderCreated: HealthcareProviderDomainModel = {
      rol: 'healthcareProvider',
      name: 'John Doe',
      specialty: 'cardiologist',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '555-555-5555',
      appointments: [],
    };

    test('should create a healthcare provider', (done) => {
      // Arrange
      (
        healthcareProviderService.create as jest.MockedFunction<
          typeof healthcareProviderService.create
        >
      ).mockReturnValueOnce(of(healthcareProviderCreated));

      // Act
      createHealthcareProviderUseCase
        .execute(healthcareProviderEntity)
        .subscribe((result) => {
          // Assert
          expect(result).toEqual(healthcareProviderCreated);
          expect(healthcareProviderService.create).toHaveBeenCalledWith(
            healthcareProviderEntity,
          );
          done();
        });
    });

    test('should propagate an error from healthcareProviderService', (done) => {
      // Arrange
      const error = new Error('dummy-error');
      (
        healthcareProviderService.create as jest.MockedFunction<
          typeof healthcareProviderService.create
        >
      ).mockReturnValueOnce(throwError(error));

      // Act
      createHealthcareProviderUseCase
        .execute(healthcareProviderEntity)
        .subscribe(
          () => {},
          (err) => {
            // Assert
            expect(err).toBe(error);
            expect(healthcareProviderService.create).toHaveBeenCalledWith(
              healthcareProviderEntity,
            );
            done();
          },
        );
    });
  });
});
