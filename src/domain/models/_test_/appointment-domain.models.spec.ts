import { AppointmentDomainModel } from '../appointment-domain.models';
import { HealthcareProviderDomainModel } from '../healthcare-provider-domain.models';
import { PatientDomainModel } from '../patient-domain.models';

describe('AppointmentDomainModel', () => {
  let appointment: AppointmentDomainModel;
  let patient: PatientDomainModel;
  let healthcareProvider: HealthcareProviderDomainModel;

  beforeEach(() => {
    patient = new PatientDomainModel();
    healthcareProvider = new HealthcareProviderDomainModel();
    appointment = new AppointmentDomainModel();
    appointment.Patient = patient;
    appointment.healthcareProvider = healthcareProvider;
  });

  test('should have a patient and healthcare provider', () => {
    // Arrange
    const expectedPatient = patient;
    const expectedHealthcareProvider = healthcareProvider;

    // Act
    const actualPatient = appointment.Patient;
    const actualHealthcareProvider = appointment.healthcareProvider;

    // Assert
    expect(actualPatient).toBe(expectedPatient);
    expect(actualHealthcareProvider).toBe(expectedHealthcareProvider);
  });

  test('should have a reason for the appointment', () => {
    // Arrange
    const expectedReason = 'Annual check-up';
    appointment.reason = expectedReason;

    // Act
    const actualReason = appointment.reason;

    // Assert
    expect(actualReason).toBe(expectedReason);
  });

  test('should have an appointment date and time', () => {
    // Arrange
    const expectedAppointmentDate = new Date('2022-05-01');
    const expectedHour = '10:00';
    appointment.appointmentDate = expectedAppointmentDate;
    appointment.hour = expectedHour;

    // Act
    const actualAppointmentDate = appointment.appointmentDate;
    const actualHour = appointment.hour;

    // Assert
    expect(actualAppointmentDate).toBe(expectedAppointmentDate);
    expect(actualHour).toBe(expectedHour);
  });
});
