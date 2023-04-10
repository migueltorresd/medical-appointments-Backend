import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
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
      const appointmentModelData = {
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
  });
  // describe('update', () => {
  //   it('should update an appointment and return the updated appointment', async () => {
  //     // Arrange
  //     const expectedAppointment = {
  //       ...mockAppointment,
  //       _id: '1234',
  //       appointmentDate: new Date(),
  //       hour: '10:00',
  //       patient: '1245',
  //       reason: 'Consulta médica',
  //       status: 'Scheduled',
  //       healthcareProvider: {
  //         name: 'John Doe',
  //         email: 'johndoe@example.com',
  //         phone: '555-555-5555',
  //         specialty: 'Cardiology',
  //         appointments: [],
  //       },
  //       healthcareProviderSchemaMongo: '',
  //       Patient: undefined,
  //     };

  //     const appointmentModel = {
  //       findByIdAndUpdate: jest.fn(),
  //     };
  //     jest
  //       .spyOn(appointmentModel, 'findByIdAndUpdate')
  //       .mockReturnValueOnce(of(expectedAppointment) as any);

  //     // Act
  //     const result = await appointmentRepository
  //       .update(mockAppointment.reason, expectedAppointment)
  //       .toPromise();

  //     // Assert
  //     expect(result).toEqual(expectedAppointment);
  //     expect(appointmentModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  //     expect(appointmentModel.findByIdAndUpdate).toHaveBeenCalledWith(
  //       mockAppointment.reason,
  //       expectedAppointment,
  //     );
  //   });
  // });
});
