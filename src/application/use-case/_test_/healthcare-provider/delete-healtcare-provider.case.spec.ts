import { of } from 'rxjs';
import { HealthcareProviderDomainModel } from '../../../../domain/models';
import { IHealthcareProviderDomainService } from '../../../../domain/services/healthcare-provider-domain.service';
import { DeleteHealthcareProviderUseCase } from '../../healthcare-provider/delete-healthcare-provuder.case';


describe('DeleteHealthcareProviderUseCase', () => {
  let deleteHealthcareProviderUseCase: DeleteHealthcareProviderUseCase;
  let healthcareProviderService: IHealthcareProviderDomainService;
  let deletedHealthcareProvider: HealthcareProviderDomainModel;

  beforeEach(() => {
    healthcareProviderService = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
    } as unknown as jest.Mocked<IHealthcareProviderDomainService>;
    deleteHealthcareProviderUseCase = new DeleteHealthcareProviderUseCase(healthcareProviderService);
    deletedHealthcareProvider = {
        rol: 'healthcareProvider',
        _id: '1234',
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

    describe('when the healthcare provider is successfully deleted', () => {
      beforeEach(() => {
        healthcareProviderService.delete = jest
          .fn()
          .mockReturnValueOnce(of(deletedHealthcareProvider));
      });

      it('should return the deleted healthcare provider', (done) => {
        // Act
        deleteHealthcareProviderUseCase.execute(healthcareProviderId, deletedHealthcareProvider).subscribe((result) => {
          // Assert
          expect(result).toEqual(deletedHealthcareProvider);
          expect(healthcareProviderService.delete).toHaveBeenCalledWith(healthcareProviderId);
          done();
        });
      });
    });
  });
});

