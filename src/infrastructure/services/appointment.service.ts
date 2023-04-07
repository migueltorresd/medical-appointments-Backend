import { Injectable } from '@nestjs/common';
import { AppointmentMongoService } from '../persistence/database/mongo/services/appointment-mongo.service';

@Injectable()
export class AppointmentService extends AppointmentMongoService {}
