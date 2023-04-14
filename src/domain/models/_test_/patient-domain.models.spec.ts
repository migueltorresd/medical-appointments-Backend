import { PatientDomainModel } from '../patient-domain.models';

describe('PatientDomainModel', () => {
  describe('constructor', () => {
    test('should create an instance with the correct properties', () => {
      // Arrange
      const patientData = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456',
        birthDate: new Date('1990-01-01'),
        gender: 'Male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '123-456-7890',
        state: 'Active',
      };

      // Act
      const patient = new PatientDomainModel(patientData);

      // Assert
      expect(patient.name).toBe(patientData.name);
      expect(patient.document).toBe(patientData.document);
      expect(patient.birthDate).toEqual(patientData.birthDate);
      expect(patient.gender).toBe(patientData.gender);
      expect(patient.email).toBe(patientData.email);
      expect(patient.phone).toBe(patientData.phone);
      expect(patient.state).toBe(patientData.state);
      expect(patient.appointments).toEqual([]);
    });

    test('should create an instance with default state and appointments array', () => {
      // Arrange
      const patientData = {
        rol: 'patient',
        _id: '123456',
        name: 'John Doe',
        document: '123456',
        birthDate: new Date('1990-01-01'),
        gender: 'Male',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '123-456-7890',
        state: 'Active',
      };

      // Act
      const patient = new PatientDomainModel(patientData);

      // Assert
      expect(patient.name).toBe(patientData.name);
      expect(patient.document).toBe(patientData.document);
      expect(patient.birthDate).toEqual(patientData.birthDate);
      expect(patient.gender).toBe(patientData.gender);
      expect(patient.email).toBe(patientData.email);
      expect(patient.phone).toBe(patientData.phone);
      expect(patient.state).toBe('Active');
      expect(patient.appointments).toEqual([]);
    });
  });
});
