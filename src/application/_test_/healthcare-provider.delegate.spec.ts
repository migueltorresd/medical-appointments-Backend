import { IHealthcareProviderDomainService } from 'src/domain/services';
import { CreateHealthcareProviderUseCase } from '../use-case/healthcare-provider/create-healthcare-provider.case';
import { DeleteHealthcareProviderUseCase } from '../use-case/healthcare-provider/delete-healthcare-provuder.case';
import { GetHealthcareProviderUseCase } from '../use-case/healthcare-provider/get-healthcare-provider.case';
import { UpdateHealthcareProviderUseCase } from '../use-case/healthcare-provider/update-healthcare-provider.case';
import { HealthcareProviderDelegate } from '../delegate/healthcare-provider.delegate';
import { LoginHealthcareUseCase } from '../use-case/healthcare-provider/login-Healthcare-provider.case';

describe('healthcareProviderDelegate', () => {
  let healthcareProviderDelegate: HealthcareProviderDelegate;
  let healthcareProviderServiceMock: IHealthcareProviderDomainService;

  beforeEach(() => {
    healthcareProviderServiceMock = {} as any;
    healthcareProviderDelegate = new HealthcareProviderDelegate(
      healthcareProviderServiceMock,
    );
  });

  describe('toCreateHealthcareProviderUseCase', () => {
    it('should set delegate to CreateHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toCreateHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        CreateHealthcareProviderUseCase,
      );
    });
  });

  describe('toUpdateHealthcareProviderUseCase', () => {
    it('should set delegate to UpdateHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toUpdateHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        UpdateHealthcareProviderUseCase,
      );
    });
  });

  describe('toDeleteHealthcareProviderUseCase', () => {
    it('should set delegate to DeleteHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toDeleteHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        DeleteHealthcareProviderUseCase,
      );
    });
  });

  describe('toGetHealthcareProviderUseCase', () => {
    it('should set delegate to GetHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toGetHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        GetHealthcareProviderUseCase,
      );
    });
  });

  describe('execute', () => {
    beforeEach(() => {
      const healthcareProviderServiceMock = {} as any;

      healthcareProviderDelegate = new HealthcareProviderDelegate(
        healthcareProviderServiceMock,
      );
      healthcareProviderDelegate.toCreateHealthcareProviderUseCase();
    });
    it('should delegate execution to the current use case', () => {
      // Arrange
      const expectedResponse = 'some response';
      const delegateExecuteSpy = jest
        .spyOn(healthcareProviderDelegate['delegate'], 'execute')
        .mockReturnValueOnce('any' as any);
      const args = [1, 2, 3];

      // Act
      const result = healthcareProviderDelegate.execute(...args);

      // Assert
      expect(delegateExecuteSpy).toHaveBeenCalledWith(...args);
      expect(result).toBe('any' as any);
    });
  });
});

describe('HealthcareProviderDelegate', () => {
  let healthcareProviderDelegate: HealthcareProviderDelegate;
  let healthcareProviderServiceMock: IHealthcareProviderDomainService;

  beforeEach(() => {
    healthcareProviderServiceMock = {} as any;
    healthcareProviderDelegate = new HealthcareProviderDelegate(
      healthcareProviderServiceMock,
    );
  });

  describe('toCreateHealthcareProviderUseCase', () => {
    it('should set delegate to CreateHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toCreateHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        CreateHealthcareProviderUseCase,
      );
    });
  });

  describe('toUpdateHealthcareProviderUseCase', () => {
    it('should set delegate to UpdateHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toUpdateHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        UpdateHealthcareProviderUseCase,
      );
    });
  });

  describe('toDeleteHealthcareProviderUseCase', () => {
    it('should set delegate to DeleteHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toDeleteHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        DeleteHealthcareProviderUseCase,
      );
    });
  });

  describe('toGetHealthcareProviderUseCase', () => {
    it('should set delegate to GetHealthcareProviderUseCase', () => {
      // Act
      healthcareProviderDelegate.toGetHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        GetHealthcareProviderUseCase,
      );
    });
  });

  describe('toLoginHealthcareProviderUseCase', () => {
    it('should set delegate to LoginHealthcareUseCase', () => {
      // Act
      healthcareProviderDelegate.toLoginHealthcareProviderUseCase();

      // Assert
      expect(healthcareProviderDelegate['delegate']).toBeInstanceOf(
        LoginHealthcareUseCase,
      );
    });
  });
});
