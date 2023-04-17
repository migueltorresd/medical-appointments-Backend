import { of, throwError } from 'rxjs';
import { PatientDomainModel } from '../../../../domain/models/patient-domain.models';
import { IPatientDomainService } from '../../../../domain/services/patient-domain.service';
import { DeletePatientUseCase } from '../../patient/delete.patient-case';

describe('DeletePatientUseCase', () => {
  let deletePatientUseCase: DeletePatientUseCase;
  let patientService: IPatientDomainService<PatientDomainModel>;
  let deletedPatient: PatientDomainModel;

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
      login: jest.fn(),
    } as jest.Mocked<IPatientDomainService<PatientDomainModel>>;
    deletePatientUseCase = new DeletePatientUseCase(patientService);
    deletedPatient = {
      rol: '',
      _id: 'dummy-patient-id',
      name: '',
      document: '',
      birthDate: undefined,
      gender: '',
      email: '',
      password: '123456',
      phone: '',
      state: '',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const patientId: string = 'dummy-patient-id';

    describe('when the patient is successfully deleted', () => {
      beforeEach(() => {
        patientService.delete = jest
          .fn()
          .mockReturnValueOnce(of(deletedPatient));
      });

      it('should return the deleted patient', (done) => {
        // Act
        deletePatientUseCase.execute(patientId).subscribe((result) => {
          // Assert
          expect(result).toEqual(deletedPatient);
          expect(patientService.delete).toHaveBeenCalledWith(patientId);
          done();
        });
      });
    });
  });
});
