import { of } from 'rxjs';
import { HealthcareProviderDomainModel } from '../../../../domain/models';
import { IHealthcareProviderDomainService } from '../../../../domain/services/healthcare-provider-domain.service';
import { UpdateHealthcareProviderUseCase } from '../../healthcare-provider/update-healthcare-provider.case';

describe('UpdateHealthcareProviderUseCase', () => {
  let updateHealthcareProviderUseCase: UpdateHealthcareProviderUseCase;
  let healthcareProviderService: IHealthcareProviderDomainService;
  let updatedHealthcareProvider: HealthcareProviderDomainModel;

  beforeEach(() => {
    healthcareProviderService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      updateHealthcareProvider: jest.fn(),
    } as jest.Mocked<IHealthcareProviderDomainService>;
    updateHealthcareProviderUseCase = new UpdateHealthcareProviderUseCase(
      healthcareProviderService,
    );
    updatedHealthcareProvider = {
      rol: 'healthcareProvider',
      _id: 'dummy-healthcare-provider-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '555-555-5555',
      specialty: 'Cardiology',
      appointments: [],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const healthcareProviderId: string = 'dummy-healthcare-provider-id';
    const healthcareProvider: HealthcareProviderDomainModel = {
      rol: 'healthcareProvider',
      _id: 'dummy-healthcare-provider-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '555-555-5555',
      specialty: 'Cardiology',
      appointments: [],
    };

    test('should update a healthcare provider', (done) => {
      // Arrange
      healthcareProviderService.updateHealthcareProvider = jest
        .fn()
        .mockReturnValueOnce(of(updatedHealthcareProvider));

      // Act
      updateHealthcareProviderUseCase
        .execute(healthcareProviderId, healthcareProvider)
        .subscribe((result) => {
          // Assert
          expect(result).toEqual(updatedHealthcareProvider);
          expect(
            healthcareProviderService.updateHealthcareProvider,
          ).toHaveBeenCalledWith(healthcareProviderId, healthcareProvider);
          done();
        });
    });
  });
});
