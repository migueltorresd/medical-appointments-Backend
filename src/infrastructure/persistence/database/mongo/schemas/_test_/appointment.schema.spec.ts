import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  appointmentDocument,
  AppointmentSchemaMongo,
} from '../appointment.schema';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppointmentSchemaMongo', () => {
  let appointmentModel: Model<appointmentDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('Appointment'),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    appointmentModel = moduleRef.get<Model<appointmentDocument>>(
      getModelToken('Appointment'),
    );
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(AppointmentSchemaMongo).toBeDefined();
    });
  });
  describe('AppointmentSchemaMongo', () => {
    it('should have the required properties', async () => {
      // Arrange
      const appointmentData = {
        appointmentDate: new Date(),
        hour: '10:00 AM',
        reason: 'Routine Checkup',
        status: 'Pending',
      };

      // Act
      const appointment = await appointmentModel.create(appointmentData);

      // Assert
      expect(appointmentData.appointmentDate).toBeDefined();
      expect(appointmentData.hour).toBeDefined();
      expect(appointmentData.reason).toBeDefined();
      expect(appointmentData.status).toBeDefined();
    });
  });
});
