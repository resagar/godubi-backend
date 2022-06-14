import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@core/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@core/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@core/auth/constants';
import { JwtStrategy } from '@core/auth/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
