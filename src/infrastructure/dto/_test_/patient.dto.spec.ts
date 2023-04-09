import { validate } from 'class-validator';
import { AppointmentDto } from '../appointments.dto';
import { PatientDto } from '../patient.dto';

describe('PatientDto', () => {
  describe('constructor', () => {
    it('should create a new instance of PatientDto', async () => {
      // Arrange
      const patient = new PatientDto();
      patient.name = 'John Doe';
      patient.document = '123456789';
      patient.birthDate = new Date('1990-01-01');
      patient.gender = 'Male';
      patient.email = 'johndoe@example.com';
      patient.phone = '555-1234';
      patient.state = 'Healthy';
      patient.appointments = [
        new AppointmentDto(),
        new AppointmentDto(),
      ];

      // Act
      const validationErrors = await validate(patient);

      // Assert
      expect(patient).toBeInstanceOf(PatientDto);
      expect(validationErrors.length).toBe(0);
    });

    it('should throw an error when name is not a string', async () => {
      // Arrange
      const patient = new PatientDto();
      patient.name = null; // should be a string
      patient.document = '123456789';
      patient.birthDate = new Date('1990-01-01');
      patient.gender = 'Male';
      patient.email = 'johndoe@example.com';
      patient.phone = '555-1234';
      patient.state = 'Healthy';

      // Act
      const validationErrors = await validate(patient);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });
  });
});
