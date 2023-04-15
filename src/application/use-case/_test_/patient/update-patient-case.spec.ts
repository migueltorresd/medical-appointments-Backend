import { of } from "rxjs";
import { PatientDomainModel } from "src/domain/models";
import { IPatientDomainService } from "../../../../domain/services/patient-domain.service";
import { UpdatePatientUseCase } from "../../patient/update-patient-case";


describe('UpdatePatientUseCase', () => {
  let updatePatientUseCase: UpdatePatientUseCase;
  let patientService: IPatientDomainService<PatientDomainModel>;
  let updatedPatient: PatientDomainModel;

  beforeEach(() => {
    patientService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updatepatient: jest.fn(),
      findByEmail: jest.fn(),
    } as jest.Mocked<IPatientDomainService<PatientDomainModel>>;
    updatePatientUseCase = new UpdatePatientUseCase(patientService);
    updatedPatient = {
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
    const patient: PatientDomainModel = {
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

    test('should update a patient', (done) => {
      // Arrange
      patientService.updatepatient = jest.fn().mockReturnValueOnce(of(updatedPatient));

      // Act
      updatePatientUseCase.execute(patientId, patient).subscribe((result) => {
        // Assert
        expect(result).toEqual(updatedPatient);
        expect(patientService.updatepatient).toHaveBeenCalledWith(patientId, patient);
        done();
      });
    });
  });
});
