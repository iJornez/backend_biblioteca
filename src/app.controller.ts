import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminAuthGuard } from 'src/guard/admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //@UseGuards(AdminAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
