import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AutenticaUsuarioDto{
    
    @ApiProperty({
        description: 'Login do usuário',
        example: 'admin'
    })
    username:string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456'
    })
    password:string
}