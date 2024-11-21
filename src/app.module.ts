import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import * as ConfigEnv from '@nestjs/config';

@Module({
  imports: [
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
