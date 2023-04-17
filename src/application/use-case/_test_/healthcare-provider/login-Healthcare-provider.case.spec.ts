import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { of } from "rxjs";
import { HealthcareProviderDomainModel } from "../../../../domain/models";
import { IHealthcareProviderDomainService } from "../../../../domain/services";
import { LoginHealthcareUseCase } from "../../healthcare-provider/login-Healthcare-provider.case";

describe('LoginHealthcareUseCase', () => {
  let healthcareService: IHealthcareProviderDomainService;
  let loginHealthcareUseCase: LoginHealthcareUseCase;

  beforeEach(() => {
    healthcareService = {
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateHealthcareProvider: jest.fn(),
        delete: jest.fn(),
        findAll: jest.fn(),
        findByEmail: jest.fn(),
        login: jest.fn(),
    } as unknown as IHealthcareProviderDomainService;
    loginHealthcareUseCase = new LoginHealthcareUseCase(healthcareService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return the logged healthcare provider', async () => {
      // Arrange
      const email = 'john@doe.com';
      const password = '123456';
      const expectedHealthcare = new HealthcareProviderDomainModel({
        rol: 'healthcareProvider',
        name: 'Test Healthcare Provider',
        email: '@jefe.com',
        password: '123456',
        phone: '555-555-5555',
        specialty: 'Test',
      });
      jest
        .spyOn(healthcareService, 'findByEmail')
        .mockReturnValue(of(expectedHealthcare));
      jest
        .spyOn(healthcareService, 'login')
        .mockReturnValue(of(expectedHealthcare));

      // Act
      const result = await loginHealthcareUseCase
        .execute(email, password)
        .toPromise();

      // Assert
      expect(healthcareService.findByEmail).toHaveBeenCalledWith(email);
      expect(healthcareService.login).toHaveBeenCalledWith(email, password);
      expect(result).toEqual(expectedHealthcare);
    });

    it('should throw NotFoundException if healthcare provider not found', async () => {
      // Arrange
      const email = 'john@doe.com';
      const password = '123456';
      jest.spyOn(healthcareService, 'findByEmail').mockReturnValue(of(null));

      // Act
      const result = loginHealthcareUseCase
        .execute(email, password)
        .toPromise();

      // Assert
      await expect(result).rejects.toThrowError(NotFoundException);
      expect(healthcareService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      // Arrange
      const email = 'john@doe.com';
      const password = '123456';
      const expectedHealthcare = new HealthcareProviderDomainModel({
        rol: 'healthcareProvider',
        name: 'Test Healthcare Provider',
        email: '@jefe.com',
        password: '123456',
        phone: '555-555-5555',
        specialty: 'Test',
      });
      jest
        .spyOn(healthcareService, 'findByEmail')
        .mockReturnValue(of(expectedHealthcare));
      jest.spyOn(healthcareService, 'login').mockReturnValue(of(null));

      // Act
      const result = loginHealthcareUseCase
        .execute(email, password)
        .toPromise();

      // Assert
      await expect(result).rejects.toThrowError(UnauthorizedException);
      expect(healthcareService.findByEmail).toHaveBeenCalledWith(email);
      expect(healthcareService.login).toHaveBeenCalledWith(email, password);
    });
  });
});
