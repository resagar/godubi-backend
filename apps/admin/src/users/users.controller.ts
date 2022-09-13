import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@core/users/dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { UsersService } from '@core/users/admin/users.service';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';
import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/users/entities/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.admin = 1;
    const user: User = await this.usersService.create(createUserDto);
    return await this.authService.login(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll(
    @Query('limit') limit = '10',
    @Query('skip') skip = '0',
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('country') country: string,
    @Query('state') state: string,
    @Query('city') city: string,
    @Query('created') created: Date,
  ) {
    return this.usersService.findAll(
      +limit,
      +skip,
      username,
      email,
      country,
      state,
      city,
      created,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
