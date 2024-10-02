import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { LocalModule } from './modules/local.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule, 
    DatabaseModule,
    LocalModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
