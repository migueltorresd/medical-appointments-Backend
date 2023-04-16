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
 describe('is defined', () => {
    it('should be defined', () => {
      expect(appointmentController).toBeDefined();
    });
  });

});
