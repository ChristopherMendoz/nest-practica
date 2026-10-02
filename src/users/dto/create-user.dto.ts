import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ required: true, example:'usuario@empresa.com'})
    email: string;
    @ApiProperty({ required: true, example:'Jonh Doe'})
    name: string;
    username?: string;
    @ApiProperty({ required: true, example:'123456'})
    password: string;
    @ApiProperty({ required: true, example: 1, description: 'ID del tenant'})
    tenantId: number;

}
