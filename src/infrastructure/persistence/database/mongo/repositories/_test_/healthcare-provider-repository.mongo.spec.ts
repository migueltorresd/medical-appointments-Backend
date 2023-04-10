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
  describe('update', () => {
    it('should update a healthcare provider and return the updated healthcare provider', async () => {
      // Arrange
      const healthcareProviderId = 'mockId';
      const mockHealthcareProvider = new HealthcareProviderSchemaMongo({
        name: 'John Doe',
        specialty: 'cardiologist',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        appointments: [],
      });

      const expectedHealthcareProvider = {
        ...mockHealthcareProvider,
        _id: healthcareProviderId,
      };

      jest
        .spyOn(healthcareProviderModel, 'findByIdAndUpdate')
        .mockReturnValueOnce(of(expectedHealthcareProvider) as any);

      // Act
      const result = await healthcareProviderRepository
        .update(healthcareProviderId, mockHealthcareProvider)
        .toPromise();

      // Assert
      expect(result).toEqual(expectedHealthcareProvider);
      expect(healthcareProviderModel.findByIdAndUpdate).toHaveBeenCalledTimes(
        1,
      );
      expect(healthcareProviderModel.findByIdAndUpdate).toHaveBeenCalledWith(
        healthcareProviderId,
        mockHealthcareProvider,
      );
    });
  });
  describe('delete', () => {
    it('should delete a healthcare provider and return the deleted healthcare provider', async () => {
      // Arrange
      const healthcareProviderId = 'mockId';
      const expectedHealthcareProvider = {
        _id: healthcareProviderId,
        name: 'John Doe',
        specialty: 'cardiologist',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        appointments: [],
      };

      jest
        .spyOn(healthcareProviderModel, 'findByIdAndDelete')
        .mockReturnValueOnce(of(expectedHealthcareProvider) as any);

      // Act
      const result = await healthcareProviderRepository
        .delete(healthcareProviderId)
        .toPromise();

      // Assert
      expect(result).toEqual(expectedHealthcareProvider);
      expect(healthcareProviderModel.findByIdAndDelete).toHaveBeenCalledTimes(
        1,
      );
    });
  });
  describe('findById', () => {
    it('should call findById with the given _id', () => {
      const id = '123';
      const expected = {} as HealthcareProviderSchemaMongo;
      healthcareProviderModel.findById = jest
        .fn()
        .mockReturnValueOnce(of(expected));

      healthcareProviderRepository.findById(id).subscribe((result) => {
        expect(healthcareProviderModel.findById).toHaveBeenCalledWith(id);
        expect(result).toBe(expected);
      });
    });
    it('should find a healthcare provider by id and return it', async () => {
      // Arrange
      const providerId = 'mockId';
      const expectedProvider = {
        _id: providerId,
        name: 'Dr. John Doe',
        specialization: 'Pediatrics',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };

      jest
        .spyOn(healthcareProviderModel, 'findById')
        .mockReturnValueOnce(of(expectedProvider) as any);

      // Act
      const result = await healthcareProviderRepository
        .findById(providerId)
        .toPromise();

      // Assert
      expect(result).toEqual(expectedProvider);
      expect(healthcareProviderModel.findById).toHaveBeenCalledTimes(1);
      expect(healthcareProviderModel.findById).toHaveBeenCalledWith(providerId);
    });
  });
  describe('findAll', () => {
    it('should return an array of healthcare providers', async () => {
      // Arrange
      const mockProvidersArray = [
        {
          _id: 'providerId1',
          name: 'Dr. John Doe',
          specialization: 'Pediatrics',
          email: 'johndoe@example.com',
          phone: '555-555-5555',
          state: 'active',
          appointments: [],
        },
        {
          _id: 'providerId2',
          name: 'Dr. Jane Doe',
          specialization: 'Cardiology',
          email: 'janedoe@example.com',
          phone: '555-555-5555',
          state: 'inactive',
          appointments: [],
        },
      ];

      jest.spyOn(healthcareProviderModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockProvidersArray),
      } as any);

      // Act
      const result = await healthcareProviderRepository.findAll().toPromise();

      // Assert
      expect(result).toEqual(mockProvidersArray);
      expect(healthcareProviderModel.find).toHaveBeenCalledTimes(1);
      expect(healthcareProviderModel.find).toHaveBeenCalledWith();
    });
  });
});
