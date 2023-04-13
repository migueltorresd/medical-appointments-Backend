import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

/**
 * Este servicio es el encargado de configurar la conexion a la base de datos
 * usando el patron de diseño factory
 *
 * @Param {string} host // la direccion del host
 * @Param {string} port // el puerto de la base de datos
 * @Param {string} username // el nombre de usuario de la base de datos
 * @Param {string} password // la contraseña de la base de datos
 * @Param {string} database // el nombre de la base de datos
 * @Param {MongooseModuleOptions} createMongooseOptions // el metodo encargado de crear las opciones de conexion
 * @export
 *  @returns {MongooseModuleOptions} // las opciones de conexion
 * @class MongooseConfigService
 * @implements {MongooseOptionsFactory}
 */
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://mongo:UkCMT4nyC03OOvsHmVr6@containers-us-west-102.railway.app:6594',
      dbName: 'Appointment',
    };
  }
}
