import { Observable } from 'rxjs';
import { PatientDomainModel } from 'src/domain/models';
import { IPatientDomainService } from 'src/domain/services';
import { AuthService } from '../../../../infrastructure/utils/service/auth.service';
import { GetPatientUseCase } from '../../patient/get-patient-case';

describe('GetPatientUseCase', () => {
  let getPatientUseCase: GetPatientUseCase;
  let patientServiceMock: jest.Mocked<IPatientDomainService>;
  let authServiceMock: jest.Mocked<AuthService>;
  const patientId = '123';

  beforeEach(() => {
    patientServiceMock = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updatepatient: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IPatientDomainService<PatientDomainModel>>;

    authServiceMock = {
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    getPatientUseCase = new GetPatientUseCase(
      patientServiceMock,
      authServiceMock,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(getPatientUseCase).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should return a patient when given a valid ID', () => {
      // Arrange
      const expectedPatient: PatientDomainModel = {
        rol: 'patient',
        _id: '123',
        name: 'Test Patient',
        email: 'test@test.com',
        password: '123456',
        phone: '555-555-5555',
        document: '123456789',
        birthDate: new Date(),
        gender: 'M',
        state: 'activo',
      };
      patientServiceMock.findById.mockReturnValueOnce(
        new Observable((subscriber) => {
          subscriber.next(expectedPatient);
          subscriber.complete();
        }),
      );

      authServiceMock.generateToken.mockReturnValueOnce(
        new Observable((subscriber) => {
          subscriber.next({ data: expectedPatient, token: 'test_token' });
          subscriber.complete();
        }),
      );

      // Act
      const observable = getPatientUseCase.execute(patientId);

      // Assert
      return observable.toPromise().then((result) => {
        expect(result.data).toEqual(expectedPatient);
        expect(result.token).toBe('test_token');
        expect(patientServiceMock.findById).toHaveBeenCalledWith(patientId);
        expect(authServiceMock.generateToken).toHaveBeenCalledWith(
          expectedPatient,
        );
      });
    });

    it('should throw an error when the patient is not found', () => {
      // Arrange
      patientServiceMock.findById.mockReturnValueOnce(
        new Observable((subscriber) => {
          subscriber.next(undefined);
          subscriber.complete();
        }),
      );
      // Act
      const observable = getPatientUseCase.execute(patientId);
      // Assert
      return observable.toPromise().catch((error) => {
        expect(patientServiceMock.findById).toHaveBeenCalledWith(patientId);

      });
    });
  });
});
