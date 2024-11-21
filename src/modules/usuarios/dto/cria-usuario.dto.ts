import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriaUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Nome',
  })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nível do Usuário',
  })
  @IsString()
  nivel: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o CPF do Usuário',
  })
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a situação do Usuário',
  })
  @IsString()
  situacao: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Login',
  })
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Senha',
  })
  @IsString()
  senha: string;
}
