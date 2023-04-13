import { TestingModule, Test } from "@nestjs/testing";
import { of } from "rxjs";
import { AppointmentDelegate } from "../../../application/delegate/appointment.delegate";
import { AppointmentService, PatientService, HealthcareProviderService } from "../../../infrastructure/services";
import { AppointmentController } from "../appointment.controllers";

describe('Appointment Controller', () => {
  let controller: AppointmentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        {
          provide: AppointmentService,
          useValue: {},
        },
        {
          provide: PatientService,
          useValue: {},
        },
        {
          provide: HealthcareProviderService,
          useValue: {},
        },
        {
          provide: AppointmentDelegate,
          useValue: {
            execute: jest.fn(),
            toCreateAppointment: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<AppointmentController>(AppointmentController);
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
  
  describe('create', () => {
    it('should create an appointment', () => {
      // Arrange
      const appointmentDto = {
        appointmentDate: new Date(),
        hour: '12:00',
        reason: 'reason',
        status: 'status',
        patient: 'patient-id',
        healthcareProvider: 'provider-id',
      };
      const appointment = {
        id: 'appointment-id',
        ...appointmentDto,
      };
      jest.spyOn(controller['useCase'], 'execute').mockReturnValue(of(appointment));

      // Act
      controller.create(appointmentDto).subscribe((result) => {
        // Assert
        expect(result).toEqual(appointment);
      });
    });
  });
});
