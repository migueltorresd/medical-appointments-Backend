import { HealthcareProviderService } from "../healthcare-provider.service";

describe('HealthcareProviderService', () => {
  let healthcareProviderService: HealthcareProviderService;

  beforeEach(() => {
    healthcareProviderService = new HealthcareProviderService(null);
  });

  describe('constructor', () => {
    test('should be defined', () => {
     
      expect(healthcareProviderService).toBeDefined();
    });
  });
});
