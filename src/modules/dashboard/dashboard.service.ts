import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/plugins/database/services/prisma.service';


@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    const usuarios = await this._getUsuariosData();

    return { usuarios };
  }

  private async _getUsuariosData() {
    const professores = await this.prismaService.usuario.count(
      {
        where: {
          nivel: "Professor"
        }
      }
    );
    const alunos = await this.prismaService.usuario.count({
      where: {
        nivel: "Aluno",
      },
    });
    return {
      professores,
      alunos,
    };
  }

}
