import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { of, Observable, throwError } from 'rxjs';
import { PatientDelegate } from '../../../application/delegate/patient-delegate';
import { PatientDomainModel } from '../../../domain/models/patient-domain.models';
import { PatientDto } from '../../../infrastructure/dto/patient.dto';
import { PatientService } from '../../../infrastructure/services/patient.service';
import { AuthService } from '../../../infrastructure/utils/service/auth.service';
import { PatientController } from '../patient.controllers';
import { PatientRepository } from '../../../infrastructure/persistence/database/mongo/repositories/patient-repository.mongo';
import { PatientSchemaMongo } from 'src/infrastructure/persistence';

describe('Patient Controller', () => {
  let controller: PatientController;
  let delegate: PatientDelegate;
  let service: PatientService;
  let auth: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientDelegate,
          useValue: {
            execute: jest.fn(),
            toCreatePatient: jest.fn(),
            toGetPatient: jest.fn(),
            toUpdatePatient: jest.fn(),
          },
        },
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();
    controller = app.get<PatientController>(PatientController);
    delegate = app.get<PatientDelegate>(PatientDelegate);
    service = app.get<PatientService>(PatientService);
    auth = app.get<AuthService>(AuthService);
  });

  describe('create', () => {
    it('should return an observable of PatientDomainModel', () => {
      // Arrange
      const patient: PatientDto = {
        name: 'John',
        document: '1234567890',
        birthDate: new Date('1980-01-01'),
        email: 'john@example.com',
        password: '123456',
        gender: 'male',
        phone: '1234567890',
        state: 'active',
        rol: '',
      };
      const result: PatientSchemaMongo = {
        _id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        rol: '',
        document: '',
        birthDate: undefined,
        gender: '',
        phone: '',
        state: '',
      };
      jest.spyOn(delegate, 'execute').mockReturnValue(of(result));
      jest.spyOn(delegate, 'toCreatePatient');
      jest.spyOn(service, 'create').mockReturnValue(of(result));

      // Act
      const response: Observable<PatientDomainModel> =
        controller.create(patient);

      // Assert
      response.subscribe((value: PatientDomainModel) => {
        expect(value).toBe(result);
      });
    });
  });
  describe('findById', () => {
    it('should return an object with the patient data and a token', () => {
      // Arrange
      const patient = {
        id: '1',
        name: 'Test',
        age: 30,
        diagnosis: 'test',
      };
      const token = 'token';
      jest
        .spyOn(PatientDelegate.prototype, 'execute')
        .mockReturnValue(of({ data: patient, token }));
      // Act
      controller.findById('1').subscribe((result) => {
        // Assert
        expect(result).toEqual({ data: patient, token });
      });
    });
  });
  describe('delete', () => {
    it('should return an observable of PatientDomainModel', (done) => {
      // Arrange
      const patientId = 'patientId';
      const expectedPatient = {
        _id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        rol: '',
        document: '',
        birthDate: undefined,
        gender: '',
        phone: '',
        state: '',
      };
      jest.spyOn(service, 'delete').mockReturnValue(of(expectedPatient));

      // Act
      controller.delete(patientId).subscribe((result: PatientDomainModel) => {
        // Assert
        expect(result).toEqual(expectedPatient);
        done();
      });
    });

    it('should return an error if PatientService throws an exception', (done) => {
      // Arrange
      const patientId = 'patientId';
      const expectedError = new Error('Failed to delete patient');
      jest.spyOn(service, 'delete').mockReturnValue(throwError(expectedError));

      // Act
      controller.delete(patientId).subscribe(
        (result: PatientDomainModel) => {
          fail('should have thrown an error');
        },
        (error: Error) => {
          // Assert
          expect(error).toEqual(expectedError);
          done();
        },
      );
    });
  });
  describe('updatePatient', () => {
    it('should call toUpdatePatient and return a PatientDomainModel', () => {
      // Arrange
      const patient: Partial<PatientDto> = {
        name: 'John',
        document: '1234567890',
        birthDate: new Date('1980-01-01'),
      };
      const patientUpdates: Partial<PatientDto> = {
        name: 'John Smith',
        email: 'john@example.com',
        password: '123456',
        gender: 'male',
        phone: '1234567890',
      };
      const result: PatientSchemaMongo = {
        _id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        password: '123456',
        rol: '',
        document: '',
        birthDate: undefined,
        gender: '',
        phone: '',
        state: '',
      };
      jest.spyOn(delegate, 'toUpdatePatient');
      jest.spyOn(delegate, 'execute').mockReturnValue(of(result));
      jest.spyOn(service, 'findById').mockReturnValue(of(result));
      jest.spyOn(service, 'update').mockReturnValue(of(result));
      // Act
      const response: Observable<PatientDomainModel> = controller.updatePatient(
        '1',
        patientUpdates,
      );

      // Assert
      response.subscribe((value: PatientDomainModel) => {
        expect(value).toBe(result);
      });
    });
  });
});
