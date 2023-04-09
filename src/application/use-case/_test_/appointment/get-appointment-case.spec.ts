import { Observable } from 'rxjs';
import { IAppointmentDomainService } from 'src/domain/services/appointment-domain.service';
import { GetAppointmentUseCase } from '../../appointment/get-appointment-case';

describe('GetAppointmentUseCase', () => {
  // Arrange
  let getAppointmentUseCase: GetAppointmentUseCase;
  let appointmentServiceMock: jest.Mocked<IAppointmentDomainService>;
  const appointmentId = '123';

  beforeEach(() => {
    appointmentServiceMock = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IAppointmentDomainService>;

    getAppointmentUseCase = new GetAppointmentUseCase(appointmentServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('is defined', () => {
    it('should be defined', () => {
      expect(getAppointmentUseCase).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should throw an error when the appointment is not found', () => {
      // Arrange
      appointmentServiceMock.findById.mockReturnValueOnce(
        new Observable((subscriber) => {
          subscriber.next(undefined);
          subscriber.complete();
        }),
      );

      // Act
      const observable = getAppointmentUseCase.execute(appointmentId);

      // Assert
      return observable.toPromise().catch((error) => {
        expect(error.message).toBe(
          `Appointment with ID ${appointmentId} not found`,
        );
        expect(appointmentServiceMock.findById).toHaveBeenCalledWith(
          appointmentId,
        );
      });
    });
  });
});
