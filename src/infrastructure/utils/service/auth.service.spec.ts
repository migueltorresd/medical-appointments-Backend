import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../service/auth.service';
import { IPatientDomain } from '../../../domain/models/interface/patient-domain.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn().mockReturnValue('token'),
    } as any;

    authService = new AuthService(jwtService);
  });

  describe('generateToken', () => {
    it('should generate a token for the patient', (done) => {
      const patient: IPatientDomain = {
        _id: '123',
        document: '12345678',
        name: 'John Doe',
        email: 'john.doe@example.com',
        birthDate: new Date('2023-04-12T06:42:15.891Z'),
        gender: 'male',
        phone: '',
        state: '',
      };

      authService.generateToken(patient).subscribe((result) => {
        expect(result.data).toEqual(patient);
        expect(typeof result.token).toBe('string');
        done();
      });
    });
  });
});
