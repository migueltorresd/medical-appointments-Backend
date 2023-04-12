import { AppointmentService } from "../appointment.service";


describe('AppointmentService', () => {
  let appointmentService: AppointmentService;

  beforeEach(() => {
    appointmentService = new AppointmentService(null);
  });

it('should be defined', () => {
    expect(appointmentService).toBeDefined();
    });
    });
