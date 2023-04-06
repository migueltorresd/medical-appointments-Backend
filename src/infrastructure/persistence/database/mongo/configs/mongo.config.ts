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
  /**
   * este contructor es el encargado de inyectar el servicio de configuracion
   *
   * @constructor
   * @param {ConfigService} configService
   */
  constructor(private readonly configService: ConfigService) {}
  /**
   * host de la base de datos
   *
   * @type
   */
  host = this.configService.get('DB_HOST');
  /**
   * port de la base de datos
   *
   * @type
   */
  port = this.configService.get('DB_PORT');
  /**
   * username de la base de datos
   *
   * @type
   */
  username = this.configService.get('DB_USER');
  /**
   * password de la base de datos
   *
   * @type
   */
  password = this.configService.get('DB_PASSWORD');
  /**
   * database de la base de datos

   * @type 
   */
  database = this.configService.get('DB_NAME_BOOK');
  /**
   * este metodo es el encargado de crear las opciones de conexion
   *
   * @returns {MongooseModuleOptions}
   */
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://root:password@localhost:27017',
      dbName: this.database,
    };
  }
}
