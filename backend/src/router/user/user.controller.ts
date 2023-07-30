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
  Redirect,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@common/guard/auth.guard';
import { User } from '@common/decorator/user.decorator';
import { IAuthToken } from 'src/auth/type/auth.type';
import { RefreshGuard } from '@common/guard/refresh.guard';
import { ResponseEntity } from '@common/helpers/responses';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.userService.register(registerDto);

    if (result === undefined) {
      return ResponseEntity.FAILED();
    }

    return ResponseEntity.OK();
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.userService.login(
      loginDto,
    );

    if (accessToken === undefined || refreshToken === undefined) {
      return ResponseEntity.FAILED();
    }

    res.cookie('AT', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.cookie('RT', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return ResponseEntity.OK();
  }

  @Post('token')
  @UseGuards(RefreshGuard)
  async newToken(
    @Req() req: Request,
    @User() user: IAuthToken,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['RT'] as string;
    const newAccessToken = await this.userService.newAuthToken(
      refreshToken,
      user,
    );
    if (!newAccessToken) {
      return ResponseEntity.FAILED();
    }

    res.cookie('AT', newAccessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return ResponseEntity.OK();
  }
}
