import { BadRequestException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { PatientDomainModel } from '../../../../domain/models';
import { IPatientDomainService, IAuthService } from '../../../../domain/services';
import { CreatePatientUseCase } from '../../patient/create-patient-case';

describe('CreatePatientUseCase', () => {
  let createPatientUseCase: CreatePatientUseCase;
  let patientService: IPatientDomainService<PatientDomainModel>;
  let authService: IAuthService;

  beforeEach(() => {
    patientService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updatepatient: jest.fn(),
      findByEmail: jest.fn(),
      findByDocument: jest.fn(),
    };
    authService = {
      generateToken: jest.fn(),
    };
    createPatientUseCase = new CreatePatientUseCase(
      patientService,
      authService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should create a patient and generate a token', (done) => {
      // Arrange
      const patientEntity: PatientDomainModel = {
        rol: '',
        _id: '',
        name: '',
        document: '',
        birthDate: undefined,
        password: '123456',
        gender: '',
        email: '',
        phone: '',
      };
      const patientCreated: PatientDomainModel = {
        rol: '',
        _id: '',
        name: '',
        document: '',
        birthDate: undefined,
        password: '123456',
        gender: '',
        email: '',
        phone: '',
        state: '',
      };
      const token: string = 'dummy-token';

      (
        patientService.findByDocument as jest.MockedFunction<
          typeof patientService.findByDocument
        >
      ).mockReturnValueOnce(of(null));
      (
        patientService.create as jest.MockedFunction<
          typeof patientService.create
        >
      ).mockReturnValueOnce(of(patientCreated));
      (
        authService.generateToken as jest.MockedFunction<
          typeof authService.generateToken
        >
      ).mockReturnValueOnce(of({ data: patientCreated, token }));

      // Act
      createPatientUseCase.execute(patientEntity).subscribe((result) => {
        // Assert
        expect(result).toEqual({ data: patientCreated, token: token });
        expect(patientService.findByDocument).toHaveBeenCalledWith(
          patientEntity.document,
        );
        expect(patientService.create).toHaveBeenCalledWith(patientEntity);
        expect(authService.generateToken).toHaveBeenCalledWith(patientCreated);
        done();
      });
    });

    test('should propagate an error from patientService when patient already exists', (done) => {
      // Arrange
      const patientEntity: PatientDomainModel = {
        rol: '',
        _id: '',
        name: '',
        document: '',
        birthDate: undefined,
        password: '123456',
        gender: '',
        email: '',
        phone: '',
      };
      const existingPatient: PatientDomainModel = {
        rol: '',
        _id: '',
        name: '',
        document: '',
        birthDate: undefined,
        password: '123456',
        gender: '',
        email: '',
        phone: '',
        state: '',
      };
      (
        patientService.findByDocument as jest.MockedFunction<
          typeof patientService.findByDocument
        >
      ).mockReturnValueOnce(of(existingPatient));

      // Act
      createPatientUseCase.execute(patientEntity).subscribe(
        () => {},
        // Assert
        (error) => {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(patientService.findByDocument).toHaveBeenCalledWith(
            patientEntity.document,
          );
          expect(patientService.create).not.toHaveBeenCalled();
          expect(authService.generateToken).not.toHaveBeenCalled();
          done();
        },
      );
    });

    test('should propagate an error from patientService when patient creation fails', (done) => {
      // Arrange
      const patientEntity: PatientDomainModel = {
        rol: '',
        _id: '',
        name: '',
        document: '',
        birthDate: undefined,
        password: '123456',
        gender: '',
        email: '',
        phone: '',
      };
      const error = new Error('Patient creation failed');
      (
        patientService.findByDocument as jest.MockedFunction<
          typeof patientService.findByDocument
        >
      ).mockReturnValueOnce(of(null));
      (
        patientService.create as jest.MockedFunction<
          typeof patientService.create
        >
      ).mockReturnValueOnce(throwError(error));

      // Act
      createPatientUseCase.execute(patientEntity).subscribe(
        () => {},
        // Assert
        (thrownError) => {
          expect(thrownError).toBe(error);
          expect(patientService.findByDocument).toHaveBeenCalledWith(
            patientEntity.document,
          );
          expect(patientService.create).toHaveBeenCalledWith(patientEntity);
          expect(authService.generateToken).not.toHaveBeenCalled();
          done();
        },
      );
    });

    test('should propagate an error from authService when token generation fails', (done) => {
      // Arrange
      const patientEntity: PatientDomainModel = {
        rol: '',
        _id: '',
        name: '',
        document: '',
        birthDate: undefined,
        password: '123456',
        gender: '',
        email: '',
        phone: '',
      };
      const patientCreated: PatientDomainModel = {
        rol: '',
        _id: '',
        name: '',
        document: '',
        birthDate: undefined,
        password: '123456',
        gender: '',
        email: '',
        phone: '',
        state: '',
      };
      const error = new Error('Token generation failed');
      (
        patientService.findByDocument as jest.MockedFunction<
          typeof patientService.findByDocument
        >
      ).mockReturnValueOnce(of(null));
      (
        patientService.create as jest.MockedFunction<
          typeof patientService.create
        >
      ).mockReturnValueOnce(of(patientCreated));
      (
        authService.generateToken as jest.MockedFunction<
          typeof authService.generateToken
        >
      ).mockReturnValueOnce(throwError(error));

      // Act
      createPatientUseCase.execute(patientEntity).subscribe(
        () => {},
        // Assert
        (thrownError) => {
          expect(thrownError).toBe(error);
          expect(patientService.findByDocument).toHaveBeenCalledWith(
            patientEntity.document,
          );
          expect(patientService.create).toHaveBeenCalledWith(patientEntity);
          expect(authService.generateToken).toHaveBeenCalledWith(
            patientCreated,
          );
          done();
        },
      );
    });
  });
});
