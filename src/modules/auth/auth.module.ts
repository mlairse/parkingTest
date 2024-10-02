import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../../config/config.keys';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Rol } from '../entity/rol.entity';
import { Usuarios } from '../entity/usuarios.entity';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuarios, Rol]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOption: {
            expiresIn: 3600,
          },
        };
      },
    }),
    
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy, AuthRepository],
  exports: [JwtStrategy, passportModule],

})
export class AuthModule {}
