import { genSalt, hash } from "bcryptjs";
import { Repository } from "typeorm";
// import { Rol } from "../rol/rol.entity";
import { SignupDto } from "./dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuarios } from "../entity/usuarios.entity";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Usuarios)
    private authRepository: Repository<Usuarios>,
    // private roleRepository: RolRepository
  ) {}

  async findUser(payload: any):Promise<any>{
    const { usuario } = payload;
    return await this.authRepository.findOne({
      where: { usuario },
      relations: ['rol']
    });
  }
  async userExists(signupDto: SignupDto):Promise<any>{
    const { usuario, email, nombre} = signupDto;
    return await this.authRepository.findOne({
      where: [{ usuario }, { email }, { nombre }],
    });
  }
  async signup(signupDto: SignupDto) {
    const { usuario, email, password, nombre } = signupDto;
    const user = new Usuarios();

    user.usuario = usuario;
    user.email = email;
    user.nombre = nombre;

    // const defaultRole: Rol = await this.roleRepository.getRepository().findOne({
    //   where: { nombre: RolType.GENERAL },
    // });
    // user.rol = defaultRole;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
 }
}
