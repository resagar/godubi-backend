import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async validateUser(password: string, username: string): Promise<any> {
    let user: User;
    if (username.includes('@'))
      user = await this.usersService.findByEmail(username);
    if (!username.includes('@'))
      user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const validatePass = compare(password, user.password);
    if (validatePass) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const roles = this.addRoles(user.admin === 1, user.isWorker === 1);
    const payload = { email: user.email, sub: user.id, roles };
    const ability = this.addAbility(user.admin, user.isWorker);
    return {
      user: { ...user, ability, role: roles },
      token: this.jwtService.sign(payload),
    };
  }

  addRoles(admin: boolean, worker: boolean): string {
    let role = '';
    if (!admin && !worker) role = 'client';
    if (admin) role = 'admin';
    if (worker) role = 'worker';
    return role;
  }

  addAbility(admin: number, worker: number) {
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
