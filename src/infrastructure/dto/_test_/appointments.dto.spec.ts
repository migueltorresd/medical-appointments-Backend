
import { validate } from 'class-validator';
import { AppointmentDto } from '../appointments.dto';

describe('AppointmentDto', () => {
  describe('constructor', () => {
    it('should create a new instance of AppointmentDto', async () => {
      // Arrange
      const appointment = new AppointmentDto();
      appointment.appointmentDate = new Date('2022-05-25');
      appointment.hour = '10:00 AM';
      appointment.reason = 'Check-up';
      appointment.status = 'Scheduled';
      appointment.patient = 'John Doe';
      appointment.healthcareProvider = 'Dr. Smith';

      // Act
      const validationErrors = await validate(appointment);

      // Assert
      expect(appointment).toBeInstanceOf(AppointmentDto);
      expect(validationErrors.length).toBe(0);
    });

    it('should throw an error when appointmentDate is not a Date', async () => {
      // Arrange
      const appointment = new AppointmentDto();
      appointment.appointmentDate = null; // should be a Date
      appointment.hour = '10:00 AM';
      appointment.reason = 'Check-up';
      appointment.status = 'Scheduled';
      appointment.patient = 'John Doe';
      appointment.healthcareProvider = 'Dr. Smith';

      // Act
      const validationErrors = await validate(appointment);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isDate');
    });

    it('should throw an error when hour is not a string', async () => {
      // Arrange
      const appointment = new AppointmentDto();
      appointment.appointmentDate = new Date('2022-05-25');
      appointment.hour = null; // should be a string
      appointment.reason = 'Check-up';
      appointment.status = 'Scheduled';
      appointment.patient = 'John Doe';
      appointment.healthcareProvider = 'Dr. Smith';

      // Act
      const validationErrors = await validate(appointment);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });

    it('should throw an error when raeson is not a string', async () => {
      // Arrange
      const appointment = new AppointmentDto();
      appointment.appointmentDate = new Date('2022-05-25');
      appointment.hour = '10:00 AM';
      appointment.reason = null; // should be a string
      appointment.status = 'Scheduled';
      appointment.patient = 'John Doe';
      appointment.healthcareProvider = 'Dr. Smith';

      // Act
      const validationErrors = await validate(appointment);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });

    it('should throw an error when status is not a string', async () => {
      // Arrange
      const appointment = new AppointmentDto();
      appointment.appointmentDate = new Date('2022-05-25');
      appointment.hour = '10:00 AM';
      appointment.reason = 'Check-up';
      appointment.status = null; // should be a string
      appointment.patient = 'John Doe';
      appointment.healthcareProvider = 'Dr. Smith';

      // Act
      const validationErrors = await validate(appointment);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });

    it('should throw an error when healthcareProvider is not a string', async () => {
        // Arrange
        const appointment = new AppointmentDto();
        appointment.appointmentDate = new Date('2022-05-25');
        appointment.hour = '10:00 AM';
        appointment.reason = 'Check-up';
        appointment.status = 'Scheduled';
        appointment.patient = 'John Doe';
        appointment.healthcareProvider = null; // should be a string
      
        // Act
        const validationErrors = await validate(appointment);
      
        // Assert
        expect(validationErrors.length).toBeGreaterThan(0);
        expect(validationErrors[0].constraints).toHaveProperty('isString');
      });
    });
    });