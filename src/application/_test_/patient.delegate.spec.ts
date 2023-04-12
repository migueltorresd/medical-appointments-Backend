import { IPatientDomainService } from "src/domain/services";
import { AuthService } from "src/infrastructure";
import { PatientDelegate } from "../delegate/patient-delegate";
import { CreatePatientUseCase } from "../use-case/patient/create-patient-case";
import { DeletePatientUseCase } from "../use-case/patient/delete.patient-case";
import { GetPatientUseCase } from "../use-case/patient/get-patient-case";
import { UpdatePatientUseCase } from "../use-case/patient/update-patient-case";


describe('PatientDelegate', () => {
  let patientDelegate: PatientDelegate;
  let patientServiceMock: IPatientDomainService;
  let authServiceMock: AuthService;

  beforeEach(() => {
    patientServiceMock = {} as any;
    authServiceMock = {} as any;
    patientDelegate = new PatientDelegate(patientServiceMock, authServiceMock);
  });

  describe('toCreatePatient', () => {
    it('should set delegate to CreatePatientUseCase', () => {
      // Act
      patientDelegate.toCreatePatient();

      // Assert
      expect(patientDelegate['delegate']).toBeInstanceOf(CreatePatientUseCase);
    });
  });

  describe('toUpdatePatient', () => {
    it('should set delegate to UpdatePatientUseCase', () => {
      // Act
      patientDelegate.toUpdatePatient();

      // Assert
      expect(patientDelegate['delegate']).toBeInstanceOf(UpdatePatientUseCase);
    });
  });

  describe('toDeletePatient', () => {
    it('should set delegate to DeletePatientUseCase', () => {
      // Act
      patientDelegate.toDeletePatient();

      // Assert
      expect(patientDelegate['delegate']).toBeInstanceOf(DeletePatientUseCase);
    });
  });

  describe('toGetPatient', () => {
    it('should set delegate to GetPatientUseCase', () => {
      // Act
      patientDelegate.toGetPatient();

      // Assert
      expect(patientDelegate['delegate']).toBeInstanceOf(GetPatientUseCase);
    });
  });

  describe('execute', () => {
    beforeEach(() => {
        const authServiceMock = {} as any;
        const patientServiceMock = {} as any;
      
        patientDelegate = new PatientDelegate(patientServiceMock, authServiceMock);
        patientDelegate.toCreatePatient();
      });
    it('should delegate execution to the current use case', () => {
      // Arrange
      const expectedResponse = 'some response';
      const delegateExecuteSpy = jest
        .spyOn(patientDelegate['delegate'], 'execute')
        .mockReturnValueOnce('any' as any);
      const args = [1, 2, 3];

      // Act
      const result = patientDelegate.execute(...args);

      // Assert
      expect(delegateExecuteSpy).toHaveBeenCalledWith(...args);
      expect(result).toBe('any' as any);
    });
  });
});
