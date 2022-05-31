import { Injectable } from '@nestjs/common';
import { User, UsersService } from '@core';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const validatePass = compare(password, user.password);
    if (validatePass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const abilities = this.addAbility(user.admin, user.worker);
    return {
      user: { ...user, abilities },
      token: this.jwtService.sign(payload),
    };
  }

  addAbility(admin, worker) {
    const ability = [];
    if (admin === 1) {
      ability.push({
        action: 'manage',
        subject: 'all',
      });
    }
    if (worker === 1) {
      ability.push({
        action: 'read',
        subject: 'Worker',
      });
    }
    if (worker !== 1 && admin !== 1) {
      ability.push({
        action: 'read',
        subject: 'User',
      });
    }
    return ability;
  }
}
