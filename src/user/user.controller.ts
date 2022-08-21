import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CityDto } from './dto/cityDto';
import { CreateUserDto } from './dto/createUserdto';
import { UpdateUserDto } from './dto/user.dto';
import { weatherInfoDto } from './dto/weatherDto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  private weather: weatherInfoDto;
  constructor(private userService: UserService) {}
  @Get('/all')
  getUsers() {
    return this.userService.get();
  }

  @Get('/city')
  getCity() {
    return this.userService.getCity();
  }

  @Get('/city/:id')
  getOnlyCity(@Param('id', ParseIntPipe) id: number) {
    return this.userService.showCity(id);
  }

  @Post('/city')
  postCity(@Body() cityDto: CityDto) {
    return this.userService.createCity(cityDto);
  }

  @Get('/allWeather/:city')
  getWeather(@Param('city') city: string) {
    return this.userService.findAll(city);
  }

  @Patch('/:id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(updateUserDto, id);
  }

  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }
}
