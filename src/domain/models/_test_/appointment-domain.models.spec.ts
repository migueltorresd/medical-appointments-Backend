import { AppointmentDomainModel } from '../appointment-domain.models';
import { HealthcareProviderDomainModel } from '../healthcare-provider-domain.models';
import { PatientDomainModel } from '../patient-domain.models';

describe('AppointmentDomainModel', () => {
  describe('constructor', () => {
    test('should create an instance with the correct properties', () => {
      // Arrange
      const appointmentData: AppointmentDomainModel = {
        _id: null,
        appointmentDate: new Date('2023-04-10'),
        Patient: '',
        reason: '',
        status: 'available',
        healthcareProvider: ''
      };

      // Act
      const appointment = new AppointmentDomainModel(appointmentData);

      // Assert
      expect(appointment.appointmentDate).toEqual(
        appointmentData.appointmentDate,
      );
      expect(appointment.Patient).toEqual(appointmentData.Patient);
      expect(appointment.reason).toBe(appointmentData.reason);
      expect(appointment.status).toBe(appointmentData.status);
      expect(appointment.healthcareProvider).toEqual(
        appointmentData.healthcareProvider,
      );
    });
  });
});
