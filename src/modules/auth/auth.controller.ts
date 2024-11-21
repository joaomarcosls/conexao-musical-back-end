import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AutenticaUsuarioDto } from './dto/autentica-usuario.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('')
@ApiTags('Autenticação')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    description: 'Dados para login',
    type: AutenticaUsuarioDto,
  })
  async login(@Request() req: any) {
    this.logger.debug('Login realizado no sistema!');
    return this.authService.login(req.user);
  }
}
