import { AppointmentDomainModel } from "../appointment-domain.models";
import { HealthcareProviderDomainModel } from "../healthcare-provider-domain.models";

describe('HealthcareProviderDomainModel', () => {
  describe('constructor', () => {

    test('should create an instance with default appointments array', () => {
      // Arrange
      const healthcareProviderData = {
        name: 'Dr. Jane Doe',
        email: 'janedoe@example.com',
        phone: '123-456-7890',
        specialty: 'Pediatrics',
      };

      // Act
      const healthcareProvider = new HealthcareProviderDomainModel(
        healthcareProviderData,
      );

      // Assert
      expect(healthcareProvider.name).toBe(healthcareProviderData.name);
      expect(healthcareProvider.email).toBe(healthcareProviderData.email);
      expect(healthcareProvider.phone).toBe(healthcareProviderData.phone);
      expect(healthcareProvider.specialty).toBe(
        healthcareProviderData.specialty,
      );
      expect(healthcareProvider.appointments).toEqual([]);
    });
  });
});
