import { Worker } from '@core/workers/entities/worker.entity';
import { Order } from '@core/orders/entities/order.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Matches, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  public id: number;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9.]+$/)
  public username: string;
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  public emailVerifiedAt: Date;
  @IsNotEmpty()
  public password: string;
  public avatar: string;
  public rememberToken: string;
  public agent: number;
  public completeName: string;
  public country: string;
  public fondos: number;
  public admin: number;
  public isWorker: number;
  public linkedin: string;
  public twitter: string;
  public instagram: string;
  public facebook: string;
  public phone: string;
  public state: string;
  public city: string;
  public address: string;
  public languages: string;
  public birthday: string;
  public website: string;
  public worker: CreateWorker;
  public orders: Order;
}

class CreateWorker extends PartialType<Worker>(Worker) {}
