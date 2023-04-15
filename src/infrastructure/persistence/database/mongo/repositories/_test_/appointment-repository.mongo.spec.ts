import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppointmentSchemaMongo } from '../../schemas/appointment.schema';
import { AppointmentRepository } from '../appointment-repository.mongo';
import { of } from 'rxjs';
import { AppointmentDomainModel } from 'src/domain/models';

describe('AppointmentRepository', () => {
  let appointmentRepository: AppointmentRepository;
  let appointmentModel: Model<AppointmentSchemaMongo>;
  let mockAppointment: AppointmentDomainModel;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentRepository,
        {
          provide: getModelToken(AppointmentSchemaMongo.name),
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    appointmentRepository = module.get<AppointmentRepository>(
      AppointmentRepository,
    );
    appointmentModel = module.get<Model<AppointmentSchemaMongo>>(
      getModelToken(AppointmentSchemaMongo.name),
    );
  });

  describe('create', () => {
    it('should create a new appointment and return it', async () => {
      // Arrange
      const appointmentModelData: AppointmentSchemaMongo = {
        _id: '1234',
        appointmentDate: new Date(),
        patient: '1245',
        reason: 'Consulta médica',
        status: 'scheduled',
        healthcareProvider: {
          rol: 'healthcareProvider',
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
          phone: '555-555-5555',
          specialty: 'Cardiology',
          appointments: [],
        },
        healthcareProviderSchemaMongo: '',
        Patient: undefined,
      };
      const mockAppointmentModel = new AppointmentSchemaMongo(
        appointmentModelData,
      );
      jest
        .spyOn(appointmentModel, 'create')
        .mockResolvedValueOnce(mockAppointmentModel as any);

      // Act
      const result = await appointmentRepository
        .create(mockAppointmentModel)
        .toPromise();

      // Assert
      expect(result).toEqual(mockAppointmentModel);
      expect(appointmentModel.create).toHaveBeenCalledTimes(1);
      expect(appointmentModel.create).toHaveBeenCalledWith(
        mockAppointmentModel,
      );
    });

    describe('update', () => {
      it('should update an appointment and return it', async () => {
        // Arrange
        const appointmentId = '123';
        const updatedAppointment: AppointmentSchemaMongo = {
          _id: '1234',
          appointmentDate: new Date(),
          patient: '1245',
          reason: 'Consulta médica',
          status: 'scheduled',
          healthcareProvider: {
            rol: 'healthcareProvider',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            phone: '555-555-5555',
            specialty: 'Cardiology',
            appointments: [],
          },
          healthcareProviderSchemaMongo: '',
          Patient: undefined,
        };
        const expectedUpdatedAppointment = {
          ...updatedAppointment,
          save: jest.fn().mockResolvedValueOnce(updatedAppointment),
        };

        jest
          .spyOn(appointmentModel, 'findOneAndUpdate')
          .mockResolvedValueOnce(expectedUpdatedAppointment);

        // Act
        const result = await appointmentRepository.update(
          appointmentId,
          new AppointmentSchemaMongo(updatedAppointment),
        );

        // Assert
        expect(appointmentModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      });
    });

    describe('delete', () => {
      it('should delete an appointment and return it', async () => {
        // Arrange
        const appointmentId = '123';
        const expectedDeletedAppointment = {
          _id: '123',
          appointmentDate: new Date(),
          hour: '10:00',
          patient: '1245',
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
          healthcareProviderSchemaMongo: '',
          Patient: undefined,
        };

        jest
          .spyOn(appointmentModel, 'findByIdAndDelete')
          .mockResolvedValueOnce(expectedDeletedAppointment as any);

        // Act
        const result = await appointmentRepository
          .delete(appointmentId)
          .toPromise();

        // Assert
        expect(appointmentModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(appointmentModel.findByIdAndDelete).toHaveBeenCalledWith(
          appointmentId,
        );
        expect(result).toEqual(expectedDeletedAppointment);
      });
    });

    describe('findById', () => {
      it('should call findById with the given _id', () => {
        const id = 'mockId';
        const expected = {} as AppointmentSchemaMongo;
        appointmentModel.findById = jest.fn().mockReturnValueOnce(of(expected));

        appointmentRepository.findById(id).subscribe((result) => {
          expect(appointmentModel.findById).toHaveBeenCalledWith(id);
          expect(result).toBe(expected);
        });
      });
    });

    describe('findAll', () => {
      it('should return an array of appointments', async () => {
        // Arrange
        const mockAppointmentsArray = [
          {
            _id: 'appointmentId1',
            appointmentDate: new Date(),
            hour: '10:00',
            patient: 'patientId1',
            reason: 'Consulta médica',
            status: 'Scheduled',
            healthcareProvider: {
              rol: 'healthcareProvider',
              name: 'Dr. John Doe',
              email: 'johndoe@example.com',
              password: '123456',
              phone: '555-555-5555',
              specialization: 'Cardiology',
              appointments: [],
            },
            healthcareProviderSchemaMongo: '',
            Patient: undefined,
          },
          {
            _id: 'appointmentId2',
            appointmentDate: new Date(),
            hour: '11:00',
            patient: 'patientId2',
            reason: 'Consulta médica',
            status: 'Scheduled',
            healthcareProvider: {
              rol: 'healthcareProvider',
              name: 'Dr. Jane Doe',
              email: 'janedoe@example.com',
              password: '123456',
              phone: '555-555-5555',
              specialization: 'Pediatrics',
              appointments: [],
            },
            healthcareProviderSchemaMongo: '',
            Patient: undefined,
          },
        ];

        jest.spyOn(appointmentModel, 'find').mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockAppointmentsArray),
        } as any);

        // Act
        const result = await appointmentRepository.findAll().toPromise();

        // Assert
        expect(result).toEqual(mockAppointmentsArray);
        expect(appointmentModel.find).toHaveBeenCalledTimes(1);
        expect(appointmentModel.find).toHaveBeenCalledWith();
      });
    });
  });
});
