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
    const roles = this.addRoles(user.admin === 1, user.isWorker === 1);
    const payload = { email: user.email, sub: user.id, roles: roles };
    const ability = this.addAbility(user.admin, user.isWorker);
    return {
      user: { ...user, ability, roles },
      token: this.jwtService.sign(payload),
    };
  }

  addRoles(admin: boolean, worker: boolean): string[] {
    const roles: string[] = [];
    if (admin) roles.push('Admin');
    if (worker) roles.push('Worker');
    return roles;
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
