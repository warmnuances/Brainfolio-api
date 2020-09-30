import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../Auth/dto/create-user-dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
    
  @Post("/profile")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto){
    console.log(createUserDto)
    // return this.userService.createUser(createUserDto);
  }

}
