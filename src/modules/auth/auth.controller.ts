/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly _authService: AuthService){
    
  }
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() signupDto: SignupDto): Promise<void> {
    return this._authService.signup(signupDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDto: SigninDto) {

    return this._authService.signin(signinDto);
    
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req:any) {
    
    return req.user;
  }
}
