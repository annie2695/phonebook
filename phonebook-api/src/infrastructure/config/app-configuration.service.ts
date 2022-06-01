import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

/**
 * Service to get the app configuration from the .env file.
 */
@Injectable()
export class AppConfigurationService {
  private readonly _connectionString!: string;

  constructor(private readonly _configService: ConfigService) {
    this._connectionString = this._getConnectionStringFromEnvFile();
  }

  /**
   * Get the Mongo DB connection string.
   */
  get connectionString(): string {
    return this._connectionString;
  }

  /**
   * Get the MONGO_DB_URI value in the environnement file.
   *
   * @throws Error message if not found inside .env file
   * @returns The Mongo DB connection string
   */
  private _getConnectionStringFromEnvFile(): string {
    const connectionString = this._configService.get<string>('MONGO_DB_URI');
    if (!connectionString) {
      throw new Error(
        'No connection string has been provided in the .env file.',
      );
    }

    return connectionString;
  }
}
