import { PatientService } from "../patient.service";


describe('PatientService', () => {
  let patientService: PatientService;

  beforeEach(() => {
    patientService = new PatientService(null);
  });

  describe('constructor', () => {
    test('should be defined', () => {
      expect(patientService).toBeDefined();
    });
  });
});
