import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HealthcareProviderDelegate } from '../../application/delegate/healthcare-provider.delegate';
import { HealthcareProviderService } from '../services/healthcare-provider.service';
import { HealthcareProviderDto } from '../dto/healthcare-provider.dto';
import { Observable } from 'rxjs';
import { HealthcareProviderDomainModel } from '../../domain/models/healthcare-provider-domain.models';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from '../dto/credentials.dto';

@ApiTags('Healthcare-Provider')
@Controller('Healthcare-Provider')
export class HealthcareProviderController {
  private readonly useCase: HealthcareProviderDelegate;

  constructor(
    private readonly healthcareProviderService: HealthcareProviderService,
  ) {
    this.useCase = new HealthcareProviderDelegate(healthcareProviderService);
  }
  @ApiOperation({ summary: 'Create healthcare provider' })
  @Post()
  create(
    @Body() healthcareProvider: HealthcareProviderDto,
  ): Observable<HealthcareProviderDomainModel> {
    this.useCase.toCreateHealthcareProviderUseCase();
    return this.useCase.execute(healthcareProvider);
  }

  @ApiOperation({ summary: 'Get healthcare provider by id' })
  @Get(':id')
  findById(@Param('id') id: string): Observable<HealthcareProviderDomainModel> {
    this.useCase.toGetHealthcareProviderUseCase();
    return this.useCase.execute(id);
  }

  @ApiOperation({ summary: 'Delete healthcare provider by id' })
  @Delete(':id')
  delete(@Param('id') id: string): Observable<HealthcareProviderDomainModel> {
    this.useCase.toDeleteHealthcareProviderUseCase();
    return this.useCase.execute(id);
  }

  @ApiOperation({ summary: 'Update healthcare provider by id' })
  @Put(':id')
  updateHealthcareProvider(
    @Param('id') id: string,
    @Body() healthcareProviderUpdates: Partial<HealthcareProviderDto>,
  ): Observable<HealthcareProviderDomainModel> {
    this.useCase.toUpdateHealthcareProviderUseCase();
    return this.useCase.execute(id, healthcareProviderUpdates);
  }

  @ApiOperation({ summary: 'Login healthcare provider' })
  @Post('login')
  login(@Body() credentials: CredentialsDto): Observable<HealthcareProviderDomainModel> {
    this.useCase.toLoginHealthcareProviderUseCase();
    return this.useCase.execute(credentials.email, credentials.password);
  }
}
