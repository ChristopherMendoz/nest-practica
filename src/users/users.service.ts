import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  // *CREATE*
  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        tenantId: createUserDto.tenantId,
      },
    });
  }

  // *READ - todos*
  findAll() {
    return this.prisma.user.findMany();
  }

  // *READ - uno*
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // *UPDATE*
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // *DELETE*
  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}