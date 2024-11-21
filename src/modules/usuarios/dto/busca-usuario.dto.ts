import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BuscaUsuarioFilterDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  pesquisa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pagina?: string;
}
