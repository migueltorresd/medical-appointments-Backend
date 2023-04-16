import { of } from "rxjs";
import { PatientDomainModel } from "../../../../domain/models";
import { IPatientDomainService } from "../../../../domain/services/patient-domain.service";
import { SearchByEmailUseCase } from "../../patient/search-by-email-case";

describe('SearchByEmailUseCase', () => {
  let searchByEmailUseCase: SearchByEmailUseCase;
  let patientServiceMock: jest.Mocked<IPatientDomainService>;
  const email = 'test@test.com';

  beforeEach(() => {
    patientServiceMock = {
        findByEmail: jest.fn(),
    } as unknown as jest.Mocked<IPatientDomainService<PatientDomainModel>>;

    searchByEmailUseCase = new SearchByEmailUseCase(patientServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(searchByEmailUseCase).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should return a patient when given a valid email', () => {
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
      patientServiceMock.findByEmail.mockReturnValueOnce(of(expectedPatient));

      // Act
      const observable = searchByEmailUseCase.execute(email);

      // Assert
      return observable.toPromise().then((result) => {
        expect(result).toEqual(expectedPatient);
        expect(patientServiceMock.findByEmail).toHaveBeenCalledWith(email);
      });
    });

    it('should throw an error when the patient is not found', () => {
      // Arrange
      patientServiceMock.findByEmail.mockReturnValueOnce(of(undefined));

      // Act
      const observable = searchByEmailUseCase.execute(email);

      // Assert
      return observable.toPromise().catch((error) => {
        expect(patientServiceMock.findByEmail).toHaveBeenCalledWith(email);
      });
    });
  });
});
