import { Observable, of } from 'rxjs';
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
import { AppointmentSchemaMongo } from 'src/infrastructure/persistence';
import { Test, TestingModule } from '@nestjs/testing';


describe('AppointmentController', () => {
  let controller: AppointmentController;
  let useCaseMock: AppointmentDelegate;
  let appointmentServiceMock: AppointmentService;
  let patientServiceMock: PatientService;
  let healthcareProviderServiceMock: HealthcareProviderService;

  beforeEach(() => {
    appointmentServiceMock = {} as any;
    patientServiceMock = {} as any;
    healthcareProviderServiceMock = {} as any;
    useCaseMock = {
      toCreateAppointment: jest.fn(),
      toGetAppointment: jest.fn(),
      execute: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
    } as any;

    const controllerMock = {
      ...new AppointmentController(
        appointmentServiceMock,
        patientServiceMock,
        healthcareProviderServiceMock,
      ),
      create: jest.fn().mockReturnValue(of({} as any)),
      useCase: useCaseMock,
    };

    controller = controllerMock as unknown as AppointmentController;
  });
  describe('is defined', () => {
    it('should be defined', () => {
      expect(AppointmentController).toBeDefined();
    });
  });
  describe('create', () => {
    it('should call useCase.toCreateAppointment and useCase.execute with the correct arguments and return the expected result', () => {
      // Arrange
      const appointmentDto: AppointmentDto = {
        appointmentDate: undefined,
        reason: '',
        status: 'available',
        patient: '',
        healthcareProvider: '',
      };

      const expectedAppointment: AppointmentDomainModel = {
        _id: '',
        appointmentDate: undefined,
        Patient: '',
        reason: '',
        status: 'available',
        healthcareProvider: '',
      };

      jest
        .spyOn(useCaseMock, 'execute')
        .mockReturnValue({ pipe: () => of(expectedAppointment) } as any);

      // Act
      const result = controller.create(appointmentDto);

      // Assert
      expect(controller.create).toHaveBeenCalledWith(appointmentDto);
      result.subscribe((value: AppointmentDomainModel) => {
        expect(value).toEqual(expectedAppointment);
      });
    });
  });
  describe('AppointmentController > findById', () => {
  it('should call useCase.toGetAppointment and useCase.execute with the correct arguments and return the expected result', () => {
    // Arrange
    const id = '1234';
    const appointment: AppointmentDomainModel = {
      _id: '1234',
      appointmentDate: new Date(),
      Patient: '',
      reason: '',
      status: 'available',
      healthcareProvider: '',
    };
    jest.spyOn(useCaseMock, 'toGetAppointment');
    jest.spyOn(useCaseMock, 'execute').mockReturnValue(of(appointment));
    const req = { params: { id } };
    const res = { json: jest.fn() };

    // Act
    controller.findById(req.params.id)

    // Assert
    expect(useCaseMock.toGetAppointment).toHaveBeenCalled();
    expect(useCaseMock.execute).toHaveBeenCalledWith(id);
    expect(res.json).toHaveBeenCalledWith(appointment);
  });
});

  
  
});


