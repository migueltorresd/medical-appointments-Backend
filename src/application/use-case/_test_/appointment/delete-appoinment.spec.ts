import { of } from 'rxjs';
import { AppointmentDomainModel } from '../../../../domain/models';
import { IAppointmentDomainService } from '../../../../domain/services/appointment-domain.service';
import { DeleteAppointmentUseCase } from '../../appointment/delete.appointment';

describe('DeleteAppointmentUseCase', () => {
  let deleteAppointmentUseCase: DeleteAppointmentUseCase;
  let appointmentService: IAppointmentDomainService;
  let deletedAppointment: AppointmentDomainModel;

  beforeEach(() => {
    appointmentService = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<IAppointmentDomainService>;
    deleteAppointmentUseCase = new DeleteAppointmentUseCase(appointmentService);
    deletedAppointment = {
      _id: '1234',
      appointmentDate: new Date(),
      reason: 'Consulta médica',
      status: 'scheduled',
     healthcareProvider: '',
      Patient: undefined,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const appointmentId: string = 'dummy-appointment-id';

    describe('when the appointment is successfully deleted', () => {
      beforeEach(() => {
        appointmentService.delete = jest
          .fn()
          .mockReturnValueOnce(of(deletedAppointment));
      });

      it('should return the deleted appointment', (done) => {
        // Act
        deleteAppointmentUseCase.execute(appointmentId).subscribe((result) => {
          // Assert
          expect(result).toEqual(deletedAppointment);
          expect(appointmentService.delete).toHaveBeenCalledWith(appointmentId);
          done();
        });
      });
    });
  });
});
