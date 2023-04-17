import { Observable, of, throwError } from 'rxjs';
import { PatientRepository } from '../../repositories/patient-repository.mongo';
import { PatientSchemaMongo } from '../../schemas/patient.schema';
import { PatientMongoService } from '../patient-mongo.service';
import { PatientDomainModel } from 'src/domain/models';

describe('PatientMongoService', () => {
  let patientRepository: PatientRepository;
  let patientMongoService: PatientMongoService;

  beforeEach(() => {
    patientRepository = {
      create: jest.fn(),
      updatepatient: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as PatientRepository;
    patientMongoService = new PatientMongoService(patientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a patient successfully', (done) => {
      // Arrange
      const patient: PatientSchemaMongo = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      const createdPatient: PatientSchemaMongo = {
        ...patient,
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      jest
        .spyOn(patientRepository, 'create')
        .mockReturnValue(of(createdPatient));

      // Act
      const result = patientMongoService.create(patient);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(createdPatient);
        expect(patientRepository.create).toHaveBeenCalledTimes(1);
        expect(patientRepository.create).toHaveBeenCalledWith(patient);
        done();
      });
    });

    it('should handle error when creating a patient', (done) => {
      // Arrange
      const patient: PatientSchemaMongo = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      const error = new Error('Unable to create patient');
      jest
        .spyOn(patientRepository, 'create')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result = patientMongoService.create(patient);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(patientRepository.create).toHaveBeenCalledTimes(1);
          expect(patientRepository.create).toHaveBeenCalledWith(patient);
          done();
        },
      });
    });
  });
  describe('updatepatient', () => {
    it('should update a patient successfully', (done) => {
      // Arrange
      const patientId = 'patientId123';
      const patient: PatientSchemaMongo = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      const updatedPatient: PatientSchemaMongo = {
        ...patient,
        name: 'John Updated',
      };
      jest
        .spyOn(patientRepository, 'updatepatient')
        .mockReturnValue(of(updatedPatient));

      // Act
      const result = patientMongoService.updatepatient(
        patientId,
        updatedPatient,
      );

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(updatedPatient);
        expect(patientRepository.updatepatient).toHaveBeenCalledTimes(1);
        expect(patientRepository.updatepatient).toHaveBeenCalledWith(
          patientId,
          updatedPatient,
        );
        done();
      });
    });

    it('should handle error when updating a patient', (done) => {
      // Arrange
      const patientId = 'patientId123';
      const patient: PatientDomainModel = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      const error = new Error('Unable to update patient');
      jest
        .spyOn(patientRepository, 'updatepatient')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result = patientMongoService.updatepatient(patientId, patient);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(patientRepository.updatepatient).toHaveBeenCalledTimes(1);
          expect(patientRepository.updatepatient).toHaveBeenCalledWith(
            patientId,
            patient,
          );
          done();
        },
      });
    });
  });

  describe('update', () => {
    let patientRepository: PatientRepository;
    let patientMongoService: PatientMongoService;

    beforeEach(() => {
      patientRepository = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
      } as unknown as PatientRepository;
      patientMongoService = new PatientMongoService(patientRepository);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update a patient successfully', (done) => {
      // Arrange
      const patientId = 'patientId123';
      const patient: PatientSchemaMongo = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      const updatedPatient: PatientSchemaMongo = {
        ...patient,
        name: 'John Updated',
      };
      jest
        .spyOn(patientRepository, 'update')
        .mockReturnValue(of(updatedPatient));

      // Act
      const result = patientMongoService.update(patientId, updatedPatient);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(updatedPatient);
        expect(patientRepository.update).toHaveBeenCalledTimes(1);
        expect(patientRepository.update).toHaveBeenCalledWith(
          patientId,
          updatedPatient,
        );
        done();
      });
    });

    it('should handle error when updating a patient', (done) => {
      // Arrange
      const patientId = 'patientId123';
      const patient: PatientSchemaMongo = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      const error = new Error('Unable to update patient');
      jest
        .spyOn(patientRepository, 'update')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result = patientMongoService.update(patientId, patient);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(patientRepository.update).toHaveBeenCalledTimes(1);
          expect(patientRepository.update).toHaveBeenCalledWith(
            patientId,
            patient,
          );
          done();
        },
      });
    });
  });
  describe('delete', () => {
    let patientRepository: PatientRepository;
    let patientMongoService: PatientMongoService;

    beforeEach(() => {
      patientRepository = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
      } as unknown as PatientRepository;
      patientMongoService = new PatientMongoService(patientRepository);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should delete a patient successfully', (done) => {
      // Arrange
      const patientId = 'patientId123';
      jest.spyOn(patientRepository, 'delete').mockReturnValue(of(undefined));

      // Act
      const result = patientMongoService.delete(patientId);

      // Assert
      result.subscribe(() => {
        expect(patientRepository.delete).toHaveBeenCalledTimes(1);
        expect(patientRepository.delete).toHaveBeenCalledWith(patientId);
        done();
      });
    });

    it('should handle error when deleting a patient', (done) => {
      // Arrange
      const patientId = 'patientId123';
      const error = new Error('Unable to delete patient');
      jest
        .spyOn(patientRepository, 'delete')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result = patientMongoService.delete(patientId);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(patientRepository.delete).toHaveBeenCalledTimes(1);
          expect(patientRepository.delete).toHaveBeenCalledWith(patientId);
          done();
        },
      });
    });
  });
  describe('findById', () => {
    it('should find a patient by id successfully', (done) => {
      // Arrange
      const patientId = 'patientId123';
      const patient: PatientSchemaMongo = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456789',
        birthDate: new Date('1990-01-01'),
        gender: 'male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '555-555-5555',
        state: 'active',
        appointments: [],
      };
      jest.spyOn(patientRepository, 'findById').mockReturnValue(of(patient));

      // Act
      const result = patientMongoService.findById(patientId);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(patient);
        expect(patientRepository.findById).toHaveBeenCalledTimes(1);
        expect(patientRepository.findById).toHaveBeenCalledWith(patientId);
        done();
      });
    });

    it('should handle error when finding a patient by id', (done) => {
      // Arrange
      const patientId = 'patientId123';
      const error = new Error('Unable to find patient');
      jest
        .spyOn(patientRepository, 'findById')
        .mockReturnValue(throwError(error));

      // Act
      const result = patientMongoService.findById(patientId);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(patientRepository.findById).toHaveBeenCalledTimes(1);
          expect(patientRepository.findById).toHaveBeenCalledWith(patientId);
          done();
        },
      });
    });
  });
  describe('findAll', () => {
    it('should return an observable of patient schema mongo array', () => {
      // Arrange
      jest.spyOn(patientRepository, 'findAll').mockReturnValueOnce(of([]));

      // Act
      const result = patientMongoService.findAll();

      // Assert
      expect(result).toBeInstanceOf(Observable);
      expect(result.toPromise()).resolves.toEqual([]);
    });
  });
});

