import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { healthcareProviderDocument, HealthcareProviderSchemaMongo } from '../healthcare-provider.schema';

describe('HealthcareProviderSchemaMongo', () => {
  let healthcareProviderModel: Model<healthcareProviderDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('HealthcareProvider'),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    healthcareProviderModel = moduleRef.get<Model<healthcareProviderDocument>>(getModelToken('HealthcareProvider'));
  });

  describe('constructor', () => {
    it('should create a new instance of HealthcareProviderSchemaMongo with the provided data', () => {
      // Arrange
      const healthcareProviderData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        specialty: 'Cardiology',
      };

      // Act
      const healthcareProvider = new HealthcareProviderSchemaMongo(healthcareProviderData);

      // Assert
      expect(healthcareProvider.name).toBe(healthcareProviderData.name);
      expect(healthcareProvider.email).toBe(healthcareProviderData.email);
      expect(healthcareProvider.phone).toBe(healthcareProviderData.phone);
      expect(healthcareProvider.specialty).toBe(healthcareProviderData.specialty);
    });
  });

  describe('healthcareProviderModel', () => {
    it('should be defined', () => {
      // Arrange

      // Act

      // Assert
      expect(healthcareProviderModel).toBeDefined();
    });
  });
});
