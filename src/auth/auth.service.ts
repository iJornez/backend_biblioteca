import { Body, Inject, Injectable } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginDto } from 'src/usuarios/dto/register.dto';


@Injectable()
export class AuthService {
  constructor(@Inject(JwtStrategy) private jwtStrategy: JwtStrategy) {}
  async signIn(userSignIn: LoginDto) {
    return await this.jwtStrategy.loginJwt(userSignIn);
  }
  
}