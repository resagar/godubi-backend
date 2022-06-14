import { Module } from '@nestjs/common';
import { InputsService } from './inputs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Input } from './entities/input.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Input])],
  providers: [InputsService],
  exports: [InputsService],
})
export class InputsModule {}
