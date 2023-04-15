import { of, throwError, Observable } from 'rxjs';
import { AppointmentRepository } from '../../repositories/appointment-repository.mongo';
import { AppointmentSchemaMongo } from '../../schemas/appointment.schema';
import { AppointmentMongoService } from '../appointment-mongo.service';

describe('AppointmentMongoService', () => {
  let appointmentRepository: AppointmentRepository;
  let appointmentMongoService: AppointmentMongoService;

  beforeEach(() => {
    appointmentRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as AppointmentRepository;
    appointmentMongoService = new AppointmentMongoService(
      appointmentRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const appointment: AppointmentSchemaMongo = {
      _id: '1234',
      appointmentDate: new Date(),
      hour: '10:00',
      patient: '1245',
      reason: 'Consulta médica',
      status: 'Scheduled',
      healthcareProvider: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        specialty: 'Cardiology',
        appointments: [],
      },
      healthcareProviderSchemaMongo: '',
      Patient: undefined,
    } as unknown as AppointmentSchemaMongo;

    it('should create an appointment successfully', (done) => {
      // Arrange
      jest
        .spyOn(appointmentRepository, 'create')
        .mockReturnValue(of(appointment));

      // Act
      const result: Observable<AppointmentSchemaMongo> =
        appointmentMongoService.create(appointment);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(appointment);
        expect(appointmentRepository.create).toHaveBeenCalledTimes(1);
        expect(appointmentRepository.create).toHaveBeenCalledWith(appointment);
        done();
      });
    });

    it('should handle error when creating an appointment', (done) => {
      // Arrange
      const error = new Error('Unable to create appointment');
      jest
        .spyOn(appointmentRepository, 'create')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result: Observable<AppointmentSchemaMongo> =
        appointmentMongoService.create(appointment);

      // Assert
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(appointmentRepository.create).toHaveBeenCalledTimes(1);
          expect(appointmentRepository.create).toHaveBeenCalledWith(
            appointment,
          );
          done();
        },
      });
    });
  });
  describe('update', () => {
    const id = '123';
    const appointment: AppointmentSchemaMongo = {
      _id: id,
      appointmentDate: new Date(),
      hour: '10:00',
      patient: '1245',
      reason: 'Consulta médica',
      status: 'Scheduled',
      healthcareProvider: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        specialty: 'Cardiology',
        appointments: [],
      },
      healthcareProviderSchemaMongo: '',
      Patient: undefined,
    } as unknown as AppointmentSchemaMongo;

    it('should update an appointment successfully', (done) => {
      // Arrange
      jest
        .spyOn(appointmentRepository, 'update')
        .mockReturnValue(of(appointment));

      // Act
      const result: Observable<AppointmentSchemaMongo> =
        appointmentMongoService.update(id, appointment);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(appointment);
        expect(appointmentRepository.update).toHaveBeenCalledTimes(1);
        expect(appointmentRepository.update).toHaveBeenCalledWith(
          id,
          appointment,
        );
        done();
      });
    });

    it('should handle error when updating an appointment', (done) => {
      // Arrange
      const error = new Error('Unable to update appointment');
      jest
        .spyOn(appointmentRepository, 'update')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result: Observable<AppointmentSchemaMongo> =
        appointmentMongoService.update(id, appointment);

      // Assert
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(appointmentRepository.update).toHaveBeenCalledTimes(1);
          expect(appointmentRepository.update).toHaveBeenCalledWith(
            id,
            appointment,
          );
          done();
        },
      });
    });
  });
  describe('delete', () => {
    it('should call delete method of repository with the given id', (done) => {
      // Arrange
      const id = 'appointmentId123';
      jest
        .spyOn(appointmentRepository, 'delete')
        .mockReturnValue(of(undefined));

      // Act
      const result = appointmentMongoService.delete(id);

      // Assert
      result.subscribe(() => {
        expect(appointmentRepository.delete).toHaveBeenCalledTimes(1);
        expect(appointmentRepository.delete).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should return an observable with the value returned by repository', (done) => {
      // Arrange
      const id = 'appointmentId123';
      const expectedValue = {} as AppointmentSchemaMongo;
      jest
        .spyOn(appointmentRepository, 'delete')
        .mockReturnValue(of(expectedValue));

      // Act
      const result = appointmentMongoService.delete(id);

      // Assert
      result.subscribe((value) => {
        expect(value).toEqual(expectedValue);
        done();
      });
    });

    it('should handle error when deleting an appointment', (done) => {
      // Arrange
      const id = 'appointmentId123';
      const error = new Error('Unable to delete appointment');
      jest
        .spyOn(appointmentRepository, 'delete')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result = appointmentMongoService.delete(id);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(appointmentRepository.delete).toHaveBeenCalledTimes(1);
          expect(appointmentRepository.delete).toHaveBeenCalledWith(id);
          done();
        },
      });
    });
  });
  describe('findById', () => {
    const appointment: AppointmentSchemaMongo = {
      _id: '1234',
      appointmentDate: new Date(),
      hour: '10:00',
      patient: '1245',
      reason: 'Consulta médica',
      status: 'Scheduled',
      healthcareProvider: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        specialty: 'Cardiology',
        appointments: [],
      },
      healthcareProviderSchemaMongo: '',
      Patient: undefined,
    } as unknown as AppointmentSchemaMongo;

    it('should find an appointment by id successfully', (done) => {
      // Arrange
      const id = '1234';
      jest
        .spyOn(appointmentRepository, 'findById')
        .mockReturnValue(of(appointment));

      // Act
      const result = appointmentMongoService.findById(id);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(appointment);
        expect(appointmentRepository.findById).toHaveBeenCalledTimes(1);
        expect(appointmentRepository.findById).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should handle error when finding an appointment by id', (done) => {
      // Arrange
      const id = '1234';
      const error = new Error('Unable to find appointment');
      jest
        .spyOn(appointmentRepository, 'findById')
        .mockReturnValue(throwError(error));

      // Act
      const result = appointmentMongoService.findById(id);

      // Assert
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(appointmentRepository.findById).toHaveBeenCalledTimes(1);
          expect(appointmentRepository.findById).toHaveBeenCalledWith(id);
          done();
        },
      });
    });
  });
  describe('findAll', () => {
    it('should return an observable of appointment schema mongo array', () => {
      // Arrange
      const appointments: AppointmentSchemaMongo[] = [
        // ...
      ];
      jest
        .spyOn(appointmentRepository, 'findAll')
        .mockReturnValueOnce(of(appointments));

      // Act
      const result = appointmentMongoService.findAll();

      // Assert
      expect(result).toBeInstanceOf(Observable);
      expect(result.toPromise()).resolves.toEqual(appointments);
      expect(appointmentRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
