import { AppointmentDelegate } from "../delegate/appointment.delegate";
import { CreateAppointmentUseCase } from "../use-case/appointment/create-appointment-case";


describe('AppointmentDelegate', () => {
  let appointmentDelegate: AppointmentDelegate;

  beforeEach(() => {
    appointmentDelegate = new AppointmentDelegate(null, null, null);
  });

  describe('toCreateAppointment', () => {
    it('should set delegate to CreateAppointmentUseCase', () => {
      // Arrange
      const appointmentServiceMock = {} as any;
      const patientServiceMock = {} as any;
      const healthCareProviderServiceMock = {} as any;

      // Act
      appointmentDelegate.toCreateAppointment();

      // Assert
      expect(appointmentDelegate['delegate']).toBeInstanceOf(
        CreateAppointmentUseCase,
      );
      expect(appointmentDelegate['appointmentService']).toBe(null);
      expect(appointmentDelegate['patientService']).toBe(null);
      expect(appointmentDelegate['healthCareProviderService']).toBe(null);
    });
  });
});


describe('AppointmentDelegate', () => {
  let appointmentDelegate: AppointmentDelegate;

  beforeEach(() => {
    appointmentDelegate = new AppointmentDelegate(null, null, null);
  });

  describe('toCreateAppointment', () => {
    it('should set delegate to CreateAppointmentUseCase', () => {
      // Arrange
      const appointmentServiceMock = {} as any;

      // Act
      appointmentDelegate.toCreateAppointment();

      // Assert
      expect(appointmentDelegate['delegate']).toBeInstanceOf(CreateAppointmentUseCase);
      expect(appointmentDelegate['appointmentService']).toBe(null);
    });
  });

  describe('toUpdateAppointment', () => {
    it('should set delegate to UpdateAppointmentUseCase', () => {
      // Arrange
      const appointmentServiceMock = {} as any;

      // Act
      appointmentDelegate.toUpdateAppointment();

      // Assert
      expect(appointmentDelegate['delegate']).toBeInstanceOf(UpdateAppointmentUseCase);
      expect(appointmentDelegate['appointmentService']).toBe(null);
    });
  });
});


