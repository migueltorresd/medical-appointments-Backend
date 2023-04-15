import { of } from 'rxjs';
import { AppointmentDomainModel } from '../../../../domain/models';
import { IAppointmentDomainService } from '../../../../domain/services/appointment-domain.service';
import { UpdateAppointmentUseCase } from '../../appointment/Update-appointment-case';


describe('UpdateAppointmentUseCase', () => {
  let updateAppointmentUseCase: UpdateAppointmentUseCase;
  let appointmentService: IAppointmentDomainService;
  let updatedAppointment: AppointmentDomainModel;

  beforeEach(() => {
    appointmentService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<IAppointmentDomainService>;

    updateAppointmentUseCase = new UpdateAppointmentUseCase(appointmentService);

    updatedAppointment = {
      _id: 'dummy-appointment-id',
      appointmentDate: new Date(),
      hour: '10:00',
      reason: 'Consulta médica',
      status: 'Scheduled',
      healthcareProvider: {
          rol: 'healthcareProvider',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        specialty: 'Cardiology',
        appointments: [],
      },
      Patient: undefined,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const appointmentId: string = 'dummy-appointment-id';
    const appointment: AppointmentDomainModel = {
      _id: 'dummy-appointment-id',
      appointmentDate: new Date(),
      hour: '10:00',
      reason: 'Consulta médica',
      status: 'Scheduled',
      healthcareProvider: {
          rol: 'healthcareProvider',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        specialty: 'Cardiology',
        appointments: [],
      },
      Patient: undefined,
    };

    test('should update an appointment', (done) => {
      // Arrange
      appointmentService.update = jest.fn().mockReturnValueOnce(of(updatedAppointment));

      // Act
      updateAppointmentUseCase.execute(appointmentId, appointment).subscribe((result) => {
        // Assert
        expect(result).toEqual(updatedAppointment);
        expect(appointmentService.update).toHaveBeenCalledWith(appointmentId, appointment);
        done();
      });
    });
  });
});
