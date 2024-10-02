import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Configuration } from "../../../config/config.keys";
import { ConfigService } from "../../../config/config.service";
import { AuthRepository } from "../auth.repository";
import { IJwtPayload } from "../jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET)
    })
  }

  async validate(payload: IJwtPayload) {
    const user = await this._authRepository.findUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
} 

