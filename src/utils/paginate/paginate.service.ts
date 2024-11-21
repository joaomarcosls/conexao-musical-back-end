import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

interface propsType {
  module: string;
  busca: string;
  pagina: number;
  itensPorPagina: number;
  querys?: object;
  include?: object;
  buscaPor?: string;
  orderBy?: object;
}

@Injectable()
export class PaginateService {
  constructor(private prisma: PrismaService) {}

  async paginate({
    module,
    busca,
    pagina,
    itensPorPagina,
    querys,
    include,
    buscaPor,
    orderBy,
  }: propsType) {
    try {
      const skip = Number(itensPorPagina * (pagina - 1));

      let query = {};

      if (busca) {
        if (buscaPor) {
          query = Object.assign(query, {
            [buscaPor]: {
              contains: busca,
              mode: 'insensitive',
            },
          });
        } else {
          query = Object.assign(query, {
            nome: {
              contains: busca,
              mode: 'insensitive',
            },
          });
        }
      }

      if (querys) {
        query = Object.assign(query, querys);
      }

      const totalItens = await this.prisma[module].count({
        where: query,
      });

      if (totalItens === 0) {
        return {
          data: [],
          maxPag: 0,
        };
      }

      const itens = await this.prisma[module].findMany({
        where: query,
        skip,
        take: Number(itensPorPagina),
        include,
        orderBy: orderBy || undefined,
      });
      const maxPagRaw = Number(totalItens / itensPorPagina);
      const maxPaginas = Math.ceil(maxPagRaw);

      return {
        data: itens,
        maxPag: maxPaginas,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
