import { TestingModule, Test } from "@nestjs/testing";
import { AppointmentDelegate } from "../../../application/delegate/appointment.delegate";
import { AppointmentService, PatientService, HealthcareProviderService } from "../../../infrastructure/services/";
import { AppointmentController } from "../appointment.controllers";


describe('AppointmentController', () => {
  let controller: AppointmentController;
  let delegate: AppointmentDelegate;
  let service: AppointmentService;
  let patientService: PatientService;
  let healthcareProviderService: HealthcareProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        { provide: AppointmentService, useValue: {} },
        { provide: PatientService, useValue: {} },
        { provide: HealthcareProviderService, useValue: {} },
        {
          provide: AppointmentDelegate,
          useValue: {
            execute: jest.fn(),
            toCreateAppointment: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<AppointmentController>(AppointmentController);
    delegate = module.get<AppointmentDelegate>(AppointmentDelegate);
    service = module.get<AppointmentService>(AppointmentService);
    patientService = module.get<PatientService>(PatientService);
    healthcareProviderService = module.get<HealthcareProviderService>(
      HealthcareProviderService,
    );
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
