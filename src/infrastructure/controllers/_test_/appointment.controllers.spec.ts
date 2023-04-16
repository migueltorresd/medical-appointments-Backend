import { of } from 'rxjs';
import { AppointmentDelegate } from '../../../application/delegate/appointment.delegate';
import {
  AppointmentDomainModel,
  PatientDomainModel,
} from '../../../domain/models';
import { AppointmentDto } from '../../../infrastructure/dto';
import {
  AppointmentService,
  PatientService,
  HealthcareProviderService,
} from '../../../infrastructure/services';
import { AppointmentController } from '../appointment.controllers';

describe('AppointmentController', () => {
  let appointmentController: AppointmentController;
  let appointmentDelegate: AppointmentDelegate;
  let appointmentService: AppointmentService;
  let patientService: PatientService;
  let healthCareProviderService: HealthcareProviderService;
  beforeEach(() => {
    appointmentService = {
      // Mock appointmentService methods here
    } as AppointmentService;
    patientService = {
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      updateHealthcareProvider: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByDocument: jest.fn(),
    } as unknown as PatientService;
    healthCareProviderService = {
      // Mock healthCareProviderService methods here
    } as HealthcareProviderService;
    appointmentDelegate = new AppointmentDelegate(
      appointmentService,
      patientService,
      healthCareProviderService,
    );
    appointmentController = new AppointmentController(
      appointmentService,
      patientService,
      healthCareProviderService,
    );
  });

  describe('create', () => {
    test('should create an appointment', async () => {
      // Arrange
      const patientId = '12345';
      const patient = {
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
      jest
        .spyOn(patientService, 'findById')
        .mockImplementation(() => of(patient));

      const appointment: AppointmentDto = {
        appointmentDate: undefined,
        reason: '',
        status: 'available',
        patient: '',
        healthcareProvider: ''
      };
      const expectedAppointment: AppointmentDomainModel = {
        appointmentDate: undefined,
        reason: '',

        healthcareProvider: '',
        _id: '',
        Patient: '',
        status: 'available',
      };
      jest
        .spyOn(appointmentDelegate, 'execute')
        .mockImplementation(() => of(expectedAppointment));

      // Act
      const result = await appointmentController
        .create(appointment)
        .toPromise();

      // Assert
      expect(appointmentDelegate.toCreateAppointment).toHaveBeenCalled();
      expect(patientService.findById).toHaveBeenCalledWith(patientId);
      expect(appointmentDelegate.execute).toHaveBeenCalledWith(
        appointment,
        patient,
        appointment.healthcareProvider,
      );
      expect(result).toEqual(expectedAppointment);
    });
  });
});
