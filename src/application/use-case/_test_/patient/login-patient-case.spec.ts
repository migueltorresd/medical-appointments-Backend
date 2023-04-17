import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { from, of } from "rxjs";
import { PatientDomainModel } from "../../../../domain/models";
import { IPatientDomainService } from "../../../../domain/services";
import { LoginPatientUseCase } from "../../patient/login-patient-case";

describe('LoginPatientUseCase', () => {
  let useCase: LoginPatientUseCase;
  let patientService: IPatientDomainService;

  beforeEach(() => {
    patientService = {
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updatepatient: jest.fn(),
        delete: jest.fn(),
        findAll: jest.fn(),
        findByEmail: jest.fn(),
        findByDocument: jest.fn(),
        login: jest.fn(),
    };
    useCase = new LoginPatientUseCase(patientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const email = 'johndoe@example.com';
    const password = '123456';
    const expectedPatient = new PatientDomainModel({
      rol: 'patient',
      _id: '11233',
      name: 'John Doe',
      document: '123456789',
      birthDate: new Date('1990-01-01'),
      gender: 'male',
      email: email,
      password: password,
      phone: '555-555-5555',
      state: 'active',
      appointments: [],
    });

    it('should throw a NotFoundException if the patient with the given email does not exist', (done) => {
      // Arrange
      jest.spyOn(patientService, 'findByEmail').mockReturnValueOnce(of(null));

      // Act
      useCase.execute(email, password).subscribe({
        error: (err) => {
          // Assert
          expect(patientService.findByEmail).toHaveBeenCalledWith(email);
          expect(err).toBeInstanceOf(NotFoundException);
          done();
        },
      });
    });

    it('should throw an UnauthorizedException if the patient with the given email exists but the password is incorrect', (done) => {
      // Arrange
      jest.spyOn(patientService, 'findByEmail').mockReturnValueOnce(of(expectedPatient));
      jest.spyOn(patientService, 'login').mockReturnValueOnce(of(null));

      // Act
      useCase.execute(email, password).subscribe({
        error: (err) => {
          // Assert
          expect(patientService.findByEmail).toHaveBeenCalledWith(email);
          expect(patientService.login).toHaveBeenCalledWith(email, password);
          expect(err).toBeInstanceOf(UnauthorizedException);
          done();
        },
      });
    });

    it('should return the patient with the given email and password', (done) => {
      // Arrange
      jest.spyOn(patientService, 'findByEmail').mockReturnValueOnce(of(expectedPatient));
      jest.spyOn(patientService, 'login').mockReturnValueOnce(of(expectedPatient));

      // Act
      useCase.execute(email, password).subscribe((result) => {
        // Assert
        expect(patientService.findByEmail).toHaveBeenCalledWith(email);
        expect(patientService.login).toHaveBeenCalledWith(email, password);
        expect(result).toEqual(expectedPatient);
        done();
      });
    });
  });
});
