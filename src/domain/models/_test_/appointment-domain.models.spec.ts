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
        Patient: new PatientDomainModel({
          rol: 'patient',
          _id: 'mockId',
          name: 'John Doe',
          document: '123456',
          birthDate: new Date('1990-01-01'),
          gender: 'Male',
          email: 'johndoe@example.com',
          password: '123456',
          phone: '123-456-7890',
          state: 'Active',
        }),
        reason: 'General checkup',
        status: 'scheduled',
        healthcareProvider: new HealthcareProviderDomainModel({
          rol: 'healthcareProvider',
          name: 'Dr. Jane Smith',
          email: 'janesmith@example.com',
          password: '123456',
          phone: '987-654-3210',
          specialty: 'Family Medicine',
        }),
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
