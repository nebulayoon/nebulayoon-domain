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
  Param,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '../../common/guard/auth.guard';
import { User } from '../../common/decorator/user.decorator';
import {
  IAuthToken,
  IRefreshToken,
  IUserInfo,
} from '../../auth/types/auth.type';
import { RefreshGuard } from '../../common/guard/refresh.guard';
import { ResponseEntity } from '@libs/common/helpers/responses';
import { MailService } from '../../mail/mail.service';
import { CustomLoggerService } from '@libs/common/log/logger.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.userService.register(registerDto);

    this.userService.sendEmailVerify(result.email).then(() => {
      this.logger.log(`이메일 인증 메일 발송 완료.`);
    });

    if (result === undefined) {
      return ResponseEntity.FAILED();
    }

    return ResponseEntity.CREATED();
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

    return ResponseEntity.OK_WITH_DATA(['success'], {
      accessToken,
      refreshToken,
    });
  }

  @Post('token')
  @UseGuards(RefreshGuard)
  async newToken(
    @User() user: IRefreshToken,
    @Req() req: Request,
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

    return ResponseEntity.OK_WITH_DATA(['success'], { refreshToken });
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  async logOut(@User() user: IAuthToken) {
    await this.userService.logout(user.id);
    return ResponseEntity.OK();
  }

  @Get('email-verify/:token')
  async emailVerify(@Param() params: { token: string }) {
    await this.userService.validateEmail(params.token);
    return ResponseEntity.OK();
  }

  @Post('login-check')
  async loginCheck(
    @User() user: IAuthToken,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!user) return ResponseEntity.OK_WITH(['NO LOGGEDIN']);

    const userInfo: IUserInfo = {
      name: user.name,
      email: user.email,
    };

    res.cookie('AT', req.cookies['AT'], {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return ResponseEntity.OK_WITH_DATA<IUserInfo>(['success'], userInfo);
  }

  @Get('test')
  async test() {
    return 'test';
  }
}
