import { Injectable } from '@nestjs/common';
import { HealthcareProviderMongoService } from '../database/mongo/services/healthcare-provider-mongo.service';

@Injectable()
export class healthcareProviderService extends HealthcareProviderMongoService {}