describe('PatientMongoService', () => {
  let patientRepositoryMock: jest.Mocked<PatientRepository>;
  let patientMongoService: PatientMongoService;

  beforeEach(() => {
    patientRepositoryMock = {
      updatepatient: jest.fn(),
      findByDocument: jest.fn(),
      findByEmail: jest.fn(),
      login: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<PatientRepository>;

    patientMongoService = new PatientMongoService(patientRepositoryMock);
  });

  describe('updatepatient', () => {
    it('should return the updated patient', (done) => {
      // Arrange
      const id = 'patient_id';
      const patient: PatientSchemaMongo = {
        name: 'John Doe',
        document: '1234567890',
        email: 'johndoe@example.com',
        password: 'password',
        rol: '',
        _id: '',
        phone: '',
        gender: '',
      };
      const updatedPatient: PatientSchemaMongo = {
        ...patient,
        name: 'Jane Doe',
      };
      patientRepositoryMock.updatepatient.mockReturnValue(of(updatedPatient));

      // Act
      patientMongoService.updatepatient(id, patient).subscribe((result) => {
        // Assert
        expect(result).toEqual(updatedPatient);
        done();
      });
    });
  });

  describe('findByDocument', () => {
    it('should return the patient with the given document', (done) => {
      // Arrange
      const document = '1234567890';
      const patient: PatientSchemaMongo = {
        name: 'John Doe',
        document,
        email: 'johndoe@example.com',
        password: 'password',
        rol: '',
        _id: '',
        phone: '',
        gender: '',
      };
      patientRepositoryMock.findByDocument.mockReturnValue(of(patient));

      // Act
      patientMongoService.findByDocument(document).subscribe((result) => {
        // Assert
        expect(result).toEqual(patient);
        done();
      });
    });
  });

  describe('findByEmail', () => {
    it('should return the patient with the given email', (done) => {
      // Arrange
      const email = 'johndoe@example.com';
      const patient: PatientSchemaMongo = {
        name: 'John Doe',
        document: '1234567890',
        email,
        password: 'password',
        rol: '',
        _id: '',
        phone: '',
        gender: '',
      };
      patientRepositoryMock.findByEmail.mockReturnValue(of(patient));

      // Act
      patientMongoService.findByEmail(email).subscribe((result) => {
        //
        expect(result).toEqual(patient);
        done();
      });
    });
    it('should return undefined if the patient is not found', (done) => {
      // Arrange
      const email = 'nonexistent@example.com';
      patientRepositoryMock.findByEmail.mockReturnValue(of(undefined));

      // Act
      patientMongoService.findByEmail(email).subscribe((result) => {
        // Assert
        expect(result).toBeUndefined();
        done();
      });
    });
  });
});
