import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(login: string, senha: string): Promise<any> {
    const usuario = await this.authService.validateUser(login, senha);
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos!');
    }
    return usuario;
  }
}
