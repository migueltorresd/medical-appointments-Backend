import { of, throwError } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models';
import { IPatientDomainService, IAuthService } from 'src/domain/services';
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
      state: '',
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

    test('should create a patient and generate a token', (done) => {
      // Arrange
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
        expect(patientService.create).toHaveBeenCalledWith(patientEntity);
        expect(authService.generateToken).toHaveBeenCalledWith(patientCreated);
        done();
      });
    });

    test('should propagate an error from patientService', (done) => {
      // Arrange
      const error = new Error('dummy-error');
      (
        patientService.create as jest.MockedFunction<
          typeof patientService.create
        >
      ).mockReturnValueOnce(throwError(error));

      // Act
      createPatientUseCase.execute(patientEntity).subscribe(
        () => {},
        (err) => {
          // Assert
          expect(err).toBe(error);
          expect(patientService.create).toHaveBeenCalledWith(patientEntity);
          expect(authService.generateToken).not.toHaveBeenCalled();
          done();
        },
      );
    });
  });
});
