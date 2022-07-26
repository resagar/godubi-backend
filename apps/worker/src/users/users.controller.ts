import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@core/users/dto';
import { UserAuthInterface } from '@core/auth/userAuth.interface';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { UsersService } from '@core/users/users.service';
import { Roles } from '@core/roles.decorator';
import { RolesGuard } from '@core/auth-role.guard';
import { User } from '@core/users/entities/user.entity';
import { AuthService } from '@core/auth/auth.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.isWorker = 1;
    createUserDto.worker = {
      status: 'Pending',
      balance: 0,
    };
    const user: User = await this.usersService.create(createUserDto);
    return await this.authService.login(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('worker')
  async findAll(@Request() req: UserAuthInterface) {
    const user: User[] = await this.usersService.findAll(req.user.id);
    const buff = Buffer.from(user[0].avatar);
    user[0].avatar = buff.toString();
    return user;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('worker')
  update(
    @Request() req: UserAuthInterface,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
