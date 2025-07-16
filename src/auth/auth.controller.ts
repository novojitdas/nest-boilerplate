import {
  Controller,
  Post,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return req.user; // { id, email }
  }
}
