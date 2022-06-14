import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@core/users/users.service';
import { User } from '@core/users/entities/user.entity';

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
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const ability = this.addAbility(user.admin, user.worker);
    return {
      user: { ...user, ability },
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
