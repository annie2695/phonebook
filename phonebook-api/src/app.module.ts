import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';
import { AppConfigurationModule } from './infrastructure/config/app-configuration.module';
import { AppConfigurationService } from './infrastructure/config/app-configuration.service';

@Module({
  imports: [
    ContactsModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
