import { AppointmentDelegate } from "../delegate/appointment.delegate";
import { UpdateAppointmentUseCase } from "../use-case/appointment/Update-appointment-case";
import { CreateAppointmentUseCase } from "../use-case/appointment/create-appointment-case";


describe('AppointmentDelegate', () => {
  let appointmentDelegate: AppointmentDelegate;
  let appointmentServiceMock: any;

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

describe('AppointmentDelegate', () => {
  let appointmentDelegate: AppointmentDelegate;

  beforeEach(() => {
    const appointmentServiceMock = {} as any;
    const patientServiceMock = {} as any;
    const healthCareProviderServiceMock = {} as any;
    appointmentDelegate = new AppointmentDelegate(
      appointmentServiceMock,
      patientServiceMock,
      healthCareProviderServiceMock,
    );
  });

  describe('toDeleteAppointment', () => {
    it('should set delegate to DeleteAppointmentUseCase', () => {
      // Arrange
      const appointmentServiceMock = {} as any;

      // Act
      appointmentDelegate.toDeleteAppointment();

      // Assert
      expect(appointmentDelegate['appointmentService']).not.toBe(null);
      expect(appointmentDelegate['patientService']).not.toBe(null);
      expect(appointmentDelegate['healthCareProviderService']).not.toBe(null);
    });
  });

  describe('toGetAppointment', () => {
    it('should set delegate to GetAppointmentUseCase', () => {
      // Arrange
      const appointmentServiceMock = {} as any;

      // Act
      appointmentDelegate.toGetAppointment();

      // Assert
      expect(appointmentDelegate['appointmentService']).not.toBe(null);
      expect(appointmentDelegate['patientService']).not.toBe(null);
      expect(appointmentDelegate['healthCareProviderService']).not.toBe(null);
    });
  });
});


