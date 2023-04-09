import { of, throwError, Observable } from 'rxjs';
import { HealthcareProviderRepository } from '../../repositories/healthcare-provider-repository.mongo';
import { HealthcareProviderSchemaMongo } from '../../schemas/healthcare-provider.schema';
import { HealthcareProviderMongoService } from '../healthcare-provider-mongo.service';
describe('HealthcareProviderMongoService', () => {
  let healthcareProviderRepository: HealthcareProviderRepository;
  let healthcareProviderMongoService: HealthcareProviderMongoService;

  beforeEach(() => {
    healthcareProviderRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as HealthcareProviderRepository;
    healthcareProviderMongoService = new HealthcareProviderMongoService(
      healthcareProviderRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const healthcareProvider: HealthcareProviderSchemaMongo = {
      _id: '123', // agregue un _id
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '555-555-5555',
      specialty: 'Cardiology',
      appointments: [],
    };

    it('should create a healthcare provider successfully', (done) => {
      // Arrange
      jest
        .spyOn(healthcareProviderRepository, 'create')
        .mockReturnValue(of(healthcareProvider));

      // Act
      const result: Observable<HealthcareProviderSchemaMongo> =
        healthcareProviderMongoService.create(healthcareProvider);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(healthcareProvider);
        expect(healthcareProviderRepository.create).toHaveBeenCalledTimes(1);
        expect(healthcareProviderRepository.create).toHaveBeenCalledWith(
          healthcareProvider,
        );
        done();
      });
    });

    it('should handle error when creating a healthcare provider', (done) => {
      // Arrange
      const error = new Error('Unable to create healthcare provider');
      jest
        .spyOn(healthcareProviderRepository, 'create')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result: Observable<HealthcareProviderSchemaMongo> =
        healthcareProviderMongoService.create(healthcareProvider);

      // Assert
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(healthcareProviderRepository.create).toHaveBeenCalledTimes(1);
          expect(healthcareProviderRepository.create).toHaveBeenCalledWith(
            healthcareProvider,
          );
          done();
        },
      });
    });
  });
  describe('update', () => {
    const id = '123';
    const healthcareProvider: HealthcareProviderSchemaMongo = {
      _id: id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '555-555-5555',
      specialty: 'Cardiology',
      appointments: [],
    };

    it('should update a healthcare provider successfully', (done) => {
      // Arrange
      jest
        .spyOn(healthcareProviderRepository, 'update')
        .mockReturnValue(of(healthcareProvider));

      // Act
      const result: Observable<HealthcareProviderSchemaMongo> =
        healthcareProviderMongoService.update(id, healthcareProvider);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(healthcareProvider);
        expect(healthcareProviderRepository.update).toHaveBeenCalledTimes(1);
        expect(healthcareProviderRepository.update).toHaveBeenCalledWith(
          id,
          healthcareProvider,
        );
        done();
      });
    });

    it('should handle error when updating a healthcare provider', (done) => {
      // Arrange
      const error = new Error('Unable to update healthcare provider');
      jest
        .spyOn(healthcareProviderRepository, 'update')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result: Observable<HealthcareProviderSchemaMongo> =
        healthcareProviderMongoService.update(id, healthcareProvider);

      // Assert
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(healthcareProviderRepository.update).toHaveBeenCalledTimes(1);
          expect(healthcareProviderRepository.update).toHaveBeenCalledWith(
            id,
            healthcareProvider,
          );
          done();
        },
      });
    });
  });
  describe('delete', () => {
    let healthcareProviderRepository: HealthcareProviderRepository;
    let healthcareProviderMongoService: HealthcareProviderMongoService;

    beforeEach(() => {
      healthcareProviderRepository = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
      } as unknown as HealthcareProviderRepository;
      healthcareProviderMongoService = new HealthcareProviderMongoService(
        healthcareProviderRepository,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call delete method of repository with the given id', (done) => {
      // Arrange
      const id = 'healthcareProviderId123';
      jest
        .spyOn(healthcareProviderRepository, 'delete')
        .mockReturnValue(of(undefined));

      // Act
      const result = healthcareProviderMongoService.delete(id);

      // Assert
      result.subscribe(() => {
        expect(healthcareProviderRepository.delete).toHaveBeenCalledTimes(1);
        expect(healthcareProviderRepository.delete).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should return an observable with the value returned by repository', (done) => {
      // Arrange
      const id = 'healthcareProviderId123';
      const expectedValue = {} as HealthcareProviderSchemaMongo;
      jest
        .spyOn(healthcareProviderRepository, 'delete')
        .mockReturnValue(of(expectedValue));

      // Act
      const result = healthcareProviderMongoService.delete(id);

      // Assert
      result.subscribe((value) => {
        expect(value).toEqual(expectedValue);
        done();
      });
    });

    it('should handle error when deleting a healthcare provider', (done) => {
      // Arrange
      const id = 'healthcareProviderId123';
      const error = new Error('Unable to delete healthcare provider');
      jest
        .spyOn(healthcareProviderRepository, 'delete')
        .mockReturnValueOnce(throwError(error));

      // Act
      const result = healthcareProviderMongoService.delete(id);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(healthcareProviderRepository.delete).toHaveBeenCalledTimes(1);
          expect(healthcareProviderRepository.delete).toHaveBeenCalledWith(id);
          done();
        },
      });
    });
  });
  describe('findById', () => {
    let healthcareProviderRepository: HealthcareProviderRepository;
    let healthcareProviderMongoService: HealthcareProviderMongoService;

    beforeEach(() => {
      healthcareProviderRepository = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
      } as unknown as HealthcareProviderRepository;
      healthcareProviderMongoService = new HealthcareProviderMongoService(
        healthcareProviderRepository,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should find a healthcare provider by id successfully', (done) => {
      // Arrange
      const id = '123';
      const healthcareProvider: HealthcareProviderSchemaMongo = {
        _id: id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        specialty: 'Cardiology',
        appointments: [],
      };
      jest
        .spyOn(healthcareProviderRepository, 'findById')
        .mockReturnValue(of(healthcareProvider));

      // Act
      const result = healthcareProviderMongoService.findById(id);

      // Assert
      result.subscribe((response) => {
        expect(response).toEqual(healthcareProvider);
        expect(healthcareProviderRepository.findById).toHaveBeenCalledTimes(1);
        expect(healthcareProviderRepository.findById).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should handle error when finding a healthcare provider by id', (done) => {
      // Arrange
      const healthcareProviderId = 'healthcareProviderId123';
      const error = new Error('Unable to find healthcare provider');
      jest
        .spyOn(healthcareProviderRepository, 'findById')
        .mockReturnValue(throwError(error));

      // Act
      const result =
        healthcareProviderMongoService.findById(healthcareProviderId);

      // Assert
      if (!result) {
        throw new Error('Observable is undefined');
      }
      result.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          expect(healthcareProviderRepository.findById).toHaveBeenCalledTimes(
            1,
          );
          expect(healthcareProviderRepository.findById).toHaveBeenCalledWith(
            healthcareProviderId,
          );
          done();
        },
      });
    });
  });
  describe('findAll', () => {
    it('should return an observable of healthcare provider schema mongo array', () => {
      // Arrange
      const healthcareProviders: HealthcareProviderSchemaMongo[] = [
        // ...
      ];
      jest
        .spyOn(healthcareProviderRepository, 'findAll')
        .mockReturnValueOnce(of(healthcareProviders));

      // Act
      const result = healthcareProviderMongoService.findAll();

      // Assert
      expect(result).toBeInstanceOf(Observable);
      expect(result.toPromise()).resolves.toEqual(healthcareProviders);
      expect(healthcareProviderRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
