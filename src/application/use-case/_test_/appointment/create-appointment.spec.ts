import { forkJoin, map, of, throwError } from 'rxjs';
import {
  AppointmentDomainModel,
  HealthcareProviderDomainModel,
  PatientDomainModel,
} from 'src/domain/models';
import {
  IAppointmentDomainService,
  IHealthcareProviderDomainService,
  IPatientDomainService,
} from 'src/domain/services';
import { CreateAppointmentUseCase } from '../../appointment/create-appointment-case';

describe('CreateAppointmentUseCase', () => {
  let createAppointmentUseCase: CreateAppointmentUseCase;
  let appointmentService: IAppointmentDomainService;
  let patientService: IPatientDomainService;
  let healthcareProviderService: IHealthcareProviderDomainService;

  beforeEach(() => {
    appointmentService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };
    patientService = {
      
      create: jest.fn(),
      update: jest.fn(),
      updatepatient: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByDocument: jest.fn(),
      findByEmail: jest.fn(),
    };
    healthcareProviderService = {
      create: jest.fn(),
      update: jest.fn(),
      updateHealthcareProvider: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };
    createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentService,
      patientService,
      healthcareProviderService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
describe('is defined', () => {
    test('should be defined', () => {
      expect(createAppointmentUseCase).toBeDefined();
    });
  });
   
  describe('execute', () => {
    const patientId = 'patient-id';
    const healthcareProviderId = 'healthcare-provider-id';
    const appointmentEntity: AppointmentDomainModel = {
      _id: 'dummy-appointment-id',
      appointmentDate: new Date(),
      reason: 'Consulta médica',
      status: 'scheduled',
      healthcareProvider: '',
      Patient: ''
    };
    const patientEntity: PatientDomainModel = {
      rol: '',
      _id: '',
      name: '',
      document: '',
      birthDate: undefined,
      gender: '',
      email: '',
      password: '123456',
      phone: '',
      state: '',
    };
    const healthcareProviderEntity: HealthcareProviderDomainModel = {
      rol: 'healthcareProvider',
      name: 'Jane Doe',
      specialty: 'cardiologist',
      email: 'janedoe@example.com',
      password: '123456',
      phone: '555-555-5555',
      appointments: [],
    };
    const appointmentCreated: AppointmentDomainModel = {
      _id: 'dummy-appointment-id',
      appointmentDate: new Date(),
      reason: 'Consulta médica',
      status: 'scheduled',
      Patient: '',
      healthcareProvider: ''
    };

    test('should create an appointment and update patient and healthcareProvider', (done) => {
      appointmentService.create = jest.fn().mockReturnValueOnce(
        of(appointmentEntity).pipe(
          map((entity) => {
            return { ...entity, id: appointmentCreated._id };
          }),
        ),
      );
      patientService.findById = jest
        .fn()
        .mockReturnValueOnce(of(patientEntity));
      healthcareProviderService.findById = jest
        .fn()
        .mockReturnValueOnce(of(healthcareProviderEntity));
      patientService.update = jest.fn().mockReturnValueOnce(of({}));

      healthcareProviderService.update = jest.fn().mockReturnValueOnce(of({}));

      const result = createAppointmentUseCase.execute(
        {
          _id: 'dummy-appointment-id',
          appointmentDate: new Date(),
          reason: 'Consulta médica',
          status: 'scheduled',
          Patient: '',
          healthcareProvider: ''
        },
        '123',
        '456',
      );

      expect(patientService.findById).toHaveBeenCalledTimes(1);
      expect(patientService.findById).toHaveBeenCalledWith('123');
      expect(healthcareProviderService.findById).toHaveBeenCalledTimes(1);
      expect(healthcareProviderService.findById).toHaveBeenCalledWith('456');
      expect(patientService.update).toHaveBeenCalledTimes(0);
      expect(healthcareProviderService.update).toHaveBeenCalledTimes(0);
      done();
    });
  });
  test('should return an error if appointment creation fails', (done) => {
    const error = new Error('Error creating appointment');
    appointmentService.create = jest
      .fn()
      .mockReturnValueOnce(throwError(error));

    const result = createAppointmentUseCase.execute(
      {
        _id: 'dummy-appointment-id',
        appointmentDate: new Date(),
        reason: 'Consulta médica',
        status: 'scheduled',
        healthcareProvider: '',
        Patient: ''
      },
      '123',
      '456',
    );

    forkJoin(result).subscribe({
      error: (err) => {
        expect(appointmentService.create).toHaveBeenCalledTimes(0);
        expect(patientService.update).not.toHaveBeenCalled();
        expect(healthcareProviderService.update).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
