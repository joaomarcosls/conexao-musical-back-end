import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriaUsuarioDto } from './dto/cria-usuario.dto';
import { AtualizaUsuarioDto } from './dto/atualiza-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { PaginateService } from 'src/utils/paginate/paginate.service';
import { Role } from './enum/usuario-roles.enum';
@Injectable()
export class UsuarioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateService: PaginateService,
  ) {}

  async cria(data: CriaUsuarioDto): Promise<any> {
    data.senha = await this.hashSenha(data.senha);

    const usuarioExists = await this.prismaService.usuario.findFirst({
      where: {
        OR: [
          { login: data.login },
          { email: data.email },
          { cpf: data.cpf }
        ],
      },
    });

    if (usuarioExists) {
      const campo = usuarioExists.login === data.login 
        ? 'Login'
        : usuarioExists.email === data.email
        ? 'Email'
        : 'CPF';
      
      throw new ConflictException(`${campo} já cadastrado`);
    }

    const usuario = this.prismaService.usuario.create({
      data,
    });

    return usuario;
  }

  async buscaTodos(
    pagina: number,
    itensPorPagina: number,
    busca?: string,
    nivel?: string,
    querys?: any,
  ) {
    const where = {};
    
    if (nivel) {
      Object.assign(where, { nivel });
    }

    return this.paginateService.paginate({
      module: 'usuario',
      busca,
      pagina,
      itensPorPagina,
      querys: { ...querys, ...where },
    });
  }

  async buscaPorLogin(login: string) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        login,
      },
    });
    return usuario;
  }

  async buscaPorId(id: string) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }

  async atualiza(id: string, data: AtualizaUsuarioDto) {
    const usuarioExists = await this.prismaService.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExists) {
      throw new NotFoundException('Usuario não existe');
    }

    if (data.senha) {
      data.senha = await this.hashSenha(data.senha);
    }

    await this.prismaService.usuario.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleta(id: string) {
    const usuarioExists = await this.prismaService.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExists) {
      throw new NotFoundException('usuario não existe!');
    }

    await this.prismaService.usuario.delete({
      where: {
        id,
      },
    });
  }

  async hashSenha(rawSenha: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawSenha, SALT);
  }

  async comparaSenha(rawSenha: string, hash: string) {
    return bcrypt.compareSync(rawSenha, hash);
  }

  async registroPublico(data: CriaUsuarioDto): Promise<any> {
    if (data.nivel !== Role.ALUNO && data.nivel !== Role.PROFESSOR) {
      throw new ConflictException('Nível de usuário não permitido para registro público');
    }

    return this.cria(data);
  }
}
