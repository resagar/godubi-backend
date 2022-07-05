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

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.isWorker = 1;
    createUserDto.worker = {
      status: 'Pending',
      balance: 0,
    };
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('worker')
  findAll(@Request() req: UserAuthInterface) {
    return this.usersService.findAll(req.user.id);
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
