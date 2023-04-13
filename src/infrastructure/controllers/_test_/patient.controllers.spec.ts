import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { of, Observable, throwError } from 'rxjs';
import { PatientDelegate } from '../../../application/delegate/patient-delegate';
import { PatientDomainModel } from '../../../domain/models/patient-domain.models';
import { PatientDto } from '../../../infrastructure/dto/patient.dto';
import { PatientService } from '../../../infrastructure/services/patient.service';
import { AuthService } from '../../../infrastructure/utils/service/auth.service';
import { PatientController } from '../patient.controllers';
import { PatientRepository } from '../../../infrastructure/persistence/database/mongo/repositories/patient-repository.mongo';

describe('PatientController', () => {
  let controller: PatientController;
  let delegate: PatientDelegate;
  let service: PatientService;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: PatientService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: PatientRepository, useValue: {} },
        {
          provide: PatientDelegate,
          useValue: {
            execute: jest.fn(),
            toCreatePatient: jest.fn(),
            toDeletePatient: jest.fn(),
            toUpdatePatient: jest.fn(),
            toGetPatient: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<PatientController>(PatientController);
    delegate = module.get<PatientDelegate>(PatientDelegate);
    service = module.get<PatientService>(PatientService);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

    describe('is defined', () => {
        it('should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
