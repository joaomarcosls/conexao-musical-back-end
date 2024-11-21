import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PassportModule } from '@nestjs/passport';
import { PaginateService } from 'src/utils/paginate/paginate.service';

@Module({
  exports: [UsuarioService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, PaginateService],
})
export class UsuarioModule {}
