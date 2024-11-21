import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaUsuarioDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nivel?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  situacao?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  senha?: string;
}
