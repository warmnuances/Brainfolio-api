import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Connection } from 'mongoose';
import { GetUser } from '../Auth/get-user.decorator';
import { User } from '../User/user.schema';


@Controller("/test")
// @UseGuards(AuthGuard())
export class HealthCheckController {
  private start: number;

	constructor(@InjectConnection() private readonly connection: Connection) {
		this.start = Date.now();
  }
  
  @Get("authenticated")
  async isAuthenticated(@GetUser() user: User){
    console.log(user)
  
    return user;
  }

  @Get("healthcheck")
  async check(){
    const now = Date.now();
    
    return {
      backend: true,
      database: `${this.connection.readyState === 1}`,
      uptime: Number((now - this.start) / 1000).toFixed(0)
    }
  }
}
