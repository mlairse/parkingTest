import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { SigninDto, SignupDto } from './dto';
import { IJwtPayload } from './jwt-payload.interface';
import { Usuarios } from '../entity/usuarios.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,

  ){}
  async signup(signupDto: SignupDto): Promise<void>{
    const userExists = await this._authRepository.userExists(signupDto);
    if (userExists) {
      throw new ConflictException("El usuario o el correo ya Existen");
    }
    return this._authRepository.signup(signupDto);

  }

  async signin( signinDto: SigninDto):Promise<{
                                        token: string; usuario:string, nombre: string, id_usuario: string, rol: string }>{  
    const user: Usuarios = await this._authRepository.findUser(signinDto);
      
    if (!user) {
      throw new NotFoundException("Lo sentimos el usuario no Existe");
    }
    const isMatch = await compare(signinDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Lo sentimos, las credenciales no son validas');
    }
      
      const payload: IJwtPayload = {
        id: user.id,
        email: user.email,
        usuario: user.usuario,
        rol : user.rol.nombre,
        nombre: user.nombre,
      };
      const token = await this._jwtService.sign(payload);
    return { token: token, usuario: user.usuario, nombre: user.nombre, id_usuario: user.id, rol: user.rol.nombre};
  }

  
}
