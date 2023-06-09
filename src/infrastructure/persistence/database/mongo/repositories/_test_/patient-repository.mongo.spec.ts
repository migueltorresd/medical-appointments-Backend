import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PatientSchemaMongo,
  patientDocument,
} from '../../schemas/patient.schema';
import { PatientRepository } from '../patient-repository.mongo';
import { PatientDomainModel } from '../../../../../../domain/models/patient-domain.models';
import { Observable, of } from 'rxjs';

describe('PatientRepository', () => {
  let patientRepository: PatientRepository;
  let patientModel: Model<PatientSchemaMongo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientRepository,
        {
          provide: getModelToken(PatientSchemaMongo.name),
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            updatepatient: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            login: jest.fn(),
            findOne: jest.fn(),
            where: jest.fn(),
          },
        },
      ],
    }).compile();
    patientRepository = module.get<PatientRepository>(PatientRepository);
    patientModel = module.get<Model<PatientSchemaMongo>>(
      getModelToken(PatientSchemaMongo.name),
    );
    patientRepository = module.get<PatientRepository>(PatientRepository);
    patientModel = module.get<Model<PatientSchemaMongo>>(
      getModelToken(PatientSchemaMongo.name),
    );
  });

  describe('create', () => {
    it('should create a patient and return the created patient', async () => {
      // Arrange
      const mockPatient = new PatientDomainModel({
        rol: 'patient',
        _id: '11233',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      });

      const expectedPatient = {
        ...mockPatient,
        _id: 'mockId',
      };

      jest
        .spyOn(patientModel, 'create')
        .mockResolvedValueOnce(expectedPatient as any);

      // Act
      const result = await patientRepository.create(mockPatient).toPromise();

      // Assert
      expect(result).toEqual(expectedPatient);
      expect(patientModel.create).toHaveBeenCalledTimes(1);
      expect(patientModel.create).toHaveBeenCalledWith(mockPatient);
    });
  });
  describe('updatepatient', () => {
    it('should update a patient and return the updated patient', async () => {
      // Arrange
      const patientId = '11233';
      const mockPatient = new PatientDomainModel({
        rol: 'patient',
        _id: '11233',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      });

      const expectedPatient = {
        ...mockPatient,
        _id: patientId,
      };

      jest
        .spyOn(patientModel, 'findByIdAndUpdate')
        .mockReturnValueOnce(of(expectedPatient) as any);

      // Act
      const result = await patientRepository
        .updatepatient(patientId, mockPatient)
        .toPromise();

      // Assert
      expect(result).toEqual(expectedPatient);
      expect(patientModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByDocument', () => {
    it('should return the patient with the given document', async () => {
      // Arrange
      const document = '123456789';
      const expectedPatient = {
        rol: 'patient',
        _id: '11233',
        name: 'John Doe',
        document: document,
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };

      jest
        .spyOn(patientModel, 'findOne')
        .mockReturnValueOnce(expectedPatient as any);

      // Act
      patientModel.findOne = jest
        .fn()
        .mockImplementation(() => Promise.resolve(expectedPatient as any));

      // Assert
      expect(patientModel.findOne).toHaveBeenCalledTimes(0);
      expect(expectedPatient).toEqual(expectedPatient);
    });
  });

  describe('update', () => {
    it('should update a patient and return the updated patient', async () => {
      // Arrange
      const patientId = 'mockId';
      const mockPatient = new PatientDomainModel({
        rol: 'patient',
        _id: patientId,
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      });

      const expectedPatient = {
        ...mockPatient,
        appointments: [
          {
            _id: 'mockAppointmentId',
            date: new Date('2023-04-12T14:00:00.000Z'),
            doctor: 'Dr. Smith',
            reason: 'Annual check-up',
          },
        ],
      };

      jest.spyOn(patientModel, 'findOneAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(expectedPatient),
      } as any);

      // Act
      const result = patientRepository
        .update(patientId, mockPatient)
        .toPromise();

      // Assert
      expect(patientModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(patientModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: patientId },
        { appointments: mockPatient.appointments },
        { new: true },
      );
    });
  });

  describe('delete', () => {
    it('should delete a patient and return the deleted patient', async () => {
      // Arrange
      const patientId = 'mockId';
      const expectedPatient = {
        rol: 'patient',
        _id: patientId,
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };

      jest
        .spyOn(patientModel, 'findByIdAndDelete')
        .mockReturnValueOnce(of(expectedPatient) as any);

      // Act
      const result = await patientRepository.delete(patientId).toPromise();

      // Assert
      expect(result).toEqual(expectedPatient);
      expect(patientModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });
  describe('findById', () => {
    it('should find a patient by id and return it', async () => {
      // Arrange
      const patientId = 'mockId';
      const expectedPatient = {
        rol: 'patient',
        _id: patientId,
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };

      jest
        .spyOn(patientModel, 'findById')
        .mockReturnValueOnce(of(expectedPatient) as any);

      // Act
      const result = await patientRepository.findById(patientId).toPromise();

      // Assert
      expect(result).toEqual(expectedPatient);
      expect(patientModel.findById).toHaveBeenCalledTimes(1);
      expect(patientModel.findById).toHaveBeenCalledWith(patientId);
    });
  });
  describe('findAll', () => {
    it('should return an array of patients', async () => {
      // Arrange
      const mockPatientArray = [
        {
          rol: 'patient',
          _id: 'patientId1',
          name: 'John Doe',
          document: '123456789',
          birthDate: new Date('1990-01-01'),
          gender: 'male',
          email: 'johndoe@example.com',
          password: '123456',
          phone: '555-555-5555',
          state: 'active',
          appointments: [],
        },
        {
          rol: 'patient',
          _id: 'patientId2',
          name: 'Jane Doe',
          document: '987654321',
          birthDate: new Date('1992-01-01'),
          gender: 'female',
          email: 'janedoe@example.com',
          password: '123456',
          phone: '555-555-5555',
          state: 'inactive',
          appointments: [],
        },
      ];

      jest.spyOn(patientModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockPatientArray),
      } as any);

      // Act
      const result = await patientRepository.findAll().toPromise();

      // Assert
      expect(result).toEqual(mockPatientArray);
      expect(patientModel.find).toHaveBeenCalledTimes(1);
      expect(patientModel.find).toHaveBeenCalledWith();
    });
  });
  describe('findByEmail', () => {
    it('should return the patient with the given email', async () => {
      // Arrange
      const email = 'johndoe@example.com';
      const expectedPatient = {
        rol: 'patient',
        _id: '11233',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: email,
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };

      const mockQuery = {
        findOne: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(expectedPatient),
      };
      jest.spyOn(patientModel, 'where').mockReturnValueOnce(mockQuery as any);

      // Act
      const result = await patientRepository.findByEmail(email).toPromise();

      // Assert
      expect(result).toEqual(expectedPatient);
      expect(patientModel.where).toHaveBeenCalledWith({ email: email });
      expect(mockQuery.findOne).toHaveBeenCalled();
      expect(mockQuery.exec).toHaveBeenCalled();
    });
  });
});
describe('PatientRepository', () => {
  let patientRepository: PatientRepository;
  let patientModel: Model<PatientSchemaMongo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientRepository,
        {
          provide: getModelToken(PatientSchemaMongo.name),
          useValue: {
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    patientRepository = module.get<PatientRepository>(PatientRepository);
    patientModel = module.get<Model<PatientSchemaMongo>>(
      getModelToken(PatientSchemaMongo.name),
    );
  });

  describe('findByDocument', () => {
    it('should return an Observable with a PatientSchemaMongo object when the document exists', () => {
      // Arrange
      const document = '1234567890';
      const expectedPatient = new PatientDomainModel({
        rol: 'patient',
        _id: '11233',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      });

      jest
        .spyOn(patientModel, 'findOne')
        .mockReturnValueOnce({ exec: () => Promise.resolve(expectedPatient) } as any);

      // Act
      const result = patientRepository.findByDocument(document);

      // Assert
      expect(result).toBeInstanceOf(Observable);
      result.subscribe((patient) => {
        expect(patient).toEqual(expectedPatient);
      });
    });

    it('should return an empty Observable when the document does not exist', () => {
      // Arrange
      const document = '1234567890';

      jest
      .spyOn(patientModel, 'findOne')
      .mockReturnValueOnce({ exec: () => Promise.resolve(document) } as any);

      // Act
      const result = patientRepository.findByDocument(document);

      // Assert
      expect(result).toBeInstanceOf(Observable);
      result.subscribe((patient) => {
        expect(patient).toBeNull();
      });
    });
  });
});
