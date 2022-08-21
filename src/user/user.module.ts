import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([City])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
