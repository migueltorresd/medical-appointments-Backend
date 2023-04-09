import { AppointmentDomainModel } from "../appointment-domain.models";
import { HealthcareProviderDomainModel } from "../healthcare-provider-domain.models";

describe('HealthcareProviderDomainModel', () => {
  describe('constructor', () => {
    test('should create an instance with the correct properties', () => {
      // Arrange
      const healthcareProviderData = {
        name: 'Dr. John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        specialty: 'Cardiology',
        appointments: [
          new AppointmentDomainModel({
            appointmentDate: new Date('2023-04-10'),
            hour: '10:00 AM',
            Patient: null,
            reason: 'Annual checkup',
            status: 'Scheduled',
            healthcareProvider: null,
          }),
          new AppointmentDomainModel({
            appointmentDate: new Date('2023-04-12'),
            hour: '11:00 AM',
            Patient: null,
            reason: 'Follow-up appointment',
            status: 'Scheduled',
            healthcareProvider: null,
          }),
        ],
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
      expect(healthcareProvider.appointments).toEqual(
        healthcareProviderData.appointments,
      );
    });

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
