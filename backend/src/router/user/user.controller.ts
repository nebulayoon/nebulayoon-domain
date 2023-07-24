import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  Res,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.userService.register(registerDto);

      return {
        statusCode: HttpStatus.OK,
        message: ['success'],
        result: result,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['생성 실패'],
      };
    }
  }
}
