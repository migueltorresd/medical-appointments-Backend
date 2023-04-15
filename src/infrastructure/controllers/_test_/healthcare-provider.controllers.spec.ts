import { Observable, of } from 'rxjs';
import { HealthcareProviderDelegate } from '../../../application/delegate/healthcare-provider.delegate';
import { HealthcareProviderDto } from '../../../infrastructure/dto/healthcare-provider.dto';
import { HealthcareProviderService } from '../../../infrastructure/services/healthcare-provider.service';
import { HealthcareProviderSchemaMongo } from 'src/infrastructure/persistence';
import { TestingModule, Test } from '@nestjs/testing';
import { HealthcareProviderDomainModel } from 'src/domain/models';
import { HealthcareProviderController } from '../healthcare-provider.controllers';
import { UpdateHealthcareProviderUseCase } from 'src/application/use-case/healthcare-provider/update-healthcare-provider.case';

describe('HealthcareProvider Controller', () => {
  let controller: HealthcareProviderController;
  let delegate: HealthcareProviderDelegate;
  let service: HealthcareProviderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthcareProviderController],
      providers: [
        {
          provide: HealthcareProviderDelegate,
          useValue: {
            execute: jest.fn(),
            toCreateHealthcareProviderUseCase: jest.fn(),
            toGetHealthcareProviderUseCase: jest.fn(),
            toUpdateHealthcareProviderUseCase: jest.fn(),
            toDeleteHealthcareProviderUseCase: jest.fn(),
          },
        },
        {
          provide: HealthcareProviderService,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            updateHealthcareProvider: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<HealthcareProviderController>(
      HealthcareProviderController,
    );
    delegate = app.get<HealthcareProviderDelegate>(HealthcareProviderDelegate);
    service = app.get<HealthcareProviderService>(HealthcareProviderService);
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('create', () => {
    it('should return an observable of HealthcareProviderDomainModel', () => {
      // Arrange
      const healthcareProvider: HealthcareProviderDto = {
        rol: '',
        name: 'John',
        email: '',
        password: '123456',
        phone: '',
        specialty: '',
        appointments: [],
      };
      const expectedHealthcareProvider: HealthcareProviderSchemaMongo = {
        rol: '',
        _id: '',
        name: '',
        email: '',
        password: '123456',
        phone: '',
        specialty: '',
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => of(expectedHealthcareProvider));
      jest.spyOn(delegate, 'execute');
      jest
        .spyOn(service, 'create')
        .mockReturnValue(of(expectedHealthcareProvider));

      // Act
      const response: Observable<HealthcareProviderDomainModel> =
        controller.create(healthcareProvider);

      // Assert
      response.subscribe((value: HealthcareProviderDomainModel) => {
        expect(value).toBe(expectedHealthcareProvider);
      });
    });
  });
  describe('findById', () => {
    it('should return an observable of HealthcareProviderDomainModel', () => {
      // Arrange
      const id = '1234';
      const healthcareProvider: HealthcareProviderSchemaMongo = {
        rol: '',
        _id: '',
        name: '',
        email: '',
        password: '123456',
        phone: '',
        specialty: '',
      };
      jest.spyOn(delegate, 'execute').mockReturnValue(of(healthcareProvider));
      jest.spyOn(delegate, 'toGetHealthcareProviderUseCase');
      jest.spyOn(service, 'findById').mockReturnValue(of(healthcareProvider));

      // Act
      const response: Observable<HealthcareProviderDomainModel> =
        controller.findById(id);

      // Assert
      response.subscribe((value: HealthcareProviderDomainModel) => {
        expect(value).toBe(healthcareProvider);
      });
    });
  });

  describe('delete', () => {
    it('should return an observable of HealthcareProviderDomainModel', () => {
      // Arrange
      const id = '1234';
      const healthcareProvider: HealthcareProviderSchemaMongo = {
        rol: '',
        _id: '',
        name: '',
        email: '',
        password: '123456',
        phone: '',
        specialty: '',
      };
      jest.spyOn(delegate, 'execute').mockReturnValue(of(healthcareProvider));
      jest.spyOn(delegate, 'toDeleteHealthcareProviderUseCase');
      jest.spyOn(service, 'delete').mockReturnValue(of(healthcareProvider));

      // Act
      const response: Observable<HealthcareProviderDomainModel> =
        controller.delete(id);

      // Assert
      response.subscribe((value: HealthcareProviderDomainModel) => {
        expect(value).toBe(healthcareProvider);
      });
    });
  });
});
