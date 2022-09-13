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
import { TeamsService } from '@core/teams/teams.service';
import { CreateTeamDto } from '@core/teams/dto/create-team.dto';
import { UpdateTeamDto } from '@core/teams/dto/update-team.dto';
import { CreateTeamUserDto } from '@core/teams/dto/create-team-user.dto';
import { CreateTeamOrderDto } from '@core/teams/dto/create-team-order.dto';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { RolesGuard } from '@core/auth-role.guard';
import { Roles } from '@core/roles.decorator';

@Controller('api/teams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @Roles('admin')
  async create(
    @Body()
    createTeamDto: CreateTeamDto | CreateTeamUserDto | CreateTeamOrderDto,
  ) {
    if (createTeamDto['teamUser'] != undefined)
      return await this.teamsService.createTeamUser(
        <CreateTeamUserDto>createTeamDto,
      );
    if (createTeamDto['teamOrder'] != undefined)
      return this.teamsService.createTeamOrder(
        <CreateTeamOrderDto>createTeamDto,
      );
    return this.teamsService.create(<CreateTeamDto>createTeamDto);
  }

  @Get()
  @Roles('admin')
  findAll(@Query('limit') limit = '10', @Query('skip') skip = '0') {
    return this.teamsService.findAll(+limit, +skip);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Patch('users/:id/:userId')
  @Roles('admin')
  updateTeamUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.updateUser(+id, +userId, updateTeamDto);
  }

  @Patch('orders/:id/:orderId')
  @Roles('admin')
  updateTeamOrder(
    @Param('id') id: string,
    @Param('orderId') orderId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.updateUser(+id, +orderId, updateTeamDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  @Delete('users/:id/:userId')
  @Roles('admin')
  removeTeamUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.teamsService.removeUser(+id, +userId);
  }

  @Delete('orders/:id/:orderId')
  @Roles('admin')
  removeTeamOrder(@Param('id') id: string, @Param('orderId') orderId: string) {
    return this.teamsService.removeOrder(+id, +orderId);
  }
}
