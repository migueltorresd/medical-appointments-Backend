import { IAppointmentDomainService, IPatientDomainService, IHealthcareProviderDomainService } from "src/domain/services";
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

describe('AppointmentDelegate', () => {
  let delegate: AppointmentDelegate;
  let appointmentServiceMock: IAppointmentDomainService;
  let patientServiceMock: IPatientDomainService;
  let healthCareProviderServiceMock: IHealthcareProviderDomainService;

  beforeEach(() => {
    appointmentServiceMock = {} as any;
    patientServiceMock = {} as any;
    healthCareProviderServiceMock = {} as any;
    delegate = new AppointmentDelegate(
      appointmentServiceMock,
      patientServiceMock,
      healthCareProviderServiceMock,
    );
  });

  describe('toCreateAppointment', () => {
    it('should set delegate to CreateAppointmentUseCase', () => {
      // Act
      delegate.toCreateAppointment();

      // Assert
      expect(delegate['delegate']).toBeInstanceOf(CreateAppointmentUseCase);
    });
  });

  describe('toUpdateAppointment', () => {
    it('should set delegate to UpdateAppointmentUseCase', () => {
      // Act
      delegate.toUpdateAppointment();

      // Assert
      expect(delegate['delegate']).toBeInstanceOf(UpdateAppointmentUseCase);
    });
  });
});


describe('AppointmentDelegate', () => {
  let delegate: AppointmentDelegate;
  let appointmentServiceMock: jest.Mocked<IAppointmentDomainService>;
  let patientServiceMock: jest.Mocked<IPatientDomainService>;
  let healthcareProviderServiceMock: jest.Mocked<IHealthcareProviderDomainService>;

  beforeEach(() => {
    appointmentServiceMock = {
      createAppointment: jest.fn(),
      updateAppointment: jest.fn(),
    } as unknown as jest.Mocked<IAppointmentDomainService>;

    patientServiceMock = {} as jest.Mocked<IPatientDomainService>;

    healthcareProviderServiceMock = {} as jest.Mocked<IHealthcareProviderDomainService>;

    delegate = new AppointmentDelegate(
      appointmentServiceMock,
      patientServiceMock,
      healthcareProviderServiceMock,
    );
  });

  describe('execute', () => {
    let delegateExecuteSpy: jest.SpyInstance;
    let args: any[];

    beforeEach(() => {
      delegate.toCreateAppointment();
      delegateExecuteSpy = jest.spyOn(delegate['delegate'], 'execute');
      args = ['arg1', 'arg2'];
    });

    afterEach(() => {
      delegateExecuteSpy.mockClear();
    });

    it('should delegate execution to the current use case', () => {
      // Arrange
      delegateExecuteSpy.mockReturnValueOnce('some response');

      // Act
      const result = delegate.execute(...args);

      // Assert
      expect(delegateExecuteSpy).toHaveBeenCalledWith(...args);
      expect(result).toBe('some response');
    });

    it('should throw an error if no use case is set', () => {
      // Arrange
      delegate['delegate'] = undefined;

      // Act & Assert
      expect(() => delegate.execute(...args)).toThrowError();
    });
  });

  describe('toCreateAppointment', () => {
    it('should set the delegate to an instance of CreateAppointmentUseCase', () => {
      // Act
      delegate.toCreateAppointment();

      // Assert
      expect(delegate['delegate']).toBeInstanceOf(CreateAppointmentUseCase);
    });
  });

  describe('toUpdateAppointment', () => {
    it('should set the delegate to an instance of UpdateAppointmentUseCase', () => {
      // Act
      delegate.toUpdateAppointment();

      // Assert
      expect(delegate['delegate']).toBeInstanceOf(UpdateAppointmentUseCase);
    });
  });
});
