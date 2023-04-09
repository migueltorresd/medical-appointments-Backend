import { PatientSchemaMongo } from '../patient.schema';

describe('PatientSchemaMongo', () => {
  describe('constructor', () => {
    test('should create a new instance of PatientSchemaMongo with the provided data', () => {
      // Arrange
      const patientData = {
        name: 'John Doe',
        document: '123456',
        birthDate: new Date(),
        gender: 'male',
        email: 'johndoe@example.com',
        phone: '1234567890',
        state: 'CA',
        appointment: ['123', '456'],
      };

      // Act
      const patient = new PatientSchemaMongo(patientData);

      // Assert
      expect(patient.name).toBe(patientData.name);
      expect(patient.document).toBe(patientData.document);
      expect(patient.birthDate).toBe(patientData.birthDate);
      expect(patient.gender).toBe(patientData.gender);
      expect(patient.email).toBe(patientData.email);
      expect(patient.phone).toBe(patientData.phone);
      expect(patient.state).toBe(patientData.state);
      expect(patient.appointment).toBeDefined();
    });
  });
});
