import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CityDto } from './dto/cityDto';
import { CreateUserDto } from './dto/createUserdto';
import { UpdateUserDto } from './dto/user.dto';
import { weatherInfoDto } from './dto/weatherDto';
import { City } from './entity/user.entity';

@Injectable()
export class UserService {
  private apiKey = 'fa269128aef2c4936ef6e593aa17e666';
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  getCity(): Promise<City[]> {
    return this.cityRepository.find();
  }
  createCity(cityDto: CityDto) {
    return this.cityRepository.save(cityDto);
  }
  showCity(id: number) {
    return this.cityRepository.findOne({ where: { id } });
  }

  get() {
    return { name: 'hello Kumar Shashank', email: 'kshashank391999@gmail.com' };
  }
  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }
  update(updateUserDto: UpdateUserDto, id: number) {
    return { body: updateUserDto, id };
  }
  show(id: number) {
    return { id };
  }
  findAll(city: string): Observable<weatherInfoDto> {
    const res = this.httpService
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`,
      )
      .pipe(map((response) => response.data))
      .pipe(
        map((data) => {
          return {
            weather: data.weather,
            name: data.name,
            main: data.main,
            visibility: data.visibility,
            wind: data.wind,
            clouds: data.clouds,
            sys: data.sys,
          };
        }),
      );
    return res;
  }
}
