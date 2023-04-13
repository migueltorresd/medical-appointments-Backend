import { TestingModule, Test } from '@nestjs/testing';
import { of, Observable, throwError } from 'rxjs';
import { HealthcareProviderDomainModel } from '../../../domain/models/healthcare-provider-domain.models';
import { HealthcareProviderDto } from '../../../infrastructure/dto/healthcare-provider.dto';
import { HealthcareProviderService } from '../../../infrastructure/services/healthcare-provider.service';
import { HealthcareProviderController } from '../healthcare-provider.controllers';

describe('HealthcareProviderController', () => {
  let controller: HealthcareProviderController;
  let service: HealthcareProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcareProviderController],
      providers: [
        { provide: HealthcareProviderService, useValue: {} },
      ],
    }).compile();
    controller = module.get<HealthcareProviderController>(
      HealthcareProviderController,
    );
    service = module.get<HealthcareProviderService>(HealthcareProviderService);
  });

  describe('is defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
