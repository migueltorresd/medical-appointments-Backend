
import { validate } from 'class-validator';
import { AppointmentDto } from '../appointments.dto';
import { HealthcareProviderDto } from '../healthcare-provider.dto';

describe('HealthcareProviderDto', () => {
  describe('constructor', () => {
    it('should throw an error when name is not a string', async () => {
      // Arrange
      const healthcareProvider = new HealthcareProviderDto();
      healthcareProvider.name = null; // should be a string
      healthcareProvider.email = 'drsmith@example.com';
      healthcareProvider.password= '123456',
      healthcareProvider.phone = '555-1234';
      healthcareProvider.specialty = 'Pediatrics';
      healthcareProvider.appointments = [];

      // Act
      const validationErrors = await validate(healthcareProvider);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });

    it('should throw an error when email is not a string', async () => {
      // Arrange
      const healthcareProvider = new HealthcareProviderDto();
      healthcareProvider.name = 'Dr. Smith';
      healthcareProvider.email = null;
      healthcareProvider.password= '123456'
      healthcareProvider.phone = '555-1234';
      healthcareProvider.specialty = 'Pediatrics';
      healthcareProvider.appointments = [];

      // Act
      const validationErrors = await validate(healthcareProvider);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });

    it('should throw an error when phone is not a string', async () => {
      // Arrange
      const healthcareProvider = new HealthcareProviderDto();
      healthcareProvider.name = 'Dr. Smith';
      healthcareProvider.email = 'drsmith@example.com';
      healthcareProvider.password= '123456'
      healthcareProvider.phone = null; // should be a string
      healthcareProvider.specialty = 'Pediatrics';
      healthcareProvider.appointments = [];

      // Act
      const validationErrors = await validate(healthcareProvider);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });

    it('should throw an error when specialty is not a string', async () => {
      // Arrange
      const healthcareProvider = new HealthcareProviderDto();
      healthcareProvider.name = 'Dr. Smith';
      healthcareProvider.email = 'drsmith@example.com';
      healthcareProvider.password= '123456'
      healthcareProvider.phone = '555-1234';
      healthcareProvider.specialty = null; // should be a string
      healthcareProvider.appointments = [];
      // Act
      const validationErrors = await validate(healthcareProvider);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });

    it('should throw an error when appointments is not an array', async () => {
      // Arrange
      const healthcareProvider = new HealthcareProviderDto();
      healthcareProvider.name = 'Dr. Smith';
      healthcareProvider.email = 'drsmith@example.com';
      healthcareProvider.password= '123456'
      healthcareProvider.phone = '555-1234';
      healthcareProvider.specialty = 'Pediatrics';
      healthcareProvider.appointments = null; // should be an array

      // Act
      const validationErrors = await validate(healthcareProvider);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].constraints).toHaveProperty('isArray');
    });

    it('should throw an error when appointments is not an array of AppointmentDto', async () => {
      // Arrange
      const healthcareProvider = new HealthcareProviderDto();
      healthcareProvider.name = 'Dr. Smith';
      healthcareProvider.email = 'drsmith@example.com';
      healthcareProvider.password= '123456'
      healthcareProvider.phone = '555-1234';
      healthcareProvider.specialty = 'Pediatrics';
      // Act
      const validationErrors = await validate(healthcareProvider);

      // Assert
      expect(validationErrors.length).toBeGreaterThan(0);
    });
  });
});
