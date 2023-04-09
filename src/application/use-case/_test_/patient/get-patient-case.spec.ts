import { Observable } from "rxjs";
import { PatientDomainModel } from "src/domain/models";
import { IPatientDomainService } from "src/domain/services";
import { GetPatientUseCase } from "../../patient/get-patient-case";

describe('GetPatientUseCase', () => {
  let getPatientUseCase: GetPatientUseCase;
  let patientServiceMock: jest.Mocked<IPatientDomainService>;
  const patientId = '123';

  beforeEach(() => {
    patientServiceMock = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IPatientDomainService>;

    getPatientUseCase = new GetPatientUseCase(patientServiceMock);
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
        name: 'Test Patient',
        email: 'test@test.com',
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

      // Act
      const observable = getPatientUseCase.execute(patientId);

      // Assert
      return observable.toPromise().then((patient) => {
        expect(patient).toEqual(expectedPatient);
        expect(patientServiceMock.findById).toHaveBeenCalledWith(patientId);
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
        expect(error.message).toBe(
          `Patient with ID ${patientId} not found`,
        );
        expect(patientServiceMock.findById).toHaveBeenCalledWith(
          patientId,
        );
      });
    });
  });
});
