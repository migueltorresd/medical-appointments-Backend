import { Injectable } from '@nestjs/common';
import { PatientMongoService } from '../persistence/database/mongo/services/patient-mongo.service';

@Injectable()
export class PatientService extends PatientMongoService {}
