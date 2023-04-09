import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthcareProviderSchemaMongo } from '../../schemas/healthcare-provider.schema';
import { HealthcareProviderDomainModel } from '../../../../../../domain/models/healthcare-provider-domain.models';
import { of } from 'rxjs';
import { HealthcareProviderRepository } from '../healthcare-provider-repository.mongo';

describe('HealthcareProviderRepository', () => {
  let healthcareProviderRepository: HealthcareProviderRepository;
  let healthcareProviderModel: Model<HealthcareProviderSchemaMongo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthcareProviderRepository,
        {
          provide: getModelToken(HealthcareProviderSchemaMongo.name),
          useValue: {
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    healthcareProviderRepository = module.get<HealthcareProviderRepository>(
      HealthcareProviderRepository,
    );
    healthcareProviderModel = module.get<Model<HealthcareProviderSchemaMongo>>(
      getModelToken(HealthcareProviderSchemaMongo.name),
    );
  });

  describe('create', () => {
    it('should create a healthcare provider and return the created healthcare provider', async () => {
      // Arrange
      const mockHealthcareProvider = new HealthcareProviderDomainModel({
        name: 'John Doe',
        specialty: 'cardiologist',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        appointments: [],
      });

      const expectedHealthcareProvider = {
        ...mockHealthcareProvider,
        _id: 'mockId',
      } as HealthcareProviderSchemaMongo;

      jest
        .spyOn(healthcareProviderModel, 'create')
        .mockResolvedValueOnce(expectedHealthcareProvider as any);

      // Create a new object of type HealthcareProviderSchemaMongo from mockHealthcareProvider
      const healthcareProviderMongo = new HealthcareProviderSchemaMongo(
        mockHealthcareProvider,
      );

      // Act
      const result = await healthcareProviderRepository
        .create(healthcareProviderMongo)
        .toPromise();

      // Assert
      expect(result).toEqual(expectedHealthcareProvider);
      expect(healthcareProviderModel.create).toHaveBeenCalledTimes(1);
      expect(healthcareProviderModel.create).toHaveBeenCalledWith(
        healthcareProviderMongo,
      );
    });
  });
});
